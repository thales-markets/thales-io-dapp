import { useConnectModal } from '@rainbow-me/rainbowkit';
import ApprovalModal from 'components/ApprovalModal';
import NumericInput from 'components/fields/NumericInput';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import { THALES_CURRENCY } from 'constants/currency';
import { BigNumber, ethers } from 'ethers';
import useThalesBalanceQuery from 'queries/token/useThalesBalanceQuery';
import useUserStakingDataQuery from 'queries/token/useUserStakingData';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getIsAppReady } from 'redux/modules/app';
// import { getIsMobile } from 'redux/modules/ui';
import { PLAUSIBLE, PLAUSIBLE_KEYS } from 'constants/analytics';
import useThalesStakingDataQuery from 'queries/token/useThalesStakingDataQuery';
import { getIsMobile } from 'redux/modules/ui';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { FlexDivCentered } from 'styles/common';
import { formatCurrencyWithKey, truncToDecimals } from 'thales-utils';
import { ThalesStakingData, UserStakingData } from 'types/token';
import { checkAllowance } from 'utils/network';
import networkConnector from 'utils/networkConnector';
import { refetchTokenQueries } from 'utils/queryConnector';
import { StakingButton } from '../styled-components';
import { ClaimMessage, SectionContentContainer, StakeButtonDiv, StakeInputContainer } from './styled-components';

