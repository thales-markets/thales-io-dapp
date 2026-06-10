import { INITIAL_OVER_BURN } from 'constants/token';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { formatShortDate } from 'thales-utils';
import { BuybackByDate } from 'types/token';
import buybackContract from 'utils/contracts/buybackContract';

// Block on Optimism where the buyback contract switched its bought token to OVER (2025-04-07).
// Before this block the same contract bought back the legacy THALES token, which the OVER
// subgraph excluded, so we must start scanning from here to match it.
const OVER_BUYBACK_START_BLOCK = 134215267;
// Optimism (Bedrock) produces a block exactly every 2 seconds with zero drift, so an event's
// timestamp can be derived from its block number using a single anchor instead of an RPC call
// per block (verified across the whole OVER era).
const ANCHOR_BLOCK = OVER_BUYBACK_START_BLOCK;
const ANCHOR_TIMESTAMP = 1744029311; // block 134215267 timestamp in seconds
const OPTIMISM_BLOCK_TIME = 2; // seconds per block
const MAX_BLOCK_RANGE = 2000000; // RPC getLogs range limit per request
const MAX_CONCURRENT_REQUESTS = 10; // run chunk requests in parallel (cold start: ~28s sequential -> ~4s)
const MAX_RETRIES = 5;
// Window scanned for the latest buyback only (stats path). ~6 days on Optimism; buybacks happen
// several times a day, so the most recent one is always inside this single-request range.
const LATEST_BUYBACK_BLOCK_WINDOW = 250000;

const BUYBACK_AMOUNT_IN_DECIMALS = 1e6; // sUSD
const BUYBACK_AMOUNT_OUT_DECIMALS = 1e18; // OVER

export type OverBuybackTransaction = {
    id: string;
    timestamp: number; // ms
    transactionHash: string;
    amountIn: number;
    amountOut: number;
};

export type OverBuybackByDate = {
    id: string;
    date: string; // YYYY-MM-DD (UTC)
    amountIn: number;
    amountOut: number;
    lastUpdate: number; // ms
};

const getBlockTimestamp = (blockNumber: number) =>
    (ANCHOR_TIMESTAMP + (blockNumber - ANCHOR_BLOCK) * OPTIMISM_BLOCK_TIME) * 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getBuybackContract = (provider: ethers.providers.Provider) =>
    new ethers.Contract(buybackContract.addresses[Network.OptimismMainnet], buybackContract.abi, provider);

const mapEvent = (event: ethers.Event): OverBuybackTransaction => ({
    id: `${event.transactionHash}-${event.logIndex}`,
    timestamp: getBlockTimestamp(event.blockNumber),
    transactionHash: event.transactionHash,
    amountIn: Number(event.args?._amountIn) / BUYBACK_AMOUNT_IN_DECIMALS,
    amountOut: Number(event.args?._amountOut) / BUYBACK_AMOUNT_OUT_DECIMALS,
});

const fetchLogsForRange = async (contract: ethers.Contract, fromBlock: number, toBlock: number) => {
    const filter = contract.filters.BuybackExecuted();
    let lastError;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            return await contract.queryFilter(filter, fromBlock, toBlock);
        } catch (e) {
            lastError = e;
            await sleep(700);
        }
    }
    throw lastError;
};

const fetchLogsChunked = async (contract: ethers.Contract, fromBlock: number, toBlock: number) => {
    const ranges: [number, number][] = [];
    for (let from = fromBlock; from <= toBlock; from += MAX_BLOCK_RANGE) {
        ranges.push([from, Math.min(from + MAX_BLOCK_RANGE - 1, toBlock)]);
    }

    // Fetch chunks in parallel (bounded concurrency) - sequential scanning is the cold-start bottleneck.
    const events: ethers.Event[] = [];
    for (let i = 0; i < ranges.length; i += MAX_CONCURRENT_REQUESTS) {
        const batch = ranges.slice(i, i + MAX_CONCURRENT_REQUESTS);
        const results = await Promise.all(batch.map(([from, to]) => fetchLogsForRange(contract, from, to)));
        results.forEach((chunk) => events.push(...chunk));
    }
    return events;
};

