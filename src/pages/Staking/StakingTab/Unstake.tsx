import { useConnectModal } from '@rainbow-me/rainbowkit';
import TimeRemaining from 'components/TimeRemaining';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import Tooltip from 'components/Tooltip/Tooltip';
import NumericInput from 'components/fields/NumericInput';
import { PLAUSIBLE, PLAUSIBLE_KEYS } from 'constants/analytics';
import { THALES_CURRENCY } from 'constants/currency';
import intervalToDuration from 'date-fns/intervalToDuration';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { ethers } from 'ethers';
import useUserStakingDataQuery from 'queries/token/useUserStakingData';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getIsAppReady } from 'redux/modules/app';
import { getIsMobile } from 'redux/modules/ui';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDivCentered, FlexDivColumnCentered } from 'styles/common';
import { formatCurrencyWithKey, truncToDecimals } from 'thales-utils';
import { UserStakingData } from 'types/token';
import { formattedDuration } from 'utils/formatters/date';
import networkConnector from 'utils/networkConnector';
import { refetchTokenQueries } from 'utils/queryConnector';
import { SectionTitle, StakingButton } from '../styled-components';
import { ClaimMessage, EarnSection, InputContainer, SectionContentContainer } from './styled-components';

const DEFAULT_UNSTAKE_PERIOD = 7 * 24 * 60 * 60;

const addDurationPeriod = (date: Date, unstakeDurationPeriod: number) => {
    return new Date(date.getTime() + unstakeDurationPeriod);
};

