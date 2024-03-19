import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { UseQueryOptions, useQuery } from 'react-query';
import { WeeklyStats } from 'types/statistics';

const useWeeklyStatsQuery = (options?: UseQueryOptions<WeeklyStats>) => {
    return useQuery<WeeklyStats>(
        QUERY_KEYS.WeeklyStats(),
        async () => {
            try {
                const response = await fetch(`${generalConfig.API_URL}/thales/thales-io/weekly-stats`);
                const stats = await response.json();

                const safeboxFees = stats.safebox.map((safeboxData: any) => {
                    return { amount: safeboxData.fee, day: safeboxData.w.split(' ')[0] };
                });

                const revShare = stats.revShare.map((revShareData: any) => {
                    return { amount: revShareData.revShare, day: revShareData.day.split(' ')[0] };
                });

                return {
                    safeboxFees: safeboxFees,
                    revShare: revShare,
                };
            } catch (e) {
                console.log(e);
            }

            return {
                safeboxFees: [],
                revShare: [],
            };
        },
        {
            ...options,
        }
    );
};

export default useWeeklyStatsQuery;
