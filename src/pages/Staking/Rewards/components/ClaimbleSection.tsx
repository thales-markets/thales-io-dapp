import { useConnectModal } from '@rainbow-me/rainbowkit';
import coinsAnimation from 'assets/lotties/rewards-coins.json';
import LoadingContainer from 'components/LoadingContainer';
import TimeRemaining from 'components/TimeRemaining';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import Tooltip from 'components/Tooltip';
import Checkbox from 'components/fields/Checkbox';
import { DEFAULT_COLLATERALS, THALES_CURRENCY } from 'constants/currency';
import { ethers } from 'ethers';
import Lottie from 'lottie-react';
import { StakingButton, TooltipContainer } from 'pages/Staking/styled-components';
import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled, { useTheme } from 'styled-components';
import { FlexDiv, FlexDivCentered, FlexDivColumn } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { ThalesStakingData, UserStakingData } from 'types/token';
import networkConnector from 'utils/networkConnector';
import { refetchTokenQueries } from 'utils/queryConnector';
import { SectionTitle } from '../../styled-components';
import {
    ClaimSection,
    ClaimableRewardsContainer,
    CompoundContainer,
    ItemsWrapper,
    RewardsDetailsContainer,
    RewardsInfo,
    StakingDetailsSection,
} from '../styled-components';
import CompoundModal from './CompoundModal';

type ClaimableSectionProps = {
    userStakingData: UserStakingData | undefined;
    stakingData: ThalesStakingData | undefined;
    isLoading: boolean;
};

