import QUERY_KEYS from 'constants/queryKeys';
import { LiquidityPool } from 'enums/liquidityPool';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import thalesData from 'thales-data';
import { LiquidityPoolUserTransactions } from 'types/liquidityPool';

const useLiquidityPoolUserTransactionsQuery = (
    networkId: Network,
    pool: LiquidityPool,
    options?: UseQueryOptions<LiquidityPoolUserTransactions>
) => {
    return useQuery<LiquidityPoolUserTransactions>(
        QUERY_KEYS.LiquidityPoolUserTransactions(networkId, pool),
        async () => {
            try {
                let liquidityPoolUserTransactions = [];
                if (pool === LiquidityPool.THALES) {
                    liquidityPoolUserTransactions = await thalesData.binaryOptions.liquidityPoolUserTransactions({
                        network: networkId,
                    });
                } else {
                    liquidityPoolUserTransactions = await thalesData.sportMarkets.liquidityPoolUserTransactions({
                        network: networkId,
                        liquidityPoolType: pool === LiquidityPool.OVERTIME_SINGLE ? 'single' : 'parlay',
                    });
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
