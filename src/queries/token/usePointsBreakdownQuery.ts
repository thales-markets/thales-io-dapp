import { THALES_CURRENCY, USD_SIGN } from 'constants/currency';
import { Network } from 'enums/network';
import { UseQueryOptions, useQuery } from 'react-query';
import { bigNumberFormatter, formatCurrency, formatCurrencyWithKey } from 'thales-utils';
import networkConnector from 'utils/networkConnector';
import QUERY_KEYS from '../../constants/queryKeys';

export type PointsData = {
    vaultsVolume: string;
    lpVolume: string;
    tradingVolume: string;
    vaultsMultiplier: number;
    tradingMultiplier: number;
    lpMultiplier: number;
    stakingMultiplier: string | number;

    vaultsPoints: string | number;
    lpPoints: string | number;
    tradingPoints: string | number;

    thalesStaked: string;
    thalesDivider: string;
    totalPoints: string | number;
    totalBonusRewards: string | number;
};

const DEFAULT_POINTS_BREAKDOWN_DATA = {
    vaultsVolume: '-',
    lpVolume: '-',
    tradingVolume: '-',
    vaultsMultiplier: 0,
    tradingMultiplier: 0,
    lpMultiplier: 0,
    stakingMultiplier: '-',

    vaultsPoints: '-',
    lpPoints: '-',
    tradingPoints: '-',

    thalesStaked: '-',
    thalesDivider: '-',
    totalPoints: '-',
    totalBonusRewards: '-',
};

const usePointsBreakdownQuery = (
    walletAddress: string,
    networkId: Network,
    options?: UseQueryOptions<PointsData | undefined>
) => {
    return useQuery<PointsData | undefined>(
        QUERY_KEYS.Token.PointsBreakdown(walletAddress, networkId),
        async () => {
            const { stakingThalesContract } = networkConnector;
            const { stakingBonusRewardsManager } = networkConnector;

            if (!walletAddress) {
                return DEFAULT_POINTS_BREAKDOWN_DATA;
            }

            try {
                const period = await stakingThalesContract?.periodsOfStaking();
                const [
                    vaultsPoints,
                    lpPoints,
                    tradingPoints,
                    vaultsMultiplier,
                    lpMultiplier,
                    tradingMultiplier,
                    stakingMultiplier,
                    stakedBalance,
                    thalesDivider,
                    totalBonus,
                ] = await Promise.all([
                    stakingBonusRewardsManager?.userVaultBasePointsPerRound(walletAddress, Number(period) - 1),
                    stakingBonusRewardsManager?.userLPBasePointsPerRound(walletAddress, Number(period) - 1),
                    stakingBonusRewardsManager?.userTradingBasePointsPerRound(walletAddress, Number(period) - 1),
                    stakingBonusRewardsManager?.vaultsMultiplier(),
                    stakingBonusRewardsManager?.lpMultiplier(),
                    stakingBonusRewardsManager?.tradingMultiplier(),
                    stakingBonusRewardsManager?.getStakingMultiplier(walletAddress),
                    stakingThalesContract?.stakedBalanceOf(walletAddress),
                    stakingBonusRewardsManager?.stakingBaseDivider(),
                    stakingThalesContract?.getTotalBonus(walletAddress),
                ]);

                return {
                    vaultsVolume: formatCurrencyWithKey(USD_SIGN, bigNumberFormatter(vaultsPoints)),
                    lpVolume: formatCurrencyWithKey(USD_SIGN, bigNumberFormatter(lpPoints)),
                    tradingVolume: formatCurrencyWithKey(USD_SIGN, bigNumberFormatter(tradingPoints)),
                    vaultsMultiplier: bigNumberFormatter(vaultsMultiplier),
                    lpMultiplier: bigNumberFormatter(lpMultiplier),
                    tradingMultiplier: bigNumberFormatter(tradingMultiplier),
                    stakingMultiplier: formatCurrency(bigNumberFormatter(stakingMultiplier) + 1),
                    vaultsPoints: formatCurrency(
                        bigNumberFormatter(vaultsPoints) * bigNumberFormatter(vaultsMultiplier)
                    ),
                    lpPoints: formatCurrency(bigNumberFormatter(lpPoints) * bigNumberFormatter(lpMultiplier)),
                    tradingPoints: formatCurrency(
                        bigNumberFormatter(tradingPoints) * bigNumberFormatter(tradingMultiplier)
                    ),
                    thalesStaked: formatCurrencyWithKey(THALES_CURRENCY, bigNumberFormatter(stakedBalance)),
                    thalesDivider: formatCurrencyWithKey(THALES_CURRENCY, Number(thalesDivider)),
                    totalPoints: formatCurrency(
                        (bigNumberFormatter(vaultsPoints) * bigNumberFormatter(vaultsMultiplier) +
                            bigNumberFormatter(lpPoints) * bigNumberFormatter(lpMultiplier) +
                            bigNumberFormatter(tradingPoints) * bigNumberFormatter(tradingMultiplier)) *
                            (bigNumberFormatter(stakingMultiplier) + 1)
                    ),
                    totalBonusRewards: formatCurrency(bigNumberFormatter(totalBonus)),
                };
            } catch (e) {
                console.log(e);
                return DEFAULT_POINTS_BREAKDOWN_DATA;
            }
        },
        {
            ...options,
        }
    );
};

export default usePointsBreakdownQuery;
