import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { useQuery, UseQueryOptions } from 'react-query';
import { AllStats } from 'types/statistics';

const useStatsQuery = (options?: UseQueryOptions<AllStats>) => {
    return useQuery<AllStats>(
        QUERY_KEYS.AllStats(),
        async () => {
            try {
                const response = await fetch(`${generalConfig.API_URL}/thales/thales-io/stats`);
                const stats = await response.json();

                return {
                    usersStats: {
                        totalUniqueUsers: stats.unique_users,
                    },
                    volumeStats: {
                        totalProtocolVolume:
                            stats.thales_amm + stats.overtime_single + stats.overtime_parlay + stats.speed_markets,
                        thalesAmmVolume: stats.thales_amm,
                        overtimeAmmVolume: stats.overtime_single,
                        parlayAmmVolume: stats.overtime_parlay,
                        speedAmmVolume: stats.speed_markets,
                        safeboxFees: stats.safebox,
                    },
                    marketsStats: {
                        totalUniqueMarkets: stats.total_markets,
                    },
                    TVLStats: {
                        speedMarketsTVL: stats.speed_markets_tvl,
                        vaultsTVL: stats.vault_tvl,
                        thalesLpTVL: stats.digital_options_lp_tvl,
                        overtimeSingleTVL: stats.overtime_single_lp_tvl,
                        overtimeParlayTVL: stats.overtime_parlay_lp_tvl,
                        stakingThalesTVL: stats.staking_thales_tvl,
                        overtimeV2TVL: stats.overtime_v2_tvl,
                    },
                };
            } catch (e) {
                console.log(e);
            }

            return {
                usersStats: {
                    totalUniqueUsers: 0,
                },
                volumeStats: {
                    totalProtocolVolume: 0,
                    thalesAmmVolume: 0,
                    overtimeAmmVolume: 0,
                    parlayAmmVolume: 0,
                    speedAmmVolume: 0,
                    safeboxFees: 0,
                },
                marketsStats: {
                    totalUniqueMarkets: 0,
                },
                TVLStats: {
                    speedMarketsTVL: 0,
                    vaultsTVL: 0,
                    thalesLpTVL: 0,
                    overtimeSingleTVL: 0,
                    overtimeParlayTVL: 0,
                    stakingThalesTVL: 0,
                    overtimeV2TVL: 0,
                },
            };
        },
        {
            ...options,
        }
    );
};

export default useStatsQuery;
