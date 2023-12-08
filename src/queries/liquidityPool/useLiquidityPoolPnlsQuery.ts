import QUERY_KEYS from 'constants/queryKeys';
import { Network } from 'enums/network';
import { orderBy } from 'lodash';
import { useQuery, UseQueryOptions } from 'react-query';
import thalesData from 'thales-data';
import { LiquidityPoolPnls } from 'types/liquidityPool';

const useLiquidityPoolPnlsQuery = (networkId: Network, options?: UseQueryOptions<LiquidityPoolPnls>) => {
    return useQuery<LiquidityPoolPnls>(
        QUERY_KEYS.ThalesLiquidityPool.PnL(networkId),
        async () => {
            try {
                const liquidityPoolPnls = await thalesData.binaryOptions.liquidityPoolPnls({
                    network: networkId,
                });

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