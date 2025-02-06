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
import { THALES_CURRENCY } from 'constants/currency';
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
import { FlexDiv, FlexDivColumn } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { ThalesStakingData, UserStakingData } from 'types/token';
import { getDefaultCollateral } from 'utils/currency';
import networkConnector from 'utils/networkConnector';
import { refetchTokenQueries } from 'utils/queryConnector';
import { SectionTitle } from '../../styled-components';
import CompoundModal from '../CompoundModal/CompoundModal';
import {
    ClaimSection,
    ClaimableRewardsContainer,
    CompoundContainer,
    ItemsWrapper,
    RewardsDetailsContainer,
    RewardsInfo,
    StakingDetailsSection,
} from './styled-components';

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
    const [compoundModalOpen, setCompoundModalOpen] = useState<boolean>(false);
    const [isClosingPeriod, setIsClosingPeriod] = useState(false);

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

    const canClosePeriod = stakingData && stakingData.canClosePeriod;
    const isClosingPeriodAvailable = isWalletConnected && !!stakingThalesContract && !isClaiming && !isClosingPeriod;

    const handleClosePeriod = async () => {
        if (canClosePeriod) {
            const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
            try {
                setIsClosingPeriod(true);
                const stakingThalesContractWithSigner = stakingThalesContract.connect((networkConnector as any).signer);
                const tx = (await stakingThalesContractWithSigner.closePeriod()) as ethers.ContractTransaction;
                const txResult = await tx.wait();

                if (txResult && txResult.transactionHash) {
                    toast.update(
                        id,
                        getSuccessToastOptions(t('staking.rewards.claim.close-period.confirmation-message'), id)
                    );
                    refetchTokenQueries(walletAddress, networkId);
                    setIsClosingPeriod(false);
                }
            } catch (e) {
                console.log(e);
                toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
                setIsClosingPeriod(false);
            }
        }
    };

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

        return (
            <StakingButton disabled={!isClaimAvailable} onClick={handleClaimStakingRewards}>
                {isClaiming ? t('staking.rewards.claim.claiming') : t('staking.rewards.claim.claim-rewards')}
            </StakingButton>
        );
    };

    const getClosePeriodButton = () => {
        if (canClosePeriod) {
            return (
                <StakingButton
                    onClick={handleClosePeriod}
                    disabled={!isClosingPeriodAvailable}
                    style={{
                        alignSelf: 'end',
                        width: isClaimed ? 'auto' : '165px',
                    }}
                >
                    {isClosingPeriod
                        ? t('staking.rewards.claim.close-period.progress-label')
                        : t('staking.rewards.claim.close-period.label')}
                </StakingButton>
            );
        }
    };

    return (
        <>
            <LoadingContainer isLoading={isLoading}>
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
                                                getDefaultCollateral(networkId, true),
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
                                </ItemsWrapper>
                                <Notice>{t('staking.rewards.claim.disclaimer')}</Notice>
                            </>
                        )}
                        {isClaimed && (
                            <StakingStateWrapper>
                                <StateLabel>{t('staking.rewards.your-rewards.already-claimed')}</StateLabel>
                            </StakingStateWrapper>
                        )}
                        {stakingData?.closingPeriodInProgress && (
                            <StakingStateWrapper>
                                <StateLabel>
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
                                        getDefaultCollateral(networkId, true),
                                        userStakingData ? userStakingData.feeRewards : 0
                                    )}
                                </span>
                            </RewardsInfo>
                            <CompoundContainer>
                                {getClaimButton()}
                                {getClosePeriodButton()}
                            </CompoundContainer>
                        </ClaimSection>
                    )}
                    {isClaimed && (
                        <CompoundContainer>
                            <IconContainer>
                                <Lottie
                                    animationData={coinsAnimation}
                                    style={{ height: canClosePeriod ? '100px' : '150px' }}
                                />
                            </IconContainer>
                            {getClosePeriodButton()}
                        </CompoundContainer>
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
    color: ${(props) => props.theme.error.textColor.primary};
`;

const StakingStateWrapper = styled(FlexDivColumn)`
    justify-content: flex-start;
    align-items: flex-start;
    ${FlexDiv} > span {
        margin-left: 2px;
    }
`;

const StateLabel = styled.span`
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.theme.error.textColor.primary};
    margin: 30px 0;
`;

const IconContainer = styled(FlexDiv)`
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
`;

export default ClaimableSection;
