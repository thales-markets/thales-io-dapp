import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { RPC_LIST } from 'pages/Root/Root';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter, COLLATERAL_DECIMALS } from 'thales-utils';
import { OverTokenInfo } from 'types/token';
import buybackContract from 'utils/contracts/buybackContract';
import { getLatestOverBuyback } from 'utils/overTokenBuyback';

const useOverTokenInfoQuery = (options?: UseQueryOptions<OverTokenInfo | undefined>) => {
    return useQuery<OverTokenInfo | undefined>(
        QUERY_KEYS.OverToken.Info(),
        async () => {
            try {
                // Buyback from OP
                const opInfuraProvider = new ethers.providers.JsonRpcProvider(
                    RPC_LIST.DRPC[Network.OptimismMainnet].http
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
                    latestBuyback,
                    tickLength,
                    tickRate,
                    lastBuybackTimestamp,
                ] = await Promise.all([
                    fetch(`${generalConfig.API_URL}/over-token/price`),
                    fetch(`${generalConfig.API_URL}/over-token/total-supply`),
                    fetch(`${generalConfig.API_URL}/over-token/circulating-supply`),
                    fetch(`${generalConfig.API_URL}/over-token/burned`),
                    fetch(`${generalConfig.API_URL}/over-token/market-cap`),
                    getLatestOverBuyback(opInfuraProvider),
                    opThalesBuybackContract.tickLength(),
                    opThalesBuybackContract.sUSDperTick(),
                    opThalesBuybackContract.lastBuyback(),
                ]);

                const currentTickTime = new Date().getTime() / 1000 - Number(lastBuybackTimestamp);
                const burnRatePerSecond = (latestBuyback?.amountOut ?? 0) / Number(tickLength);
                const currentTickBurn = burnRatePerSecond * currentTickTime;

                const tokenInfo: OverTokenInfo = {
                    price: Number(await price.text()),
                    totalSupply: Number(await totalSupply.text()),
                    circulatingSupply: Number(await circulatingSupply.text()) - currentTickBurn,
                    burned: Number(await burned.text()) + currentTickBurn,
                    marketCap: Number(await marketCap.text()),
                    tickLength: Number(tickLength),
                    tickRate: bigNumberFormatter(tickRate, COLLATERAL_DECIMALS.USDC),
                    burnRatePerSecond,
                    currentTickBurn,
                    lastBuybackAmountIn: latestBuyback?.amountIn ?? 0,
                    lastBuybackAmountOut: latestBuyback?.amountOut ?? 0,
                    lastBuybackTimestamp: lastBuybackTimestamp * 1000,
                };

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
