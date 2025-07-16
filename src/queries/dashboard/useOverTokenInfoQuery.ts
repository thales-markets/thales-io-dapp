import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { INITIAL_OVER_BURN } from 'constants/token';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { orderBy } from 'lodash';
import { useQuery, UseQueryOptions } from 'react-query';
import thalesData from 'thales-data';
import { bigNumberFormatter, COLLATERAL_DECIMALS, formatShortDate } from 'thales-utils';
import { OverTokenInfo } from 'types/token';
import buybackContract from 'utils/contracts/buybackContract';

const useOverTokenInfoQuery = (options?: UseQueryOptions<OverTokenInfo | undefined>) => {
    return useQuery<OverTokenInfo | undefined>(
        QUERY_KEYS.OverToken.Info(),
        async () => {
            try {
                // Buyback from OP
                const opInfuraProvider = new ethers.providers.InfuraProvider(
                    Network.OptimismMainnet,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                );

                const opThalesBuybackContract = new ethers.Contract(
                    buybackContract.addresses[Network.OptimismMainnet],
                    buybackContract.abi,
                    opInfuraProvider
                );

                const [
                    price,
                    totalSupply,
                    circulatingSupply,
                    burned,
                    marketCap,
                    buybackByDates,
                    lastestBuybackTx,
                    tickLength,
                    tickRate,
                    lastBuybackTimestamp,
                ] = await Promise.all([
                    fetch(`${generalConfig.API_URL}/over-token/price`),
                    fetch(`${generalConfig.API_URL}/over-token/total-supply`),
                    fetch(`${generalConfig.API_URL}/over-token/circulating-supply`),
                    fetch(`${generalConfig.API_URL}/over-token/burned`),
                    fetch(`${generalConfig.API_URL}/over-token/market-cap`),
                    thalesData.overToken.buybackByDates(),
                    thalesData.overToken.buybackTransactions({ max: 1 }),
                    opThalesBuybackContract.tickLength(),
                    opThalesBuybackContract.sUSDperTick(),
                    opThalesBuybackContract.lastBuyback(),
                ]);

                const currentTickTime = new Date().getTime() / 1000 - Number(lastBuybackTimestamp);
                const burnRatePerSecond = lastestBuybackTx[0]?.amountOut / Number(tickLength);
                const currentTickBurn = burnRatePerSecond * currentTickTime;

                let cumulativeAmountIn = 0;
                let cumulativeAmountOut = 0;
                const tokenInfo: OverTokenInfo = {
                    price: Number(await price.text()),
                    totalSupply: Number(await totalSupply.text()),
                    circulatingSupply: Number(await circulatingSupply.text()) - currentTickBurn,
                    burned: Number(await burned.text()) + currentTickBurn,
                    marketCap: Number(await marketCap.text()),
                    tickLength: Number(tickLength),
                    tickRate: bigNumberFormatter(tickRate, COLLATERAL_DECIMALS.USDC),
                    burnRatePerSecond: lastestBuybackTx[0]?.amountOut / Number(tickLength),
                    currentTickBurn,
                    lastBuybackAmountIn: lastestBuybackTx[0]?.amountIn,
                    lastBuybackAmountOut: lastestBuybackTx[0]?.amountOut,
                    lastBuybackTimestamp: lastBuybackTimestamp * 1000,
                    buybackByDates: orderBy(buybackByDates, ['lastUpdate'], ['asc']).map((item: any, index: number) => {
                        const amountIn = Number(item.amountIn);
                        const amountOut =
                            Number(item.amountOut) +
                            (index === buybackByDates.length - 1 ? currentTickBurn : 0) +
                            (index === 0 ? INITIAL_OVER_BURN : 0);

                        cumulativeAmountIn += amountIn;
                        cumulativeAmountOut += amountOut;

                        const dateSplit = item.date.split('-');
                        const date = new Date(
                            Number(dateSplit[0]),
                            Number(dateSplit[1]) - 1,
                            Number(dateSplit[2])
                        ).getTime();

                        return {
                            date: formatShortDate(date),
                            amountIn,
                            amountOut,
                            cumulativeAmountIn,
                            cumulativeAmountOut,
                        };
                    }),
                };

                if (tokenInfo.buybackByDates.length > 0) {
                    const burnDiff =
                        tokenInfo.burned -
                        tokenInfo.buybackByDates[tokenInfo.buybackByDates.length - 1].cumulativeAmountOut;
                    const burnDiffPerDate = burnDiff / tokenInfo.buybackByDates.length;
                    tokenInfo.buybackByDates = tokenInfo.buybackByDates.map((item, index) => {
                        return {
                            ...item,
                            amountOut: item.amountOut + burnDiffPerDate,
                            cumulativeAmountOut: item.cumulativeAmountOut + burnDiffPerDate * (index + 1),
                        };
                    });
                }

                return tokenInfo;
            } catch (e) {
                console.log(e);
            }

            return undefined;
        },
        {
            ...options,
            refetchInterval: 3 * 1000,
        }
    );
};

export default useOverTokenInfoQuery;
