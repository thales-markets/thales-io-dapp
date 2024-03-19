import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { EcosystemApp } from 'pages/LandingPage/components/EcosystemApps/types';
import { useQuery, UseQueryOptions } from 'react-query';

export const useGetEcosystemAppsQuery = (options?: UseQueryOptions<EcosystemApp[]>) => {
    return useQuery<EcosystemApp[]>(
        QUERY_KEYS.Landing.EcosystemApps(),
        async () => {
            try {
                const response = await fetch(`${generalConfig.API_URL}/thales/thales-io/ecosystem-apps`);
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