// Most recent buyback only - cheap single-request scan, used by the fast stats path so it never
// waits on the full history scan.
export const getLatestOverBuyback = async (
    provider: ethers.providers.Provider
): Promise<OverBuybackTransaction | null> => {
    const contract = getBuybackContract(provider);
    const latestBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(OVER_BUYBACK_START_BLOCK, latestBlock - LATEST_BUYBACK_BLOCK_WINDOW);
    const events = await fetchLogsForRange(contract, fromBlock, latestBlock);
    // queryFilter returns events in ascending chain order, so the last one is the most recent.
    return events.length > 0 ? mapEvent(events[events.length - 1]) : null;
};

// Full buyback history is immutable, so cache it across refetches and only scan new blocks.
let cachedTransactions: OverBuybackTransaction[] = [];
let lastScannedBlock = OVER_BUYBACK_START_BLOCK - 1;
let updatePromise: Promise<void> | null = null;

const updateCache = async (provider: ethers.providers.Provider) => {
    const contract = getBuybackContract(provider);
    const latestBlock = await provider.getBlockNumber();
    if (latestBlock <= lastScannedBlock) {
        return;
    }

    const events = await fetchLogsChunked(contract, lastScannedBlock + 1, latestBlock);
    cachedTransactions = cachedTransactions.concat(events.map(mapEvent));
    lastScannedBlock = latestBlock;
};

const ensureCacheUpdated = (provider: ethers.providers.Provider) => {
    // serialize concurrent refetches so the shared cache isn't updated twice for the same blocks
    if (!updatePromise) {
        updatePromise = updateCache(provider).finally(() => {
            updatePromise = null;
        });
    }
    return updatePromise;
};

// Buyback amounts grouped per (UTC) day, ascending - the raw data behind the burn chart.
// Replaces thalesData.overToken.buybackByDates().
export const getOverBuybackByDates = async (provider: ethers.providers.Provider): Promise<OverBuybackByDate[]> => {
    await ensureCacheUpdated(provider);

    const byDate: Record<string, OverBuybackByDate> = {};
    cachedTransactions.forEach((tx) => {
        const date = new Date(tx.timestamp).toISOString().slice(0, 10);
        if (!byDate[date]) {
            byDate[date] = { id: date, date, amountIn: 0, amountOut: 0, lastUpdate: 0 };
        }
        byDate[date].amountIn += tx.amountIn;
        byDate[date].amountOut += tx.amountOut;
        byDate[date].lastUpdate = Math.max(byDate[date].lastUpdate, tx.timestamp);
    });

    return Object.values(byDate).sort((a, b) => a.lastUpdate - b.lastUpdate);
};

// Turns the raw daily buckets into the cumulative series the chart renders, blending in the live
// stats (current in-progress tick burn, and the adjustment that aligns the curve with the reported
// total burned). Kept separate from the fetch so it can re-run cheaply as stats tick every few seconds.
export const buildBuybackChartData = (
    buybackByDates: OverBuybackByDate[],
    burned: number,
    currentTickBurn: number
): BuybackByDate[] => {
    let cumulativeAmountIn = 0;
    let cumulativeAmountOut = 0;
    let chartData: BuybackByDate[] = buybackByDates.map((item, index) => {
        const amountIn = item.amountIn;
        const amountOut =
            item.amountOut +
            (index === buybackByDates.length - 1 ? currentTickBurn : 0) +
            (index === 0 ? INITIAL_OVER_BURN : 0);

        cumulativeAmountIn += amountIn;
        cumulativeAmountOut += amountOut;

        const dateSplit = item.date.split('-');
        const date = new Date(Number(dateSplit[0]), Number(dateSplit[1]) - 1, Number(dateSplit[2])).getTime();

        return {
            date: formatShortDate(date),
            amountIn,
            amountOut,
            cumulativeAmountIn,
            cumulativeAmountOut,
        };
    });

    if (chartData.length > 0) {
        const burnDiff = burned - chartData[chartData.length - 1].cumulativeAmountOut;
        const burnDiffPerDate = burnDiff / chartData.length;
        chartData = chartData.map((item, index) => ({
            ...item,
            amountOut: item.amountOut + burnDiffPerDate,
            cumulativeAmountOut: item.cumulativeAmountOut + burnDiffPerDate * (index + 1),
        }));
    }

    return chartData;
};
