import axios from 'axios';
import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { API_ROUTES } from 'constants/routes';
import { StakersFilterEnum } from 'enums/governance';
import { Network } from 'enums/network';
import { orderBy } from 'lodash';
import { useQuery, UseQueryOptions } from 'react-query';
import { Staker, Stakers } from 'types/governance';

const useThalesStakersQuery = (filter: StakersFilterEnum, options?: UseQueryOptions<Stakers>) => {
    return useQuery<Stakers>(
        QUERY_KEYS.Governance.ThalesStakers(filter),
        async () => {
            const [stakersResponse, stakersArbResponse, stakersBaseResponse] = await Promise.all([
                axios.get(`${generalConfig.API_URL}/${API_ROUTES.Stakers}/${Network.OptimismMainnet}`),
                axios.get(`${generalConfig.API_URL}/${API_ROUTES.Stakers}/${Network.Arbitrum}`),
                axios.get(`${generalConfig.API_URL}/${API_ROUTES.Stakers}/${Network.Base}`),
            ]);

            const stakers = stakersResponse?.data ? stakersResponse.data : [];
            const stakersArb = stakersArbResponse?.data ? stakersArbResponse.data : [];
            const stakersBase = stakersBaseResponse?.data ? stakersBaseResponse.data : [];

            let stakersFinal: Stakers = [];
            if (filter === StakersFilterEnum.Optimism) {
                stakersFinal = stakers;
            } else if (filter === StakersFilterEnum.Arbitrum) {
                stakersFinal = stakersArb;
            } else if (filter === StakersFilterEnum.Base) {
                stakersFinal = stakersBase;
            } else {
                const mapToUse = new Map();
                stakersFinal = stakers;

                [...stakers].map((staker: Staker) => {
                    mapToUse.set(staker.id, staker.totalStakedAmount);
                });

                stakersArb.map((staker: Staker) => {
                    if (mapToUse.get(staker.id)) {
                        mapToUse.set(staker.id, staker.totalStakedAmount + mapToUse.get(staker.id));
                    } else {
                        stakersFinal.push(staker);
                    }
                });

                stakersBase.map((staker: Staker) => {
                    if (mapToUse.get(staker.id)) {
                        mapToUse.set(staker.id, staker.totalStakedAmount + mapToUse.get(staker.id));
                    } else {
                        stakersFinal.push(staker);
                    }
                });

                stakersFinal = stakersFinal.map((staker) => {
                    if (mapToUse.get(staker.id)) {
                        staker.totalStakedAmount = mapToUse.get(staker.id);
                    }
                    return staker;
                });
            }

            return orderBy(
                stakersFinal.filter((staker: Staker) => staker.totalStakedAmount > 0),
                ['totalStakedAmount'],
                ['desc']
            );
        },
        {
            ...options,
        }
    );
};

export default useThalesStakersQuery;
