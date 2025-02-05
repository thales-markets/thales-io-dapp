import Collapse from 'components/Collapse';
import LoadingContainer from 'components/LoadingContainer';
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
import { FlexDivColumn } from 'styles/common';
import { formatCurrencyWithKey, formatCurrencyWithPrecision } from 'thales-utils';
import { GlobalStakingData, ThalesStakingData, UserStakingData } from 'types/token';
import { InfoDiv, SectionTitle, TooltipContainer } from '../styled-components';
import ClaimableSection from './ClaimableSection/ClaimbleSection';
import YourTransactions from './Transactions';
import Unstake from './Unstake';
import { AboutToken, Bottom, Container, Top, UpperLeft, UpperRight, WarningMessage } from './styled-components';

const StakingTab: React.FC = () => {
    const { t } = useTranslation();

    const [lastValidStakingData, setLastValidStakingData] = useState<ThalesStakingData | undefined>(undefined);
    const [lastValidUserStakingData, setLastValidUserStakingData] = useState<UserStakingData | undefined>(undefined);
    const [lastValidGlobalStakingData, setLastValidGlobalStakingData] = useState<GlobalStakingData | undefined>(
        undefined
    );

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
                <Top>
                    <ClaimableSection
                        userStakingData={userStakingData}
                        stakingData={stakingData}
                        isLoading={userStakingDataQuery.isLoading || stakingDataQuery.isLoading}
                    />
                </Top>
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
                                    mobileIconFontSize={11}
                                    iconFontSize={11}
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
                    <Unstake />
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
                                <div>
                                    {t('staking.staking.stake-unstake.about-3', {
                                        rewards: formatCurrencyWithKey(
                                            THALES_CURRENCY,
                                            lastValidGlobalStakingData?.baseRewards
                                                ? lastValidGlobalStakingData?.baseRewards
                                                : 0
                                        ),
                                    })}
                                </div>
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