const ClaimableSection: React.FC<ClaimableSectionProps> = ({ userStakingData, stakingData, isLoading }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    const { openConnectModal } = useConnectModal();

    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));

    const { stakingThalesContract } = networkConnector as any;

    const [isClaiming, setIsClaiming] = useState(false);
    const [compoundRewards, setCompoundRewards] = useState<boolean>(false);
    const [compoundModalOpen, setCompoundModalOpen] = useState<boolean>(false);

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
                const stakingThalesContractWithSigner = stakingThalesContract.connect((networkConnector as any).signer);
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

        if (compoundRewards) {
            return (
                <StakingButton onClick={() => setCompoundModalOpen(true)}>
                    {t('staking.rewards.claim.claim-and-stake')}
                </StakingButton>
            );
        }

        return (
            <StakingButton disabled={!isClaimAvailable} onClick={handleClaimStakingRewards}>
                {isClaiming ? t('staking.rewards.claim.claiming') : t('staking.rewards.claim.claim-rewards')}
            </StakingButton>
        );
    };

    return (
        <>
            <LoadingContainer isLoading={isLoading}>
                <button onClick={() => setCompoundModalOpen(true)}>aaa</button>
                <ClaimableRewardsContainer>
                    <RewardsDetailsContainer>
                        <SectionTitle>
                            <span>
                                <i className="icon icon--download" />
                                {t('staking.rewards.claim.title')}
                            </span>
                        </SectionTitle>

                        {!isClaimed && !stakingData?.closingPeriodInProgress && (
                            <>
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
                                        <TooltipContainer>
                                            <Trans
                                                i18nKey="staking.rewards.claim.protocol-rewards"
                                                components={{
                                                    span: <span />,
                                                }}
                                            />
                                            <Tooltip
                                                overlay={t('staking.rewards.claim.protocol-rewards-tooltip')}
                                                marginTop={2}
                                                mobileIconFontSize={11}
                                                iconFontSize={13}
                                            />
                                        </TooltipContainer>
                                        <span>
                                            {formatCurrencyWithKey(
                                                DEFAULT_COLLATERALS[networkId],
                                                userStakingData ? userStakingData.feeRewards : 0
                                            )}
                                        </span>
                                    </StakingDetailsSection>
                                    <StakingDetailsSection>
                                        <TooltipContainer>
                                            <Trans
                                                i18nKey="staking.rewards.claim.base-rewards"
                                                components={{
                                                    span: <span />,
                                                }}
                                            />
                                            <Tooltip
                                                overlay={t('staking.rewards.claim.base-reward-tooltip')}
                                                marginTop={2}
                                                mobileIconFontSize={11}
                                                iconFontSize={13}
                                            />
                                        </TooltipContainer>
                                        <span>
                                            {formatCurrencyWithKey(
                                                THALES_CURRENCY,
                                                userStakingData?.baseRewards ?? 0,
                                                2
                                            )}
                                        </span>
                                    </StakingDetailsSection>
                                    <StakingDetailsSection>
                                        <TooltipContainer>
                                            <Trans
                                                i18nKey="staking.rewards.claim.gamified-staking-rewards"
                                                components={{
                                                    span: <span />,
                                                }}
                                            />
                                            <Tooltip
                                                overlay={t('staking.rewards.claim.gamified-staking-rewards-tooltip')}
                                                marginTop={2}
                                                mobileIconFontSize={11}
                                                iconFontSize={13}
                                            />
                                        </TooltipContainer>

                                        <span>
                                            {formatCurrencyWithKey(
                                                THALES_CURRENCY,
                                                userStakingData?.totalBonus ?? 0,
                                                2
                                            )}
                                        </span>
                                    </StakingDetailsSection>
                                </ItemsWrapper>
                                <Notice>{t('staking.rewards.claim.disclaimer')}</Notice>
                            </>
                        )}
                        {isClaimed && (
                            <StakingStateWrapper>
                                <StateLabel>{t('staking.rewards.your-rewards.already-claimed')}</StateLabel>
                                <FlexDiv>
                                    <Trans
                                        i18nKey="staking.rewards.your-rewards.next-claim"
                                        components={{
                                            span: <span />,
                                        }}
                                    />
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
                                </FlexDiv>
                            </StakingStateWrapper>
                        )}
                        {stakingData?.closingPeriodInProgress && (
                            <StakingStateWrapper>
                                <StateLabel closingRoundInProgress={true}>
                                    <Trans
                                        i18nKey="staking.rewards.claim.calculating-rewards"
                                        components={{
                                            br: <br />,
                                        }}
                                    />
                                </StateLabel>
                            </StakingStateWrapper>
                        )}
                    </RewardsDetailsContainer>
                    {!isClaimed && !stakingData?.closingPeriodInProgress && (
                        <ClaimSection>
                            <RewardsInfo>
                                <span>
                                    {formatCurrencyWithKey(
                                        THALES_CURRENCY,
                                        userStakingData ? userStakingData.rewards : 0,
                                        2
                                    )}
                                </span>
                                <span>
                                    {formatCurrencyWithKey(
                                        DEFAULT_COLLATERALS[networkId],
                                        userStakingData ? userStakingData.feeRewards : 0
                                    )}
                                </span>
                            </RewardsInfo>
                            <CompoundContainer>
                                <FlexDivCentered>
                                    <Checkbox
                                        label={
                                            <>
                                                {t('staking.rewards.claim.compound-and-stake')}
                                                <Tooltip
                                                    overlay={
                                                        <Trans
                                                            i18nKey="staking.rewards.claim.compound-tooltip"
                                                            values={{
                                                                collateral: DEFAULT_COLLATERALS[networkId],
                                                            }}
                                                        />
                                                    }
                                                    marginRight={5}
                                                    marginBottom={6}
                                                    mobileIconFontSize={11}
                                                    iconFontSize={13}
                                                />
                                            </>
                                        }
                                        checked={compoundRewards}
                                        value={0}
                                        onChange={() => setCompoundRewards(!compoundRewards)}
                                    />
                                </FlexDivCentered>
                                {getClaimButton()}
                            </CompoundContainer>
                        </ClaimSection>
                    )}
                    {isClaimed && (
                        <IconContainer>
                            <Lottie animationData={coinsAnimation} style={{ height: '150px' }} />
                        </IconContainer>
                    )}
                    <CompoundModal
                        rewards={userStakingData?.feeRewards || 0}
                        setIsOpen={setCompoundModalOpen}
                        isOpen={compoundModalOpen}
                    />
                </ClaimableRewardsContainer>
            </LoadingContainer>
        </>
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

const StakingStateWrapper = styled(FlexDivColumn)`
    justify-content: flex-start;
    align-items: flex-start;
    ${FlexDiv} > span {
        margin-left: 2px;
    }
`;

const StateLabel = styled.span<{ closingRoundInProgress?: boolean }>`
    font-size: 18px;
    font-weight: 600;
    color: ${(props) =>
        props.closingRoundInProgress
            ? props.theme.warning.textColor.quaternary
            : props.theme.warning.textColor.tertiary};
    margin: 30px 0;
`;

const IconContainer = styled(FlexDiv)`
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
`;

export default ClaimableSection;
