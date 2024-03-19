import { THALES_CURRENCY } from 'constants/currency';
import { BALANCE_THRESHOLD } from 'constants/token';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter, formatCurrencyWithKey, formatPercentage } from 'thales-utils';
import networkConnector from 'utils/networkConnector';
import QUERY_KEYS from '../../constants/queryKeys';

type UserStakingData = {
    thalesStaked: string;
    totalStaked: string;
    share: string;
    baseRewards: string;
};

const DEFAULT_USER_STAKING_DATA = {
    thalesStaked: '-',
    totalStaked: '-',
    share: '-',
    baseRewards: '-',
};

const useUserBaseRewardsQuery = (
    walletAddress: string,
    networkId: Network,
    options?: UseQueryOptions<UserStakingData | undefined>
) => {
    return useQuery<UserStakingData | undefined>(
        QUERY_KEYS.Token.UserBaseRewards(walletAddress, networkId),
        async () => {
            try {
                const { stakingDataContract } = networkConnector;

                if (!walletAddress) {
                    return DEFAULT_USER_STAKING_DATA;
                }

                const [contractStakingData, contractUserStakingData] = await Promise.all([
                    stakingDataContract?.getStakingData(),
                    stakingDataContract?.getUserStakingData(walletAddress),
                ]);

                const thalesStaked =
                    bigNumberFormatter(contractUserStakingData.thalesStaked) < BALANCE_THRESHOLD
                        ? 0
                        : bigNumberFormatter(contractUserStakingData.thalesStaked);

                const escrowedBalance = bigNumberFormatter(contractUserStakingData.escrowedBalance);

                const totalEscrowBalanceNotIncludedInStaking = bigNumberFormatter(
                    contractStakingData.totalEscrowBalanceNotIncludedInStaking
                );
                const totalEscrowedRewards = bigNumberFormatter(contractStakingData.totalEscrowedRewards);

                const totalStaked =
                    bigNumberFormatter(contractStakingData.totalStakedAmount) +
                    totalEscrowedRewards -
                    totalEscrowBalanceNotIncludedInStaking;

                const baseRewardsPool = bigNumberFormatter(contractStakingData.baseRewardsPool);

                const baseRewards = (baseRewardsPool * (thalesStaked + escrowedBalance)) / totalStaked;

                return {
                    thalesStaked: formatCurrencyWithKey(THALES_CURRENCY, thalesStaked + escrowedBalance),
                    totalStaked: formatCurrencyWithKey(THALES_CURRENCY, totalStaked),
                    share: formatPercentage((thalesStaked + escrowedBalance) / totalStaked),
                    baseRewards: formatCurrencyWithKey(THALES_CURRENCY, baseRewards),
                };
            } catch (e) {
                console.log(e);
                return DEFAULT_USER_STAKING_DATA;
            }
        },
        {
            ...options,
        }
    );
};

export default useUserBaseRewardsQuery;
