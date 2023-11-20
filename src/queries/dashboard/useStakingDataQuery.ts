import QUERY_KEYS from 'constants/queryKeys';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter } from 'thales-utils';
import { StakingData } from 'types/token';
import stakingDataContract from 'utils/contracts/stakingDataContract';

const useStakingDataQuery = (options?: UseQueryOptions<StakingData | undefined>) => {
    return useQuery<StakingData | undefined>(
        QUERY_KEYS.Token.StakingData(),
        async () => {
            const stakingData: StakingData = {
                totalStakedAmount: 0,
                totalStakedAmountOptimism: 0,
                totalStakedAmountArbitrum: 0,
                totalStakedAmountBase: 0,
                apyOptimism: 0,
                apyArbitrum: 0,
                apyBase: 0,
            };
            try {
                // Thales staked - Optimism
                const opInfuraProvider = new ethers.providers.InfuraProvider(
                    Network.OptimismMainnet,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                );

                const opThalesStakeContract = new ethers.Contract(
                    stakingDataContract.addresses[Network.OptimismMainnet],
                    stakingDataContract.abi,
                    opInfuraProvider
                );

                // Thales staked - Arbitrum
                const arbInfuraProvider = new ethers.providers.InfuraProvider(
                    Network.Arbitrum,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                );
                const arbThalesStakeContract = new ethers.Contract(
                    stakingDataContract.addresses[Network.Arbitrum],
                    stakingDataContract.abi,
                    arbInfuraProvider
                );

                // Thales staked - Base
                const baseAnkrProvider = new ethers.providers.JsonRpcProvider(
                    `https://rpc.ankr.com/base/${process.env.REACT_APP_ANKR_PROJECT_ID}`,
                    Network.Base
                );

                const baseThalesStakeContract = new ethers.Contract(
                    stakingDataContract.addresses[Network.Base],
                    stakingDataContract.abi,
                    baseAnkrProvider
                );

                const [contractStakingDataOp, contractStakingDataArb, contractStakingDataBase] = await Promise.all([
                    opThalesStakeContract.getStakingData(),
                    arbThalesStakeContract.getStakingData(),
                    baseThalesStakeContract.getStakingData(),
                ]);

                const [
                    opThalesStakeBalance,
                    opThalesTotalEscrowNotInStakingBalance,
                    opThalesTotalEscrowedBalance,
                    baseRewardsPoolOptimism,
                ] = [
                    bigNumberFormatter(contractStakingDataOp.totalStakedAmount),
                    bigNumberFormatter(contractStakingDataOp.totalEscrowBalanceNotIncludedInStaking),
                    bigNumberFormatter(contractStakingDataOp.totalEscrowedRewards),
                    bigNumberFormatter(contractStakingDataOp.baseRewardsPool),
                ];

                const [
                    arbThalesStakeBalance,
                    arbThalesTotalEscrowNotInStakingBalance,
                    arbThalesTotalEscrowedBalance,
                    baseRewardsPoolArbitrum,
                ] = [
                    bigNumberFormatter(contractStakingDataArb.totalStakedAmount),
                    bigNumberFormatter(contractStakingDataArb.totalEscrowBalanceNotIncludedInStaking),
                    bigNumberFormatter(contractStakingDataArb.totalEscrowedRewards),
                    bigNumberFormatter(contractStakingDataArb.baseRewardsPool),
                ];

                const [
                    baseThalesStakeBalance,
                    baseThalesTotalEscrowNotInStakingBalance,
                    baseThalesTotalEscrowedBalance,
                    baseRewardsPoolBase,
                ] = [
                    bigNumberFormatter(contractStakingDataBase.totalStakedAmount),
                    bigNumberFormatter(contractStakingDataBase.totalEscrowBalanceNotIncludedInStaking),
                    bigNumberFormatter(contractStakingDataBase.totalEscrowedRewards),
                    bigNumberFormatter(contractStakingDataBase.baseRewardsPool),
                ];

                stakingData.totalStakedAmountOptimism =
                    opThalesStakeBalance + opThalesTotalEscrowedBalance - opThalesTotalEscrowNotInStakingBalance;
                stakingData.totalStakedAmountArbitrum =
                    arbThalesStakeBalance + arbThalesTotalEscrowNotInStakingBalance - arbThalesTotalEscrowedBalance;
                stakingData.totalStakedAmountBase =
                    baseThalesStakeBalance + baseThalesTotalEscrowNotInStakingBalance - baseThalesTotalEscrowedBalance;

                stakingData.totalStakedAmount =
                    stakingData.totalStakedAmountOptimism +
                    stakingData.totalStakedAmountArbitrum +
                    stakingData.totalStakedAmountBase;

                stakingData.apyOptimism =
                    (baseRewardsPoolOptimism * 52 * 100) /
                    (opThalesStakeBalance + opThalesTotalEscrowedBalance - opThalesTotalEscrowNotInStakingBalance);

                stakingData.apyArbitrum =
                    (baseRewardsPoolArbitrum * 52 * 100) /
                    (arbThalesStakeBalance + arbThalesTotalEscrowNotInStakingBalance - arbThalesTotalEscrowedBalance);

                stakingData.apyBase =
                    (baseRewardsPoolBase * 52 * 100) /
                    (baseThalesStakeBalance +
                        baseThalesTotalEscrowNotInStakingBalance -
                        baseThalesTotalEscrowedBalance);

                return stakingData;
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

export default useStakingDataQuery;
