import QUERY_KEYS from 'constants/queryKeys';
import { LiquidityPool } from 'enums/liquidityPool';
import { Network } from 'enums/network';
import { orderBy } from 'lodash';
import { useQuery, UseQueryOptions } from 'react-query';
import thalesData from 'thales-data';
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
                    liquidityPoolPnls = await thalesData.binaryOptions.liquidityPoolPnls({
                        network: networkId,
                    });
                } else {
                    liquidityPoolPnls = await thalesData.sportMarkets.liquidityPoolPnls({
                        network: networkId,
                        liquidityPoolType: pool === LiquidityPool.OVERTIME_SINGLE ? 'single' : 'parlay',
                    });
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
