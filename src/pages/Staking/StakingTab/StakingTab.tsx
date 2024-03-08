import Collapse from 'components/Collapse';
import LoadingContainer from 'components/LoadingContainer';
import SwitchInput from 'components/SwitchInput';
import Tooltip from 'components/Tooltip';
import { THALES_CURRENCY } from 'constants/currency';
import useGlobalStakingDataQuery from 'queries/token/useGlobalStakingDataQuery';
import useThalesStakingDataQuery from 'queries/token/useThalesStakingDataQuery';
import useUserStakingDataQuery from 'queries/token/useUserStakingData';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { useTheme } from 'styled-components';
import { FlexDiv, FlexDivColumn } from 'styles/common';
import { formatCurrencyWithKey, formatCurrencyWithPrecision } from 'thales-utils';
import { GlobalStakingData, ThalesStakingData, UserStakingData } from 'types/token';
import { InfoDiv, SectionTitle, TooltipContainer } from '../styled-components';
import Stake from './Stake';
import YourTransactions from './Transactions/YourTransactions';
import Unstake from './Unstake';
import { AboutToken, Bottom, Container, UpperLeft, UpperRight, WarningMessage } from './styled-components';

const StakingTab: React.FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    const [lastValidStakingData, setLastValidStakingData] = useState<ThalesStakingData | undefined>(undefined);
    const [lastValidUserStakingData, setLastValidUserStakingData] = useState<UserStakingData | undefined>(undefined);
    const [lastValidGlobalStakingData, setLastValidGlobalStakingData] = useState<GlobalStakingData | undefined>(
        undefined
    );
    const [stakeSelected, setStakeSelected] = useState<boolean>(true);

    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));

    const stakingDataQuery = useThalesStakingDataQuery(networkId, {
        enabled: isAppReady,
    });

    const globalStakingDataQuery = useGlobalStakingDataQuery({ enabled: isAppReady });

    useEffect(() => {
        if (globalStakingDataQuery.isSuccess && globalStakingDataQuery.data) {
            setLastValidGlobalStakingData(globalStakingDataQuery.data);
        }
    }, [globalStakingDataQuery.isSuccess, globalStakingDataQuery.data]);

    const globalStakingData: GlobalStakingData | undefined = useMemo(() => {
        if (globalStakingDataQuery.isSuccess && globalStakingDataQuery.data) {
            return globalStakingDataQuery.data;
        }
        return lastValidGlobalStakingData;
    }, [globalStakingDataQuery.isSuccess, globalStakingDataQuery.data, lastValidGlobalStakingData]);

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
    const totalEscrowedRewards = stakingData ? stakingData.totalEscrowedRewards : 0;
    const totalEscrowBalanceNotIncludedInStaking = stakingData ? stakingData.totalEscrowBalanceNotIncludedInStaking : 0;
    // const maxBonusRewardsPercentage = stakingData ? stakingData.maxBonusRewardsPercentage : 0;

    const thalesStaked = userStakingData ? userStakingData.thalesStaked : 0;
    const escrowedBalance = userStakingData ? userStakingData.escrowedBalance : 0;
    // const unstakingAmount = userStakingData ? userStakingData.unstakingAmount : 0;

    const totalThalesStaked = useMemo(
        () => totalStakedAmount + totalEscrowedRewards - totalEscrowBalanceNotIncludedInStaking,
        [totalStakedAmount, totalEscrowedRewards, totalEscrowBalanceNotIncludedInStaking]
    );

    const myStakedShare = useMemo(
        () => (totalThalesStaked === 0 ? 0 : (100 * (thalesStaked + escrowedBalance)) / totalThalesStaked),
        [thalesStaked, totalThalesStaked, escrowedBalance]
    );

    const notEligibleForStakingRewards = thalesStaked === 0 && escrowedBalance > 0;

    return (
        <>
            <Container>
                <UpperLeft>
                    <LoadingContainer
                        isLoading={
                            globalStakingDataQuery.isLoading ||
                            userStakingDataQuery.isLoading ||
                            stakingDataQuery.isLoading
                        }
                    >
                        <SectionTitle>
                            <span>
                                <i className="icon icon--staking" />
                                {t('staking.staking.staking-data.title')}
                            </span>
                        </SectionTitle>
                        <div>
                            <InfoDiv height="20px">
                                <TooltipContainer>
                                    APY{' '}
                                    <Tooltip
                                        marginBottom={2}
                                        overlay={t('staking.staking.staking-data.apy-tooltip')}
                                        mobileIconFontSize={11}
                                        iconFontSize={11}
                                    />
                                </TooltipContainer>
                                <span>
                                    <FlexDiv gap="5px">
                                        <TooltipContainer>
                                            {globalStakingData?.thalesApy}%{' '}
                                            <Tooltip
                                                overlay={t(
                                                    'staking.staking.staking-data.bonus-estimated-rewards-tooltip'
                                                )}
                                                mobileIconFontSize={11}
                                                iconFontSize={11}
                                            />{' '}
                                        </TooltipContainer>
                                        <TooltipContainer>
                                            {' '}
                                            + {globalStakingData?.feeApy}%{' '}
                                            <Tooltip
                                                overlay={t('staking.staking.staking-data.fee-rewards-tooltip')}
                                                mobileIconFontSize={11}
                                                iconFontSize={11}
                                            />
                                        </TooltipContainer>
                                    </FlexDiv>
                                </span>
                            </InfoDiv>
                            <InfoDiv>
                                <TooltipContainer>
                                    {t('staking.staking.staking-data.my-staking-share')}
                                    <Tooltip
                                        marginBottom={2}
                                        overlay={t('staking.staking.staking-data.staked-share-tooltip')}
                                        mobileIconFontSize={11}
                                        iconFontSize={11}
                                    />
                                </TooltipContainer>
                                <span>{formatCurrencyWithPrecision(myStakedShare)}%</span>
                            </InfoDiv>
                        </div>
                    </LoadingContainer>
                </UpperLeft>
                <UpperRight>
                    <LoadingContainer isLoading={userStakingDataQuery.isLoading}>
                        <SectionTitle>
                            <TooltipContainer>
                                <i className="icon icon--person" />
                                {t('staking.staking.my-balance.title')}
                                <Tooltip
                                    overlay={t('staking.rewards.base-rewards.tooltips.your-staked')}
                                    marginTop={2}
                                    mobileIconFontSize={11}
                                    iconFontSize={13}
                                />
                            </TooltipContainer>
                            <span>{formatCurrencyWithKey(THALES_CURRENCY, escrowedBalance + thalesStaked)}</span>
                        </SectionTitle>
                        {notEligibleForStakingRewards && (
                            <WarningMessage>{t('staking.staking.staking-data.not-eligible-message')}</WarningMessage>
                        )}
                        <div>
                            <InfoDiv>
                                <span>
                                    <TooltipContainer>
                                        {t('staking.staking.my-balance.staked-directly')}
                                        <Tooltip
                                            overlay={t('staking.staking.staking-data.staked-balance-tooltip')}
                                            marginBottom={2}
                                            mobileIconFontSize={11}
                                            iconFontSize={11}
                                        />
                                    </TooltipContainer>
                                </span>
                                <span>{formatCurrencyWithKey(THALES_CURRENCY, thalesStaked)}</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>
                                    <TooltipContainer>
                                        {t('staking.staking.my-balance.escrowed-balance')}:
                                        <Tooltip
                                            overlay={t('staking.staking.staking-data.escrowed-balance-tooltip')}
                                            marginBottom={2}
                                            mobileIconFontSize={11}
                                            iconFontSize={11}
                                        />
                                    </TooltipContainer>
                                </span>
                                <span>{formatCurrencyWithKey(THALES_CURRENCY, escrowedBalance)}</span>
                            </InfoDiv>
                        </div>
                    </LoadingContainer>
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
                        disabled={stakingData?.closingPeriodInProgress}
                        active={!stakeSelected}
                        handleClick={() => setStakeSelected(!stakeSelected)}
                    />
                    {stakeSelected ? <Stake /> : <Unstake />}
                    <Collapse
                        title={t('staking.staking.stake-unstake.about-title')}
                        additionalStyling={{
                            titleFontSize: '13px',
                            titleMarginBottom: '5px',
                            titleMarginTop: '20px',
                            downwardsArrowAlignRight: true,
                        }}
                    >
                        <AboutToken>
                            <FlexDivColumn gap="10px">
                                <div>{t('staking.staking.stake-unstake.about-1')}</div>
                                <div>{t('staking.staking.stake-unstake.about-2')}</div>
                                <div>{t('staking.staking.stake-unstake.about-3')}</div>
                                <div>{t('staking.staking.stake-unstake.about-4')}</div>
                            </FlexDivColumn>
                        </AboutToken>
                    </Collapse>
                </Bottom>
            </Container>
            <YourTransactions />
        </>
    );
};

export default StakingTab;
