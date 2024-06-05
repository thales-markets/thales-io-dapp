import axios from 'axios';
import { generalConfig } from 'config/general';
import { API_ROUTES } from 'constants/routes';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import QUERY_KEYS from '../../constants/queryKeys';
import networkConnector from '../../utils/networkConnector';

type StakingClaimOnBehalfResponse = {
    enabledAddresses: string[];
};

const useStakingClaimOnBehalfQuery = (
    walletAddress: string,
    networkId: Network,
    options?: UseQueryOptions<StakingClaimOnBehalfResponse>
) => {
    return useQuery<StakingClaimOnBehalfResponse>(
        QUERY_KEYS.Token.ClaimOnBehalf(walletAddress, networkId),
        async () => {
            const response: StakingClaimOnBehalfResponse = {
                enabledAddresses: [],
            };
            try {
                const { stakingThalesContract } = networkConnector as any;
                if (stakingThalesContract) {
                    const canClaimOnBehalfItemsResponse = await axios.get(
                        `${generalConfig.API_URL}/${API_ROUTES.ClaimOnBehalf}/${networkId}?seller=${walletAddress}`
                    );

                    const canClaimOnBehalfItems = canClaimOnBehalfItemsResponse?.data
                        ? canClaimOnBehalfItemsResponse.data
                        : [];

                    canClaimOnBehalfItems.forEach((item: any) => {
                        if (item.canClaimOnBehalf) {
                            response.enabledAddresses.push(item.account.toLowerCase());
                        }
                    });
                }
                return response;
            } catch (e) {
                console.log(e);
                return response;
            }
        },
        {
            ...options,
        }
    );
};

export default useStakingClaimOnBehalfQuery;
