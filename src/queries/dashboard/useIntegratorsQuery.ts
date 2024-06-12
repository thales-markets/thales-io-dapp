import axios from 'axios';
import { generalConfig } from 'config/general';
import INTEGRATORS from 'constants/integrators';
import QUERY_KEYS from 'constants/queryKeys';
import { API_ROUTES } from 'constants/routes';
import { Network } from 'enums/network';
import { orderBy } from 'lodash';
import { useQuery, UseQueryOptions } from 'react-query';
import { Integrator } from 'types/integrator';

const useIntegratorsQuery = (options?: UseQueryOptions<Integrator[] | null>) => {
    return useQuery<Integrator[] | null>(
        QUERY_KEYS.Integrators(),
        async () => {
            try {
                const [
                    referrersOptimismResponse,
                    referrersArbitrumResponse,
                    referrersBaseResponse,
                ] = await Promise.all([
                    axios.get(
                        `${generalConfig.API_URL}/${API_ROUTES.SportMarkets.Referrers}/${Network.OptimismMainnet}`
                    ),
                    axios.get(`${generalConfig.API_URL}/${API_ROUTES.SportMarkets.Referrers}/${Network.Arbitrum}`),
                    axios.get(`${generalConfig.API_URL}/${API_ROUTES.SportMarkets.Referrers}/${Network.Base}`),
                ]);

                const referrersOptimism = referrersOptimismResponse?.data ? referrersOptimismResponse.data : [];
                const referrersArbitrum = referrersArbitrumResponse?.data ? referrersArbitrumResponse.data : [];
                const referrersBase = referrersBaseResponse?.data ? referrersBaseResponse.data : [];

                const integratorsAddresses = INTEGRATORS.map((integrator) => integrator.address.toLowerCase());

                const integratorsOptimism = referrersOptimism.filter((integrator: Integrator) =>
                    integratorsAddresses.includes(integrator.id.toLowerCase())
                );

                const integratorsArbitrum = referrersArbitrum.filter((integrator: Integrator) =>
                    integratorsAddresses.includes(integrator.id.toLowerCase())
                );

                const integratorsBase = referrersBase.filter((integrator: Integrator) =>
                    integratorsAddresses.includes(integrator.id.toLowerCase())
                );

                const integrators = integratorsAddresses.map((integratorAddress: string) => {
                    const aggregatedIntegrator: Integrator = {
                        id: integratorAddress,
                        totalVolume: 0,
                        trades: 0,
                        totalEarned: 0,
                        timestamp: new Date().getTime(),
                        url: '',
                    };

                    integratorsOptimism.forEach((opIntegrator: Integrator) => {
                        if (opIntegrator.id.toLowerCase() === integratorAddress.toLowerCase()) {
                            aggregatedIntegrator.totalVolume += opIntegrator.totalVolume;
                            aggregatedIntegrator.trades += opIntegrator.trades;
                            aggregatedIntegrator.totalEarned += opIntegrator.totalEarned;
                        }
                    });

                    integratorsArbitrum.forEach((arbIntegrator: Integrator) => {
                        if (arbIntegrator.id.toLowerCase() === integratorAddress.toLowerCase()) {
                            aggregatedIntegrator.totalVolume += arbIntegrator.totalVolume;
                            aggregatedIntegrator.trades += arbIntegrator.trades;
                            aggregatedIntegrator.totalEarned += arbIntegrator.totalEarned;
                        }
                    });

                    integratorsBase.forEach((baseIntegrator: Integrator) => {
                        if (baseIntegrator.id.toLowerCase() === integratorAddress.toLowerCase()) {
                            aggregatedIntegrator.totalVolume += baseIntegrator.totalVolume;
                            aggregatedIntegrator.trades += baseIntegrator.trades;
                            aggregatedIntegrator.totalEarned += baseIntegrator.totalEarned;
                        }
                    });

                    const integrator = INTEGRATORS.find(
                        (integrator) => integrator.address.toLowerCase() === aggregatedIntegrator.id.toLowerCase()
                    );
                    aggregatedIntegrator.id = integrator ? integrator.name : aggregatedIntegrator.id;
                    aggregatedIntegrator.url = integrator ? integrator.url : '';

                    return aggregatedIntegrator;
                });

                const sortedIntegrators = orderBy(integrators, ['totalVolume'], ['desc']);
                return sortedIntegrators;
            } catch (e) {
                console.log('E ', e);
                return null;
            }
        },
        {
            ...options,
        }
    );
};

export default useIntegratorsQuery;
