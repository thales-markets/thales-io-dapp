import QUERY_KEYS from 'constants/queryKeys';
import { Network } from 'enums/network';
import { UseQueryOptions, useQuery } from 'react-query';
import thalesData from 'thales-data';
import { StakersInfo } from 'types/token';

const useStakersInfoQuery = (options?: UseQueryOptions<StakersInfo | undefined>) => {
    return useQuery<StakersInfo | undefined>(
        QUERY_KEYS.Token.StakersInfo(),
        async () => {
            const stakersInfo: StakersInfo = {
                opStakers: 0,
                arbStakers: 0,
                baseStakers: 0,
                totalStakers: 0,
            };
            try {
                const [stakers, stakersArb, stakersBase] = await Promise.all([
                    thalesData.binaryOptions.stakers({
                        network: Network.OptimismMainnet,
                    }),
                    thalesData.binaryOptions.stakers({
                        network: Network.Arbitrum,
                    }),
                    thalesData.binaryOptions.stakers({
                        network: Network.Base,
                    }),
                ]);

                stakersInfo.opStakers = stakers.length;
                stakersInfo.arbStakers = stakersArb.length;
                stakersInfo.baseStakers = stakersBase.length;
                stakersInfo.totalStakers = stakers.length + stakersArb.length + stakersBase.length;

                return stakersInfo;
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

export default useStakersInfoQuery;
