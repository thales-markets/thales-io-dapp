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

                const filteredStakers = [...stakers, ...stakersArb, ...stakersBase]
                    .filter((staker: any) => staker.totalStakedAmount > 0)
                    .map((staker: any) => staker.id.toLowerCase());

                const totalStakers = new Set<any>(filteredStakers);

                stakersInfo.totalStakers = totalStakers.size;

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