const Unstake: React.FC = () => {
    const { t } = useTranslation();
    const { openConnectModal } = useConnectModal();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const isMobile = useSelector((state: RootState) => getIsMobile(state));

    const [isUnstaking, setIsUnstaking] = useState<boolean>(false);
    const [isCanceling, setIsCanceling] = useState<boolean>(false);
    const [isUnstakingInContract, setIsUnstakingInContract] = useState<boolean>(false);
    const [unstakeDurationPeriod, setUnstakeDurationPeriod] = useState<number>(DEFAULT_UNSTAKE_PERIOD);
    const [unstakeEndTime, setUnstakeEndTime] = useState<Date>(addDurationPeriod(new Date(), unstakeDurationPeriod));
    const [unstakingEnded, setUnstakingEnded] = useState<boolean>(false);
    const [amountToUnstake, setAmountToUnstake] = useState<number | string>('');
    const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
    const { stakingThalesContract } = networkConnector as any;
    const [lastValidUserStakingData, setLastValidUserStakingData] = useState<UserStakingData | undefined>(undefined);

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

    const thalesStaked = userStakingData ? userStakingData.thalesStaked : 0;
    const unstakingAmount = userStakingData ? userStakingData.unstakingAmount : 0;
    const isStakingPaused = userStakingData && userStakingData.isPaused;

    const isAmountEntered = Number(amountToUnstake) > 0;
    const insufficientBalance = Number(amountToUnstake) > thalesStaked || !thalesStaked;

    const isStartUnstakeButtonDisabled =
        isUnstaking ||
        isCanceling ||
        !stakingThalesContract ||
        isUnstakingInContract ||
        !isAmountEntered ||
        insufficientBalance ||
        !isWalletConnected ||
        isStakingPaused;

    const isCancelUnstakeButtonDisabled = isUnstaking || isCanceling || !stakingThalesContract || !isWalletConnected;
    const isUnstakeButtonDisabled = isUnstaking || isCanceling || !stakingThalesContract || !isWalletConnected;

    useEffect(() => {
        if (userStakingDataQuery.isSuccess && userStakingDataQuery.data) {
            const { isUnstaking, lastUnstakeTime, unstakeDurationPeriod } = userStakingDataQuery.data;
            setIsUnstakingInContract(isUnstaking);
            setUnstakeDurationPeriod(unstakeDurationPeriod);
            if (isUnstaking) {
                setUnstakeEndTime(addDurationPeriod(new Date(lastUnstakeTime), unstakeDurationPeriod));
            }
        }
    }, [userStakingDataQuery.isSuccess, userStakingDataQuery.data]);

    const handleStartUnstakingThales = async () => {
        const { stakingThalesContract } = networkConnector as any;
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        try {
            setIsUnstaking(true);
            const stakingThalesContractWithSigner = stakingThalesContract.connect((networkConnector as any).signer);
            const amount = ethers.utils.parseEther(amountToUnstake.toString());
            const tx = await stakingThalesContractWithSigner.startUnstake(amount);
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                toast.update(
                    id,
                    getSuccessToastOptions(t('staking.staking.stake-unstake.cooldown-confirmation-message'), id)
                );
                refetchTokenQueries(walletAddress, networkId);
                setAmountToUnstake('');
                setIsUnstakingInContract(true);
                PLAUSIBLE.trackEvent(PLAUSIBLE_KEYS.unstake);
                setUnstakeEndTime(addDurationPeriod(new Date(), unstakeDurationPeriod));
                setUnstakingEnded(false);
                setIsUnstaking(false);
            }
        } catch (e) {
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsUnstaking(false);
        }
    };

    const handleUnstakeThales = async () => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        const { stakingThalesContract } = networkConnector as any;
        try {
            setIsUnstaking(true);
            const stakingThalesContractWithSigner = stakingThalesContract.connect((networkConnector as any).signer);
            const tx = await stakingThalesContractWithSigner.unstake();
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                toast.update(
                    id,
                    getSuccessToastOptions(t('staking.staking.stake-unstake.unstake-confirmation-message'), id)
                );
                refetchTokenQueries(walletAddress, networkId);
                setIsUnstakingInContract(false);
                setUnstakingEnded(true);
                setIsUnstaking(false);
            }
        } catch (e) {
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsUnstaking(false);
        }
    };

    const handleCancelUnstakingThales = async () => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        const { stakingThalesContract } = networkConnector as any;
        try {
            setIsCanceling(true);
            const stakingThalesContractWithSigner = stakingThalesContract.connect((networkConnector as any).signer);
            const tx = await stakingThalesContractWithSigner.cancelUnstake();
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                refetchTokenQueries(walletAddress, networkId);
                setIsUnstakingInContract(false);
                setUnstakingEnded(true);
                setIsCanceling(false);
            }
        } catch (e) {
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsCanceling(false);
        }
    };

    const getSubmitButton = () => {
        if (!isWalletConnected) {
            return <StakingButton onClick={openConnectModal}>{t('common.wallet.connect-your-wallet')}</StakingButton>;
        }
        if (isUnstakingInContract) {
            return (
                <>
                    {unstakingEnded && (
                        <StakingButton disabled={isUnstakeButtonDisabled} onClick={handleUnstakeThales}>
                            {!isUnstaking
                                ? `${t('staking.staking.stake-unstake.unstake')} ${formatCurrencyWithKey(
                                      THALES_CURRENCY,
                                      unstakingAmount
                                  )}`
                                : `${t('staking.staking.stake-unstake.unstaking')} ${formatCurrencyWithKey(
                                      THALES_CURRENCY,
                                      unstakingAmount
                                  )}...`}
                        </StakingButton>
                    )}
                    <StakingButton disabled={isCancelUnstakeButtonDisabled} onClick={handleCancelUnstakingThales}>
                        {!isCanceling
                            ? `${t('staking.staking.stake-unstake.cancel')} ${formatCurrencyWithKey(
                                  THALES_CURRENCY,
                                  unstakingAmount
                              )}`
                            : `${t('staking.staking.stake-unstake.canceling')} ${formatCurrencyWithKey(
                                  THALES_CURRENCY,
                                  unstakingAmount
                              )}...`}
                    </StakingButton>
                </>
            );
        }
        if (insufficientBalance) {
            return <StakingButton disabled={true}>{t(`common.errors.insufficient-staking-balance`)}</StakingButton>;
        }
        if (!isAmountEntered) {
            return <StakingButton disabled={true}>{t(`common.errors.enter-amount`)}</StakingButton>;
        }

        return (
            <Tooltip overlay={t('staking.staking.stake-unstake.start-unstaking-tooltip')}>
                <ButtonWrapperTooltip>
                    <StakingButton disabled={isStartUnstakeButtonDisabled} onClick={handleStartUnstakingThales}>
                        {!isUnstaking
                            ? `${t('staking.staking.stake-unstake.start-unstaking')} ${formatCurrencyWithKey(
                                  THALES_CURRENCY,
                                  amountToUnstake
                              )}`
                            : `${t('staking.staking.stake-unstake.unstaking')} ${formatCurrencyWithKey(
                                  THALES_CURRENCY,
                                  amountToUnstake
                              )}...`}
                    </StakingButton>
                </ButtonWrapperTooltip>
            </Tooltip>
        );
    };

    const dateTimeTranslationMap = {
        years: t('common.time-remaining.years'),
        year: t('common.time-remaining.year'),
        months: t('common.time-remaining.months'),
        month: t('common.time-remaining.month'),
        weeks: t('common.time-remaining.weeks'),
        week: t('common.time-remaining.week'),
        days: t('common.time-remaining.days'),
        day: t('common.time-remaining.day'),
        hours: t('common.time-remaining.hours'),
        hour: t('common.time-remaining.hour'),
        minutes: t('common.time-remaining.minutes'),
        minute: t('common.time-remaining.minute'),
        seconds: t('common.time-remaining.seconds'),
        second: t('common.time-remaining.second'),
        'days-short': t('common.time-remaining.days-short'),
        'hours-short': t('common.time-remaining.hours-short'),
        'minutes-short': t('common.time-remaining.minutes-short'),
        'seconds-short': t('common.time-remaining.seconds-short'),
    };

    const unstakeIntervalToDuration = intervalToDuration({
        start: Date.now(),
        end: Date.now() + unstakeDurationPeriod,
    });
    const unstakeDuration = formattedDuration(unstakeIntervalToDuration, dateTimeTranslationMap, false);

    const onMaxClick = () => {
        setAmountToUnstake(truncToDecimals(thalesStaked, 8));
    };

    useEffect(() => {
        setIsAmountValid(
            Number(amountToUnstake) === 0 || (Number(amountToUnstake) > 0 && Number(amountToUnstake) <= thalesStaked)
        );
    }, [amountToUnstake, thalesStaked]);

    return (
        <EarnSection spanOnTablet={0} orderOnMobile={0} orderOnTablet={0}>
            <SectionContentContainer>
                <UnstakingContainer twoButtons={isUnstakingInContract && unstakingEnded}>
                    <SectionTitle>{t('staking.staking.stake-unstake.unstake')}</SectionTitle>
                    {((!unstakingEnded && isUnstakingInContract) || !isUnstakingInContract) && (
                        <UnstakingPeriodWrapper>
                            <UnstakingPeriodContainer>
                                <CooldownText>
                                    {isUnstakingInContract
                                        ? unstakingEnded
                                            ? t('staking.staking.stake-unstake.cooldown-ended-text', {
                                                  amount: formatCurrencyWithKey(
                                                      THALES_CURRENCY,
                                                      unstakingAmount,
                                                      0,
                                                      true
                                                  ),
                                              })
                                            : t('staking.staking.stake-unstake.cooldown-started-text', {
                                                  amount: formatCurrencyWithKey(
                                                      THALES_CURRENCY,
                                                      unstakingAmount,
                                                      0,
                                                      true
                                                  ),
                                              })
                                        : t('staking.staking.stake-unstake.cooldown-label')}
                                    :
                                </CooldownText>
                                <CooldownCounter>
                                    {!isUnstakingInContract ? (
                                        unstakeDuration
                                    ) : (
                                        <TimeRemaining
                                            onEnded={() => setUnstakingEnded(true)}
                                            end={unstakeEndTime}
                                            fontSize={isMobile ? 12 : 16}
                                        />
                                    )}
                                </CooldownCounter>
                            </UnstakingPeriodContainer>
                        </UnstakingPeriodWrapper>
                    )}
                    <UnstakingTitleText>
                        {isUnstakingInContract
                            ? unstakingEnded
                                ? ''
                                : ''
                            : t('staking.staking.stake-unstake.unlock-cooldown-text')}
                    </UnstakingTitleText>
                </UnstakingContainer>
                <InputContainer>
                    <NumericInput
                        value={amountToUnstake}
                        onChange={(_, value) => setAmountToUnstake(value)}
                        disabled={isUnstakingInContract || isUnstaking || isCanceling || isStakingPaused}
                        placeholder={t('common.enter-amount')}
                        label={isMobile ? undefined : t('staking.staking.stake-unstake.amount-to-unstake')}
                        onMaxButton={onMaxClick}
                        maxButtonDisabled={!thalesStaked}
                        showValidation={!isAmountValid}
                        validationMessage={t(`common.errors.insufficient-balance-wallet`, {
                            currencyKey: THALES_CURRENCY,
                        })}
                        balance={
                            isWalletConnected
                                ? `${t('common.balance')}: ${formatCurrencyWithKey(THALES_CURRENCY, thalesStaked)}`
                                : undefined
                        }
                        isBalanceLoading={userStakingDataQuery.isLoading}
                        width="100%"
                        containerWidth={isMobile ? '100%' : '70%'}
                    />
                </InputContainer>
                <ButtonsContainer twoButtons={isUnstakingInContract && unstakingEnded}>
                    {getSubmitButton()}
                    {isStakingPaused && (
                        <ClaimMessage>{t('staking.staking.stake-unstake.paused-message')}</ClaimMessage>
                    )}
                </ButtonsContainer>
            </SectionContentContainer>
        </EarnSection>
    );
};

