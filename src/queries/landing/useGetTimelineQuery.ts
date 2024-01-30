import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { Quarter } from 'pages/LandingPage/components/Timeline/types';
import { UseQueryOptions, useQuery } from 'react-query';

export const useGetTimelineQuery = (options?: UseQueryOptions<Quarter[]>) => {
    return useQuery<Quarter[]>(
        QUERY_KEYS.Landing.Timeline(),
        async () => {
            try {
                const response = await fetch(`${generalConfig.API_URL}/thales/thales-io/timeline`);
                return response.json();
            } catch (e) {
                console.log('error', e);
                return [];
            }
        },
        {
            ...options,
        }
    );
};
