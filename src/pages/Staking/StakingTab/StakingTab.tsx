import SwitchInput from 'components/SwitchInput';
import { THALES_CURRENCY } from 'constants/currency';
import useThalesStakingDataQuery from 'queries/token/useThalesStakingDataQuery';
import useUserStakingDataQuery from 'queries/token/useUserStakingData';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { useTheme } from 'styled-components';
import { formatCurrencyWithKey, formatCurrencyWithPrecision } from 'thales-utils';
import { ThalesStakingData, UserStakingData } from 'types/token';
import { getNumberLabel } from 'utils/number';
import { aprToApy } from 'utils/token';
import { InfoDiv, SectionTitle } from '../styled-components';
import Stake from './Stake';
import YourTransactions from './Transactions/YourTransactions';
import Unstake from './Unstake';
import { Bottom, Container, UpperLeft, UpperRight } from './styled-components';

const StakingTab: React.FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    const [lastValidStakingData, setLastValidStakingData] = useState<ThalesStakingData | undefined>(undefined);
    const [lastValidUserStakingData, setLastValidUserStakingData] = useState<UserStakingData | undefined>(undefined);
    const [stakeSelected, setStakeSelected] = useState<boolean>(true);

    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));

    const stakingDataQuery = useThalesStakingDataQuery(networkId, {
        enabled: isAppReady,
    });

    useEffect(() => {
        if (stakingDataQuery.isSuccess && stakingDataQuery.data) {
            setLastValidStakingData(stakingDataQuery.data);
        }
    }, [stakingDataQuery.isSuccess, stakingDataQuery.data]);

    const stakingData: ThalesStakingData | undefined = useMemo(() => {
        if (stakingDataQuery.isSuccess && stakingDataQuery.data) {
            return stakingDataQuery.data;
        }
        return lastValidStakingData;
    }, [stakingDataQuery.isSuccess, stakingDataQuery.data, lastValidStakingData]);

    const userStakingDataQuery = useUserStakingDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    useEffect(() => {
        if (userStakingDataQuery.isSuccess && userStakingDataQuery.data) {
            setLastValidUserStakingData(userStakingDataQuery.data);
        }
    }, [userStakingDataQuery.isSuccess, userStakingDataQuery.data]);

    const userStakingData: UserStakingData | undefined = useMemo(() => {
        if (userStakingDataQuery.isSuccess && userStakingDataQuery.data) {
            return userStakingDataQuery.data;
        }
        return lastValidUserStakingData;
    }, [userStakingDataQuery.isSuccess, userStakingDataQuery.data, lastValidUserStakingData]);

    const totalStakedAmount = stakingData ? stakingData.totalStakedAmount : 0;
    const baseRewardsPool = stakingData ? stakingData.baseRewardsPool : 0;
    const totalEscrowedRewards = stakingData ? stakingData.totalEscrowedRewards : 0;
    const totalEscrowBalanceNotIncludedInStaking = stakingData ? stakingData.totalEscrowBalanceNotIncludedInStaking : 0;
    const maxBonusRewardsPercentage = stakingData ? stakingData.maxBonusRewardsPercentage : 0;

    const thalesStaked = userStakingData ? userStakingData.thalesStaked : 0;
    const escrowedBalance = userStakingData ? userStakingData.escrowedBalance : 0;
    const unstakingAmount = userStakingData ? userStakingData.unstakingAmount : 0;
    console.log(maxBonusRewardsPercentage, unstakingAmount);
    const APR = useMemo(
        () =>
            totalStakedAmount === 0
                ? 0
                : (Number(baseRewardsPool) * 52 * 100) /
                  (Number(totalStakedAmount) +
                      Number(totalEscrowedRewards) -
                      Number(totalEscrowBalanceNotIncludedInStaking)),
        [baseRewardsPool, totalStakedAmount, totalEscrowedRewards, totalEscrowBalanceNotIncludedInStaking]
    );

    const formattedAPY = useMemo(() => getNumberLabel(aprToApy(APR)), [APR]);

    const totalThalesStaked = useMemo(
        () => totalStakedAmount + totalEscrowedRewards - totalEscrowBalanceNotIncludedInStaking,
        [totalStakedAmount, totalEscrowedRewards, totalEscrowBalanceNotIncludedInStaking]
    );

    const myStakedShare = useMemo(
        () => (totalThalesStaked === 0 ? 0 : (100 * (thalesStaked + escrowedBalance)) / totalThalesStaked),
        [thalesStaked, totalThalesStaked, escrowedBalance]
    );

    const estimatedRewards = useMemo(() => (myStakedShare / 100) * baseRewardsPool, [myStakedShare, baseRewardsPool]);

    return (
        <>
            <Container>
                <UpperLeft>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--staking" />
                            {t('staking.staking.staking-data.title')}
                        </span>
                    </SectionTitle>
                    <div>
                        <InfoDiv>
                            <span>APY:</span>
                            <span>{formattedAPY}%</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.staking.staking-data.my-staking-share')}:</span>
                            <span>{formatCurrencyWithPrecision(myStakedShare)}%</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.staking.staking-data.estimated-rewards')}:</span>
                            <span>{formatCurrencyWithKey(THALES_CURRENCY, estimatedRewards)}</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.staking.staking-data.for-date')}:</span>
                            <span>18.12-21.12</span>
                        </InfoDiv>
                    </div>
                </UpperLeft>
                <UpperRight>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--person" />
                            {t('staking.staking.my-balance.title')}
                        </span>
                        <span>{formatCurrencyWithKey(THALES_CURRENCY, escrowedBalance + thalesStaked)}</span>
                    </SectionTitle>
                    <div>
                        <InfoDiv>
                            <span>{t('staking.staking.my-balance.staked-directly')}:</span>
                            <span>{formatCurrencyWithKey(THALES_CURRENCY, thalesStaked)}</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.staking.my-balance.escrowed-balance')}:</span>
                            <span>{formatCurrencyWithKey(THALES_CURRENCY, escrowedBalance)}</span>
                        </InfoDiv>
                    </div>
                </UpperRight>
                <Bottom>
                    <SwitchInput
                        label={{
                            firstLabel: t('staking.staking.stake-unstake.stake'),
                            secondLabel: t('staking.staking.stake-unstake.unstake'),
                            fontSize: '18px',
                        }}
                        borderColor={theme.borderColor.secondary}
                        dotBackground={theme.textColor.secondary}
                        dotSize="20px"
                        active={!stakeSelected}
                        handleClick={() => setStakeSelected(!stakeSelected)}
                    />
                    {stakeSelected ? <Stake /> : <Unstake />}
                </Bottom>
            </Container>
            <YourTransactions width="60%" />
        </>
    );
};

export default StakingTab;