const UnstakingContainer = styled(FlexDivColumnCentered)<{ twoButtons: boolean }>`
    align-items: center;
    min-height: ${(props) => (props.twoButtons ? '30px' : '66px')};
    width: 70%;
    margin: 0 auto 15px auto;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
        margin: 20px auto 50px auto;
    }
`;

const UnstakingPeriodWrapper = styled.div`
    border: none;
    padding: 1px;
    margin-bottom: 3px;
    @media (max-width: 1192px) {
        min-width: 110px;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        min-width: 110px;
    }
`;

const UnstakingPeriodContainer = styled.div`
    border-radius: 10px;
    padding: 10px 0;
    text-align: center;
`;

const CooldownText = styled.div`
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: ${(props) => props.theme.textColor.primary};
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 14px;
    }
`;

const CooldownCounter = styled.div`
    margin-left: 10px;
    font-weight: bold;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: ${(props) => props.theme.textColor.secondary};
`;

const UnstakingTitleText = styled.span`
    font-weight: normal;
    font-size: 14px;
    line-height: 15px;
    margin-right: 10px;
    margin-bottom: 10px;
    @media (max-width: 1192px) {
        font-size: 12px;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 12px;
        margin-right: 0px;
    }
`;

const ButtonsContainer = styled(FlexDivColumnCentered)<{ twoButtons: boolean }>`
    align-items: center;
    > * {
        &:nth-child(2) {
            margin-top: 15px;
        }
    }
    @media (max-width: 1024px) {
        padding-top: 15px;
        padding-bottom: 5px;
    }
`;

const ButtonWrapperTooltip = styled(FlexDivCentered)`
    width: 100%;
`;

export default Unstake;
