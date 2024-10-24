import axios from 'axios';
import { generalConfig } from 'config/general';
import { LiquidityPoolMap, ThalesLiquidityPoolMap } from 'constants/liquidityPoolV2';
import QUERY_KEYS from 'constants/queryKeys';
import { API_ROUTES } from 'constants/routes';
import { LiquidityPool } from 'enums/liquidityPool';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import thalesData from 'thales-data';
import { coinFormatter, Coins } from 'thales-utils';
import { LiquidityPoolUserTransaction, LiquidityPoolUserTransactions } from 'types/liquidityPool';
import { hasV2Pools } from 'utils/network';

const useLiquidityPoolUserTransactionsQuery = (
    networkId: Network,
    pool: LiquidityPool,
    collateral: Coins,
    account?: string,
    round?: number,
    options?: UseQueryOptions<LiquidityPoolUserTransactions>
) => {
    return useQuery<LiquidityPoolUserTransactions>(
        QUERY_KEYS.LiquidityPoolUserTransactions(networkId, pool, account, round),
        async () => {
            try {
                let liquidityPoolUserTransactions = [];
                if (
                    (pool === LiquidityPool.OVERTIME_USDC ||
                        pool === LiquidityPool.OVERTIME_WETH ||
                        pool === LiquidityPool.OVERTIME_THALES) &&
                    hasV2Pools(networkId)
                ) {
                    liquidityPoolUserTransactions = (
                        await thalesData.sportMarketsV2.liquidityPoolUserTransactions({
                            network: networkId,
                            liquidityPool:
                                LiquidityPoolMap?.[networkId as Network.Arbitrum | Network.OptimismMainnet]?.[pool]
                                    ?.address,
                        })
                    ).map((tx: LiquidityPoolUserTransaction) => ({
                        ...tx,
                        amount: coinFormatter(tx.amount || 0, networkId, collateral),
                    }));
                } else if (pool === LiquidityPool.THALES) {
                    const response = await axios.get(
                        `${generalConfig.API_URL}/${
                            API_ROUTES.DigitalOptions.LPTransactions
                        }/${networkId}?liquidityPool=${
                            ThalesLiquidityPoolMap?.[
                                networkId as Network.Arbitrum | Network.OptimismMainnet | Network.Base
                            ]?.[pool]?.address
                        }&${round ? `round=${round}` : ''}&${account ? `account=${account}` : ''}`
                    );

                    if (response?.data) liquidityPoolUserTransactions = response.data;
                } else {
                    const response = await axios.get(
                        `${generalConfig.API_URL}/${API_ROUTES.SportMarkets.LPTransactions}/${networkId}?lp-type=${
                            pool === LiquidityPool.OVERTIME_SINGLE ? 'single' : 'parlay'
                        }&${round ? `round=${round}&` : ''}${account ? `account=${account}` : ''}`
                    );

                    if (response?.data) liquidityPoolUserTransactions = response.data;
                }
                return liquidityPoolUserTransactions;
            } catch (e) {
                console.log(e);
                return [];
            }
        },
        {
            ...options,
        }
    );
};

export default useLiquidityPoolUserTransactionsQuery;
