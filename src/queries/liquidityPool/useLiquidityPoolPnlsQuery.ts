import axios from 'axios';
import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { API_ROUTES } from 'constants/routes';
import { LiquidityPool } from 'enums/liquidityPool';
import { Network } from 'enums/network';
import { orderBy } from 'lodash';
import { useQuery, UseQueryOptions } from 'react-query';
import { LiquidityPoolPnls } from 'types/liquidityPool';

const useLiquidityPoolPnlsQuery = (
    networkId: Network,
    pool: LiquidityPool,
    options?: UseQueryOptions<LiquidityPoolPnls>
) => {
    return useQuery<LiquidityPoolPnls>(
        QUERY_KEYS.LiquidityPoolPnL(networkId, pool),
        async () => {
            try {
                let liquidityPoolPnls = [];
                if (pool === LiquidityPool.THALES) {
                    const response = await axios.get(
                        `${generalConfig.API_URL}/${API_ROUTES.DigitalOptions.LPPnls}/${networkId}`
                    );
                    liquidityPoolPnls = response?.data ? response.data : [];
                } else {
                    const response = await axios.get(
                        `${generalConfig.API_URL}/${API_ROUTES.SportMarkets.LPPnls}/${networkId}?lp-type=${
                            pool === LiquidityPool.OVERTIME_SINGLE ? 'single' : 'parlay'
                        }`
                    );
                    liquidityPoolPnls = response?.data ? response.data : [];
                }

                let cumulativePnl = 1;
                return orderBy(liquidityPoolPnls, ['round'], ['asc']).map((item: any) => {
                    cumulativePnl = cumulativePnl * item.pnl;
                    return {
                        round: `R${item.round}`,
                        pnlPerRound: item.pnl - 1,
                        cumulativePnl: cumulativePnl - 1,
                    };
                });
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

export default useLiquidityPoolPnlsQuery;
