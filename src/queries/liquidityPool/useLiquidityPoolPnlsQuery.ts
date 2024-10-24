import axios from 'axios';
import { generalConfig } from 'config/general';
import { LiquidityPoolMap, ThalesLiquidityPoolMap } from 'constants/liquidityPoolV2';
import QUERY_KEYS from 'constants/queryKeys';
import { API_ROUTES } from 'constants/routes';
import { LiquidityPool } from 'enums/liquidityPool';
import { Network } from 'enums/network';
import { orderBy } from 'lodash';
import { useQuery, UseQueryOptions } from 'react-query';
import thalesData from 'thales-data';
import { LiquidityPoolPnls } from 'types/liquidityPool';
import { hasV2Pools } from 'utils/network';

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
                if (
                    (pool === LiquidityPool.OVERTIME_USDC ||
                        pool === LiquidityPool.OVERTIME_WETH ||
                        pool === LiquidityPool.OVERTIME_THALES) &&
                    hasV2Pools(networkId)
                ) {
                    liquidityPoolPnls = await thalesData.sportMarketsV2.liquidityPoolPnls({
                        network: networkId,
                        liquidityPool:
                            LiquidityPoolMap?.[networkId as Network.Arbitrum | Network.OptimismMainnet]?.[pool]
                                ?.address,
                    });
                } else if (pool === LiquidityPool.THALES) {
                    const response = await axios.get(
                        `${generalConfig.API_URL}/${API_ROUTES.DigitalOptions.LPPnls}/${networkId}?liquidityPool=${
                            ThalesLiquidityPoolMap?.[
                                networkId as Network.Arbitrum | Network.OptimismMainnet | Network.Base
                            ]?.[pool]?.address
                        }`
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
