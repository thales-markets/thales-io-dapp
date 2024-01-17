import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { UseQueryOptions, useQuery } from 'react-query';
import { AllStats } from 'types/statistics';

const useStatsQuery = (options?: UseQueryOptions<AllStats | undefined>) => {
    return useQuery<AllStats | undefined>(
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
                };
            } catch (e) {
                console.log(e);
            }

            return undefined;
        },
        {
            ...options,
        }
    );
};

export default useStatsQuery;
