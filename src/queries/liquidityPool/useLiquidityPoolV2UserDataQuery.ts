import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter, coinFormatter, Coins } from 'thales-utils';
import { UserLiquidityPoolData } from 'types/liquidityPool';
import networkConnector from 'utils/networkConnector';
import QUERY_KEYS from '../../constants/queryKeys';

const useLiquidityPoolV2UserDataQuery = (
    address: string,
    collateral: Coins,
    walletAddress: string,
    networkId: Network,
    options?: UseQueryOptions<UserLiquidityPoolData | undefined>
) => {
    return useQuery<UserLiquidityPoolData | undefined>(
        QUERY_KEYS.LiquidityPoolV2.UserData(address, walletAddress, networkId),
        async () => {
            const userLiquidityPoolData: UserLiquidityPoolData = {
                balanceCurrentRound: 0,
                balanceNextRound: 0,
                balanceTotal: 0,
                isWithdrawalRequested: false,
                hasDepositForCurrentRound: false,
                hasDepositForNextRound: false,
                withdrawalShare: 0,
                isPartialWithdrawalRequested: false,
                withdrawalAmount: 0,
                stakedThales: 0,
                maxDeposit: 0,
                availableToDeposit: 0,
            };

            try {
                const { liquidityPoolDataV2Contract } = networkConnector;
                if (liquidityPoolDataV2Contract) {
                    const contractUserLiquidityPoolData = await liquidityPoolDataV2Contract.getUserLiquidityPoolData(
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

export default useLiquidityPoolV2UserDataQuery;
