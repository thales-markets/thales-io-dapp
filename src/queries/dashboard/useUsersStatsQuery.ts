import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { UseQueryOptions, useQuery } from 'react-query';
import { UsersStats } from 'types/statistics';

const useUsersStatsQuery = (options?: UseQueryOptions<UsersStats | undefined>) => {
    return useQuery<UsersStats | undefined>(
        QUERY_KEYS.UsersStats(),
        async () => {
            try {
                const response = await fetch(`${generalConfig.API_URL}/thales/thales-io/users-data`);
                const userStatsResp = JSON.parse(await response.text());

                const usersStat: UsersStats = {
                    totalUniqueUsers: userStatsResp['total-unique-users'],
                    averageUniqueUsers: userStatsResp['average-unique-users'],
                    averageMonthlyUsers: userStatsResp['average-monthly-users'],
                };
                return usersStat;
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

export default useUsersStatsQuery;
