import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter, coinFormatter, Coins } from 'thales-utils';
import { UserLiquidityPoolData } from 'types/liquidityPool';
import networkConnector from 'utils/networkConnector';
import QUERY_KEYS from '../../constants/queryKeys';

const useThalesLiquidityPoolUserDataQuery = (
    address: string,
    collateral: Coins,
    walletAddress: string,
    networkId: Network,
    options?: UseQueryOptions<UserLiquidityPoolData | undefined>
) => {
    return useQuery<UserLiquidityPoolData | undefined>(
        QUERY_KEYS.ThalesLiquidityPool.UserData(address, walletAddress, networkId),
        async () => {
            const userLiquidityPoolData: UserLiquidityPoolData = {
                balanceCurrentRound: 0,
                balanceNextRound: 0,
                balanceTotal: 0,
                isWithdrawalRequested: false,
                hasDepositForCurrentRound: false,
                hasDepositForNextRound: false,
                stakedThales: 0,
                maxDeposit: 0,
                availableToDeposit: 0,
                withdrawalShare: 0,
                isPartialWithdrawalRequested: false,
                withdrawalAmount: 0,
            };

            try {
                const { thalesLiquidityPoolDataContract } = networkConnector;
                if (thalesLiquidityPoolDataContract) {
                    const contractUserLiquidityPoolData = await thalesLiquidityPoolDataContract.getUserLiquidityPoolData(
                        address,
                        walletAddress
                    );

                    userLiquidityPoolData.isWithdrawalRequested = contractUserLiquidityPoolData.withdrawalRequested;
                    userLiquidityPoolData.withdrawalShare = bigNumberFormatter(
                        contractUserLiquidityPoolData.withdrawalShare
                    );
                    userLiquidityPoolData.isPartialWithdrawalRequested = userLiquidityPoolData.withdrawalShare > 0;

                    userLiquidityPoolData.balanceCurrentRound = coinFormatter(
                        contractUserLiquidityPoolData.balanceCurrentRound,
                        networkId,
                        collateral
                    );
                    userLiquidityPoolData.balanceNextRound = coinFormatter(
                        contractUserLiquidityPoolData.balanceNextRound,
                        networkId,
                        collateral
                    );
                    userLiquidityPoolData.withdrawalAmount = userLiquidityPoolData.isWithdrawalRequested
                        ? userLiquidityPoolData.isPartialWithdrawalRequested
                            ? userLiquidityPoolData.balanceCurrentRound * userLiquidityPoolData.withdrawalShare
                            : userLiquidityPoolData.balanceCurrentRound
                        : 0;

                    userLiquidityPoolData.balanceTotal =
                        userLiquidityPoolData.balanceCurrentRound -
                        userLiquidityPoolData.withdrawalAmount +
                        userLiquidityPoolData.balanceNextRound;

                    userLiquidityPoolData.hasDepositForCurrentRound = userLiquidityPoolData.balanceCurrentRound > 0;
                    userLiquidityPoolData.hasDepositForNextRound = userLiquidityPoolData.balanceNextRound > 0;
                    userLiquidityPoolData.maxDeposit = coinFormatter(
                        contractUserLiquidityPoolData.maxDeposit,
                        networkId,
                        collateral
                    );
                    userLiquidityPoolData.stakedThales = bigNumberFormatter(contractUserLiquidityPoolData.stakedThales);
                    userLiquidityPoolData.availableToDeposit = coinFormatter(
                        contractUserLiquidityPoolData.availableToDeposit,
                        networkId,
                        collateral
                    );

                    return userLiquidityPoolData;
                }
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

export default useThalesLiquidityPoolUserDataQuery;
