import { useConnectModal } from '@rainbow-me/rainbowkit';
import Collapse from 'components/Collapse';
import TimeRemaining from 'components/TimeRemaining';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import { THALES_CURRENCY } from 'constants/currency';
import { ethers } from 'ethers';
import usePointsBreakdownQuery, { PointsData } from 'queries/token/usePointsBreakdownQuery';
import useStakersDataLeaderboardQuery from 'queries/token/useStakersDataLeaderboardQuery';
import useThalesStakingDataQuery from 'queries/token/useThalesStakingDataQuery';
import useUserBaseRewardsQuery from 'queries/token/useUserBaseRewards';
import useUserStakingDataQuery from 'queries/token/useUserStakingData';
import React, { useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled, { useTheme } from 'styled-components';
import { FlexDiv, FlexDivColumn } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { BaseRewardsData, ThalesStakingData, UserStakingData } from 'types/token';
import { getDefaultCollateral } from 'utils/currency';
import { refetchTokenQueries } from 'utils/queryConnector';
import snxJSConnector from 'utils/snxJSConnector';
import { InfoDiv, SectionTitle, StakingButton } from '../styled-components';
import {
    ClaimSection,
    ClaimableRewardsContainer,
    Container,
    FinalPoints,
    FinalPointsTitle,
    ItemsWrapper,
    RewardsDetailsContainer,
    RewardsInfo,
    SectionText,
    StakingDetailsSection,
    SubTitle,
} from './styled-components';

const Rewards: React.FC = () => {
    const { t } = useTranslation();

    const theme = useTheme();

    const { openConnectModal } = useConnectModal();

    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));

    const [isClaiming, setIsClaiming] = useState(false);
    const [stakingThalesPeriod, setStakingThalesPeriod] = useState(0);
    const [lastValidPointsData, setLastValidPointsData] = useState<PointsData | undefined>(undefined);
    const [lastValidStakingData, setLastValidStakingData] = useState<ThalesStakingData | undefined>(undefined);
    const [lastValidBaseRewardsData, setLastValidBaseRewardsData] = useState<BaseRewardsData | undefined>(undefined);
    const [lastValidUserStakingData, setLastValidUserStakingData] = useState<UserStakingData | undefined>(undefined);

    const userStakingDataQuery = useUserStakingDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    const { stakingThalesContract } = snxJSConnector as any;

    const baseRewardsQuery = useUserBaseRewardsQuery(walletAddress, networkId, { enabled: isAppReady });

    useEffect(() => {
        if (baseRewardsQuery.isSuccess && baseRewardsQuery.data) {
            setLastValidBaseRewardsData(baseRewardsQuery.data);
        }
    }, [baseRewardsQuery.isSuccess, baseRewardsQuery.data]);

    const baseRewardsData: BaseRewardsData | undefined = useMemo(() => {
        if (baseRewardsQuery.isSuccess && baseRewardsQuery.data) {
            return baseRewardsQuery.data;
        }
        return lastValidBaseRewardsData;
    }, [baseRewardsQuery.data, baseRewardsQuery.isSuccess, lastValidBaseRewardsData]);

    const pointsBreakdownQuery = usePointsBreakdownQuery(walletAddress, networkId, { enabled: isAppReady });

    useEffect(() => {
        if (pointsBreakdownQuery.isSuccess && pointsBreakdownQuery.data) {
            setLastValidPointsData(pointsBreakdownQuery.data);
        }
    }, [pointsBreakdownQuery.isSuccess, pointsBreakdownQuery.data]);

    const pointsData: PointsData | undefined = useMemo(() => {
        if (pointsBreakdownQuery.data && pointsBreakdownQuery.isSuccess) {
            return pointsBreakdownQuery.data;
        }
        return lastValidPointsData;
    }, [pointsBreakdownQuery.data, pointsBreakdownQuery.isSuccess, lastValidPointsData]);

    useEffect(() => {
        stakingThalesContract?.periodsOfStaking().then((period: number) => {
            setStakingThalesPeriod(period);
        });
    }, [stakingThalesContract]);

    const leaderboardQuery = useStakersDataLeaderboardQuery(walletAddress, networkId, stakingThalesPeriod, true, {
        enabled: stakingThalesPeriod > 0,
    });

    const userData = useMemo(() => {
        if (leaderboardQuery.isSuccess && leaderboardQuery.data) {
            const user = leaderboardQuery.data.leaderboard.filter(
                (user) => user.id.toLowerCase() === walletAddress.toLowerCase()
            );
            const length = leaderboardQuery.data.leaderboard.length;
            if (user.length > 0) {
                return {
                    rank: user[0].rank,
                    users: length,
                    share: user[0].share,
                    points: user[0].userRoundBonusPoints,
                    globalPoints: leaderboardQuery.data.data.globalPoints,
                    bonusRewards: leaderboardQuery.data.bonusRewards,
                };
            }
        }
        return undefined;
    }, [leaderboardQuery.isSuccess, leaderboardQuery.data, walletAddress]);

    const userStakingData: UserStakingData | undefined = useMemo(() => {
        if (userStakingDataQuery.isSuccess && userStakingDataQuery.data) {
            return userStakingDataQuery.data;
        }
        return lastValidUserStakingData;
    }, [userStakingDataQuery.isSuccess, userStakingDataQuery.data, lastValidUserStakingData]);

    console.log('userStakingData ', userStakingData);

    useEffect(() => {
        if (userStakingDataQuery.isSuccess && userStakingDataQuery.data) {
            setLastValidUserStakingData(userStakingDataQuery.data);
        }
    }, [userStakingDataQuery.isSuccess, userStakingDataQuery.data]);

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

    const isClaimed = stakingData && userStakingData && !stakingData.isPaused && userStakingData.claimed;
    const isPaused = stakingData && stakingData.isPaused;

    const isClaimAvailable =
        stakingData &&
        userStakingData &&
        userStakingData.hasClaimRights &&
        !userStakingData.claimed &&
        !stakingData.isPaused &&
        isWalletConnected &&
        stakingThalesContract &&
        !isClaiming;

    const handleClaimStakingRewards = async () => {
        if (isClaimAvailable) {
            const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
            try {
                setIsClaiming(true);
                const stakingThalesContractWithSigner = stakingThalesContract.connect((snxJSConnector as any).signer);
                const tx = (await stakingThalesContractWithSigner.claimReward()) as ethers.ContractTransaction;
                const txResult = await tx.wait();

                if (txResult && txResult.transactionHash) {
                    toast.update(id, getSuccessToastOptions(t('staking.rewards.claim.claim-success'), id));
                    refetchTokenQueries(walletAddress, networkId);
                    setIsClaiming(false);
                }
            } catch (e) {
                console.log(e);
                toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
                setIsClaiming(false);
            }
        }
    };

    const getClaimButton = () => {
        if (!isWalletConnected) {
            return <StakingButton onClick={openConnectModal}>{t('common.wallet.connect-your-wallet')}</StakingButton>;
        }

        if (isPaused || isClaimed) {
            return <StakingButton disabled={true}>{t('staking.rewards.claim.claim-rewards')}</StakingButton>;
        }

        return (
            <StakingButton disabled={!isClaimAvailable} onClick={handleClaimStakingRewards}>
                {isClaiming ? t('staking.rewards.claim.claiming') : t('staking.rewards.claim.claim-rewards')}
            </StakingButton>
        );
    };

    return (
        <Container>
            <ClaimableRewardsContainer>
                <RewardsDetailsContainer>
                    <SectionTitle>
                        <span>
                            <i className="icon icon--download" />
                            {t('staking.rewards.claim.title')}
                        </span>
                    </SectionTitle>
                    <ItemsWrapper>
                        <StakingDetailsSection>
                            <Trans
                                i18nKey="staking.rewards.claim.time-left"
                                components={{
                                    span: <span />,
                                }}
                            />
                            <HighlightedValue>
                                {stakingData ? (
                                    <TimeRemaining
                                        end={stakingData?.closingDate}
                                        textColor={theme.textColor.secondary}
                                        fontSize={13}
                                        showFullCounter
                                    />
                                ) : (
                                    '--:--'
                                )}
                            </HighlightedValue>
                        </StakingDetailsSection>
                        <StakingDetailsSection>
                            <Trans
                                i18nKey="staking.rewards.claim.protocol-rewards"
                                components={{
                                    span: <span />,
                                }}
                            />
                            <span>
                                {formatCurrencyWithKey(
                                    getDefaultCollateral(networkId),
                                    lastValidUserStakingData ? lastValidUserStakingData.feeRewards : 0
                                )}
                            </span>
                        </StakingDetailsSection>
                        <StakingDetailsSection>
                            <Trans
                                i18nKey="staking.rewards.claim.base-rewards"
                                components={{
                                    span: <span />,
                                }}
                            />
                            <span>
                                {formatCurrencyWithKey(THALES_CURRENCY, lastValidUserStakingData?.baseRewards ?? 0, 2)}
                            </span>
                        </StakingDetailsSection>
                        <StakingDetailsSection>
                            <Trans
                                i18nKey="staking.rewards.claim.gamified-staking-rewards"
                                components={{
                                    span: <span />,
                                }}
                            />
                            <span>
                                {formatCurrencyWithKey(THALES_CURRENCY, lastValidUserStakingData?.totalBonus ?? 0, 2)}
                            </span>
                        </StakingDetailsSection>
                    </ItemsWrapper>
                    <Notice>{t('staking.rewards.claim.disclaimer')}</Notice>
                </RewardsDetailsContainer>
                <ClaimSection>
                    <RewardsInfo>
                        <span>
                            {formatCurrencyWithKey(
                                THALES_CURRENCY,
                                lastValidUserStakingData ? lastValidUserStakingData.rewards : 0,
                                2
                            )}
                        </span>
                        <span>
                            {formatCurrencyWithKey(
                                getDefaultCollateral(networkId),
                                lastValidUserStakingData ? lastValidUserStakingData.feeRewards : 0
                            )}
                        </span>
                    </RewardsInfo>
                    <div>{getClaimButton()}</div>
                </ClaimSection>
            </ClaimableRewardsContainer>
            <div>
                <SectionTitle>
                    <span>
                        <i className="icon icon--pig" />
                        {t('staking.rewards.base-rewards.title')}
                    </span>
                    <span>{formatCurrencyWithKey(THALES_CURRENCY, lastValidUserStakingData?.baseRewards ?? 0, 2)}</span>
                </SectionTitle>
                <SubTitle>
                    <span>{t('staking.rewards.base-rewards.current-multiplier')}</span>
                    <span>x{pointsData?.stakingMultiplier}</span>
                </SubTitle>
                <FlexDiv gap="30px">
                    <FlexDivColumn>
                        <InfoDiv>
                            <span>{t('staking.rewards.base-rewards.your-staked')}</span>
                            <span>{baseRewardsData?.thalesStaked}</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>
                                <Trans
                                    i18nKey="staking.rewards.base-rewards.staking-divider"
                                    components={{
                                        span: <span />,
                                    }}
                                />
                            </span>
                            <span>{lastValidPointsData?.thalesDivider}</span>
                        </InfoDiv>
                    </FlexDivColumn>
                    <FlexDivColumn>
                        <InfoDiv>
                            <span>{t('staking.rewards.base-rewards.total-staked')}</span>
                            <span>{baseRewardsData?.totalStaked}</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.base-rewards.staked-share')}</span>
                            <span>{baseRewardsData?.share}</span>
                        </InfoDiv>
                    </FlexDivColumn>
                </FlexDiv>
            </div>
            <div>
                <SectionTitle>
                    <span>
                        <i className="icon icon--gift" />
                        {t('staking.rewards.your-rewards.title')}
                    </span>
                    <span>
                        {userData &&
                            formatCurrencyWithKey(THALES_CURRENCY, (userData.share as any) * userData.bonusRewards, 2)}
                    </span>
                </SectionTitle>
                <SubTitle>
                    <span>{t('staking.rewards.your-rewards.current-points')}</span>
                    <span>{pointsData?.totalPoints}</span>
                </SubTitle>
                <FlexDiv gap="30px">
                    <FlexDivColumn>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.trading-volume')}</span>
                            <span>{pointsData?.tradingVolume}</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.amm-lp-balances')}</span>
                            <span>{pointsData?.lpVolume}</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.vaults-balances')}</span>
                            <span>{pointsData?.vaultsVolume}</span>
                        </InfoDiv>
                    </FlexDivColumn>
                    <FlexDivColumn>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.trading-multiplier')}</span>
                            <span>X {pointsData?.tradingMultiplier}</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.lp-multiplier')}</span>
                            <span>X {pointsData?.lpMultiplier}</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.vaults-multiplier')}</span>
                            <span>X {pointsData?.vaultsMultiplier}</span>
                        </InfoDiv>
                    </FlexDivColumn>
                    <FlexDivColumn>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.points')}</span>
                            <span>{pointsData?.tradingPoints}</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.points')}</span>
                            <span>{pointsData?.lpPoints}</span>
                        </InfoDiv>
                        <InfoDiv>
                            <span>{t('staking.rewards.your-rewards.points')}</span>
                            <span>{pointsData?.vaultsPoints}</span>
                        </InfoDiv>
                    </FlexDivColumn>
                </FlexDiv>
            </div>
            <div>
                <SectionTitle>
                    <span>
                        <i className="icon icon--house" />
                        {t('staking.rewards.how-it-works.title')}
                    </span>
                </SectionTitle>
                <Collapse
                    title={t('staking.rewards.how-it-works.each-week')}
                    additionalStyling={{ titleFontSize: '13px', titleMarginBottom: '5px', titleMarginTop: '20px' }}
                >
                    <SectionText>
                        <Trans
                            i18nKey="staking.rewards.how-it-works.each-week-description"
                            components={{
                                span: <span />,
                            }}
                        />
                    </SectionText>
                </Collapse>
                <Collapse
                    title={t('staking.rewards.how-it-works.how-points-are-earned-title')}
                    additionalStyling={{ titleFontSize: '13px', titleMarginBottom: '5px', titleMarginTop: '20px' }}
                >
                    <FinalPointsTitle>{t('staking.rewards.how-it-works.final-points')}</FinalPointsTitle>
                    {isWalletConnected && (
                        <FinalPoints>
                            {pointsData?.totalPoints} = ({pointsData?.tradingPoints} + {pointsData?.lpPoints} +{' '}
                            {pointsData?.vaultsPoints}) x {pointsData?.stakingMultiplier}
                        </FinalPoints>
                    )}
                </Collapse>
            </div>
        </Container>
    );
};

const HighlightedValue = styled.span`
    font-size: 13px;
    font-weight: 700;
    color: ${(props) => props.theme.textColor.secondary};
`;

const Notice = styled.span`
    margin-top: 25px;
    color: ${(props) => props.theme.error.textColor.secondary};
`;

export default Rewards;