const Stake: React.FC = () => {
    const { t } = useTranslation();
    const { openConnectModal } = useConnectModal();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const isMobile = useSelector((state: RootState) => getIsMobile(state));

    const [amountToStake, setAmountToStake] = useState<number | string>('');
    const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
    const [isAllowingStake, setIsAllowingStake] = useState<boolean>(false);
    const [isStaking, setIsStaking] = useState<boolean>(false);
    const [hasStakeAllowance, setStakeAllowance] = useState<boolean>(false);
    const [openApprovalModal, setOpenApprovalModal] = useState<boolean>(false);
    const { stakingThalesContract } = networkConnector as any;
    const [lastValidUserStakingData, setLastValidUserStakingData] = useState<UserStakingData | undefined>(undefined);
    const [lastValidStakingData, setLastValidStakingData] = useState<ThalesStakingData | undefined>(undefined);

    const thalesBalanceQuery = useThalesBalanceQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    const userStakingDataQuery = useUserStakingDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

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

    const thalesBalance =
        thalesBalanceQuery.isSuccess && thalesBalanceQuery.data ? Number(thalesBalanceQuery.data.balance) : 0;
    const isUnstaking = userStakingData && userStakingData.isUnstaking;
    const isStakingPaused = userStakingData && userStakingData.isPaused;

    const isAmountEntered = Number(amountToStake) > 0;
    const insufficientBalance = Number(amountToStake) > thalesBalance || !thalesBalance;
    const isButtonDisabled =
        isStaking ||
        !stakingThalesContract ||
        isUnstaking ||
        !isAmountEntered ||
        insufficientBalance ||
        !isWalletConnected ||
        isStakingPaused ||
        !hasStakeAllowance;

    useEffect(() => {
        if (!!stakingThalesContract) {
            const { thalesTokenContract } = networkConnector as any;
            const thalesTokenContractWithSigner = thalesTokenContract.connect((networkConnector as any).signer);
            const addressToApprove = stakingThalesContract.address;
            const getAllowance = async () => {
                try {
                    const parsedStakeAmount = ethers.utils.parseEther(Number(amountToStake).toString());
                    const allowance = await checkAllowance(
                        parsedStakeAmount,
                        thalesTokenContractWithSigner,
                        walletAddress,
                        addressToApprove
                    );
                    setStakeAllowance(allowance);
                } catch (e) {
                    console.log(e);
                }
            };
            if (isWalletConnected && thalesTokenContractWithSigner.signer) {
                getAllowance();
            }
        }
    }, [walletAddress, isWalletConnected, hasStakeAllowance, stakingThalesContract, amountToStake, isAllowingStake]);

    const handleStakeThales = async () => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());

        try {
            setIsStaking(true);
            const stakingThalesContractWithSigner = stakingThalesContract.connect((networkConnector as any).signer);
            const amount = ethers.utils.parseEther(amountToStake.toString());
            const tx = await stakingThalesContractWithSigner.stake(amount);
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                toast.update(id, getSuccessToastOptions(t('staking.staking.stake-unstake.stake-success'), id));
                refetchTokenQueries(walletAddress, networkId);
                PLAUSIBLE.trackEvent(PLAUSIBLE_KEYS.stake);
                setAmountToStake('');
                setIsStaking(false);
            }
        } catch (e) {
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsStaking(false);
        }
    };

    const handleAllowance = async (approveAmount: BigNumber) => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        const { thalesTokenContract, signer } = networkConnector as any;
        const thalesTokenContractWithSigner = thalesTokenContract.connect(signer);

        const addressToApprove = stakingThalesContract.address;
        try {
            setIsAllowingStake(true);

            const tx = (await thalesTokenContractWithSigner.approve(
                addressToApprove,
                approveAmount
            )) as ethers.ContractTransaction;
            setOpenApprovalModal(false);
            const txResult = await tx.wait();
            if (txResult && txResult.transactionHash) {
                toast.update(id, getSuccessToastOptions(t(`common.transaction.successful`), id));
                setIsAllowingStake(false);
            }
        } catch (e) {
            console.log(e);
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsAllowingStake(false);
            setOpenApprovalModal(false);
        }
    };

    const getStakeButton = () => {
        if (!isWalletConnected) {
            return <StakingButton onClick={openConnectModal}>{t('common.wallet.connect-your-wallet')}</StakingButton>;
        }
        if (insufficientBalance) {
            return <StakingButton disabled={true}>{t(`common.errors.insufficient-balance`)}</StakingButton>;
        }
        if (!isAmountEntered) {
            return <StakingButton disabled={true}>{t(`common.errors.enter-amount`)}</StakingButton>;
        }
        if (!hasStakeAllowance) {
            return (
                <StakingButton disabled={isAllowingStake} onClick={() => setOpenApprovalModal(true)}>
                    {!isAllowingStake
                        ? t('common.enable-wallet-access.approve-label', { currencyKey: THALES_CURRENCY })
                        : t('common.enable-wallet-access.approve-progress-label', {
                              currencyKey: THALES_CURRENCY,
                          })}
                </StakingButton>
            );
        }

        return (
            <StakingButton disabled={isButtonDisabled} onClick={handleStakeThales}>
                {!isStaking
                    ? `${t('staking.staking.stake-unstake.stake')} ${formatCurrencyWithKey(
                          THALES_CURRENCY,
                          amountToStake
                      )}    `
                    : `${t('staking.staking.stake-unstake.staking')} ${formatCurrencyWithKey(
                          THALES_CURRENCY,
                          amountToStake
                      )}...`}
            </StakingButton>
        );
    };

    const onMaxClick = () => {
        setAmountToStake(truncToDecimals(thalesBalance, 8));
    };

    useEffect(() => {
        setIsAmountValid(
            Number(amountToStake) === 0 || (Number(amountToStake) > 0 && Number(amountToStake) <= thalesBalance)
        );
    }, [amountToStake, thalesBalance]);

    return (
        <>
            <SectionContentContainer>
                <StakeInputContainer marginTop={isMobile ? 25 : 10}>
                    <FlexDivCentered>
                        <NumericInput
                            value={amountToStake}
                            onChange={(_, value) => setAmountToStake(value)}
                            disabled={
                                isStaking || isUnstaking || isStakingPaused || stakingData?.closingPeriodInProgress
                            }
                            placeholder={t('common.enter-amount')}
                            label={
                                isMobile
                                    ? undefined
                                    : `${t('staking.staking.stake-unstake.amount-to')} ${t(
                                          'staking.staking.stake-unstake.stake'
                                      )}`
                            }
                            onMaxButton={onMaxClick}
                            maxButtonDisabled={!thalesBalance}
                            showValidation={!isAmountValid}
                            validationMessage={t(`common.errors.insufficient-balance-wallet`, {
                                currencyKey: THALES_CURRENCY,
                            })}
                            balance={
                                isWalletConnected
                                    ? `${isMobile ? '' : `${t('common.balance')}:`} ${formatCurrencyWithKey(
                                          THALES_CURRENCY,
                                          thalesBalance
                                      )}`
                                    : undefined
                            }
                            isBalanceLoading={thalesBalanceQuery.isLoading}
                            width="100%"
                            containerWidth={isMobile ? '100%' : '70%'}
                        />
                    </FlexDivCentered>
                </StakeInputContainer>
                <StakeButtonDiv>
                    {getStakeButton()}
                    {isStakingPaused && !stakingData?.closingPeriodInProgress && (
                        <ClaimMessage>{t('staking.staking.stake-unstake.stake-success')}</ClaimMessage>
                    )}
                </StakeButtonDiv>
            </SectionContentContainer>
            {openApprovalModal && (
                <ApprovalModal
                    defaultAmount={amountToStake}
                    tokenSymbol={THALES_CURRENCY}
                    isNonStable={true}
                    isAllowing={isAllowingStake}
                    onSubmit={handleAllowance}
                    onClose={() => setOpenApprovalModal(false)}
                />
            )}
        </>
    );
};

export default Stake;
