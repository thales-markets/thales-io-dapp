import axios from 'axios';
import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { API_ROUTES } from 'constants/routes';
import { LiquidityPool } from 'enums/liquidityPool';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import { LiquidityPoolUserTransactions } from 'types/liquidityPool';

const useLiquidityPoolUserTransactionsQuery = (
    networkId: Network,
    pool: LiquidityPool,
    account?: string,
    round?: number,
    options?: UseQueryOptions<LiquidityPoolUserTransactions>
) => {
    return useQuery<LiquidityPoolUserTransactions>(
        QUERY_KEYS.LiquidityPoolUserTransactions(networkId, pool, account, round),
        async () => {
            try {
                let liquidityPoolUserTransactions = [];
                if (pool === LiquidityPool.THALES) {
                    const response = await axios.get(
                        `${generalConfig.API_URL}/${API_ROUTES.DigitalOptions.LPTransactions}/${networkId}?${
                            round ? `round=${round}` : ''
                        }&${account ? `account=${account}` : ''}`
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
