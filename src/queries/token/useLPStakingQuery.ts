import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter } from 'thales-utils';
import QUERY_KEYS from '../../constants/queryKeys';
import networkConnector from '../../utils/networkConnector';

type LPStakingThalesQueryResponse = {
    staked: number;
    rewards: number;
    secondRewards: number;
    paused: boolean;
};

const useLPStakingThalesQuery = (
    walletAddress: string,
    networkId: Network,
    options?: UseQueryOptions<LPStakingThalesQueryResponse>
) => {
    return useQuery<LPStakingThalesQueryResponse>(
        QUERY_KEYS.Token.LPStaking(walletAddress, networkId),
        async () => {
            const staking = {
                staked: 0,
                rewards: 0,
                secondRewards: 0,
                paused: false,
            };

            try {
                staking.paused = await (networkConnector as any).lpStakingRewardsContract.paused();

                if (walletAddress !== '') {
                    const [staked, rewards] = await Promise.all([
                        (networkConnector as any).lpStakingRewardsContract.balanceOf(walletAddress),
                        (networkConnector as any).lpStakingRewardsContract.earned(walletAddress),
                    ]);
                    staking.staked = bigNumberFormatter(staked);
                    staking.rewards = bigNumberFormatter(rewards[0]);
                    staking.secondRewards = bigNumberFormatter(rewards[1]);
                }
            } catch (e) {
                console.log(e);
            }

            console.log('staking ', staking);

            return staking;
        },
        {
            ...options,
        }
    );
};

export default useLPStakingThalesQuery;
