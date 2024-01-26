import { useConnectModal } from '@rainbow-me/rainbowkit';
import ApprovalModal from 'components/ApprovalModal';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import NumericInput from 'components/fields/NumericInput';
import { LP_TOKEN, THALES_CURRENCY } from 'constants/currency';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getIsAppReady } from 'redux/modules/app';
// import { getIsMobile } from 'redux/modules/ui';
import useGelatoUserBalanceQuery from 'queries/token/useGelatoUserBalanceQuery';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { FlexDivCentered } from 'styles/common';
import { formatCurrency, formatCurrencyWithKey, truncToDecimals } from 'thales-utils';
import { checkAllowance } from 'utils/network';
import { refetchLPStakingQueries, refetchTokenQueries } from 'utils/queryConnector';
import snxJSConnector from 'utils/snxJSConnector';
import { ClaimMessage, SectionContentContainer, StakeButtonDiv, StakeInputContainer, StakingButton } from './Unstake';

type Properties = {
    isStakingPaused: boolean;
};

const Stake: React.FC<Properties> = ({ isStakingPaused }) => {
    const { t } = useTranslation();
    const { openConnectModal } = useConnectModal();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const [amountToStake, setAmountToStake] = useState<number | string>('');
    const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
    const [isAllowingStake, setIsAllowingStake] = useState<boolean>(false);
    const [isStaking, setIsStaking] = useState<boolean>(false);
    const [hasStakeAllowance, setStakeAllowance] = useState<boolean>(false);
    const [openApprovalModal, setOpenApprovalModal] = useState<boolean>(false);
    const { lpStakingRewardsContract } = snxJSConnector as any;

    const lpTokensBalanceQuery = useGelatoUserBalanceQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    const lpTokensBalance =
        lpTokensBalanceQuery.isSuccess && lpTokensBalanceQuery.data ? Number(lpTokensBalanceQuery.data.balance) : 0;

    const isAmountEntered = Number(amountToStake) > 0;
    const insufficientBalance = Number(amountToStake) > lpTokensBalance || !lpTokensBalance;
    const isButtonDisabled =
        isStaking ||
        !lpStakingRewardsContract ||
        !isAmountEntered ||
        insufficientBalance ||
        !isWalletConnected ||
        !hasStakeAllowance;

    useEffect(() => {
        if (!!lpStakingRewardsContract) {
            const { gelatoContract } = snxJSConnector as any;
            const gelatoContractWithSigner = gelatoContract.connect((snxJSConnector as any).signer);
            const addressToApprove = lpStakingRewardsContract.address;
            const getAllowance = async () => {
                try {
                    const parsedAmountToStake = ethers.utils.parseEther(Number(amountToStake).toString());
                    const allowance = await checkAllowance(
                        parsedAmountToStake,
                        gelatoContractWithSigner,
                        walletAddress,
                        addressToApprove
                    );
                    setStakeAllowance(allowance);
                } catch (e) {
                    console.log(e);
                }
            };
            if (isWalletConnected && gelatoContractWithSigner.signer) {
                getAllowance();
            }
        }
    }, [walletAddress, isWalletConnected, hasStakeAllowance, lpStakingRewardsContract, amountToStake, isAllowingStake]);

    const handleStakeThales = async () => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        try {
            setIsStaking(true);
            const lpStakingRewardsContractWithSigner = lpStakingRewardsContract.connect((snxJSConnector as any).signer);
            const amount = ethers.utils.parseEther(amountToStake.toString());
            const tx = await lpStakingRewardsContractWithSigner.stake(amount);
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                toast.update(
                    id,
                    getSuccessToastOptions(t('thales-token.gamified-staking.staking.stake.confirmation-message'), id)
                );
                refetchTokenQueries(walletAddress, networkId);
                refetchLPStakingQueries(walletAddress, networkId);
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
        const { gelatoContract, signer } = snxJSConnector as any;
        const gelatoContractWithSigner = gelatoContract.connect(signer);

        const addressToApprove = lpStakingRewardsContract.address;
        try {
            setIsAllowingStake(true);
            const tx = (await gelatoContractWithSigner.approve(
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
                        ? t('common.enable-wallet-access.approve-label', { currencyKey: LP_TOKEN })
                        : t('common.enable-wallet-access.approve-progress-label', {
                              currencyKey: LP_TOKEN,
                          })}
                </StakingButton>
            );
        }

        return (
            <StakingButton disabled={isButtonDisabled} onClick={handleStakeThales}>
                {!isStaking
                    ? `${t('staking.lp-staking.stake.name')} ${formatCurrencyWithKey(LP_TOKEN, amountToStake)}`
                    : `${t('staking.lp-staking.stake.staking')} ${formatCurrencyWithKey(LP_TOKEN, amountToStake)}...`}
            </StakingButton>
        );
    };

    const onMaxClick = () => {
        setAmountToStake(truncToDecimals(lpTokensBalance, 8));
    };

    useEffect(() => {
        setIsAmountValid(
            Number(amountToStake) === 0 || (Number(amountToStake) > 0 && Number(amountToStake) <= lpTokensBalance)
        );
    }, [amountToStake, lpTokensBalance]);

    return (
        <>
            <SectionContentContainer>
                <StakeInputContainer marginTop={10}>
                    <FlexDivCentered>
                        <NumericInput
                            value={amountToStake}
                            onChange={(_, value) => setAmountToStake(value)}
                            disabled={isStaking}
                            placeholder={t('common.enter-amount')}
                            label={t('staking.lp-staking.stake.amount-to-stake')}
                            onMaxButton={onMaxClick}
                            showValidation={!isAmountValid}
                            validationMessage={t(`common.errors.insufficient-balance-wallet`, {
                                currencyKey: LP_TOKEN,
                            })}
                            balance={
                                isWalletConnected
                                    ? `${t('common.balance')}: ${formatCurrency(lpTokensBalance)}`
                                    : undefined
                            }
                            width="100%"
                            containerWidth="70%"
                            isBalanceLoading={lpTokensBalanceQuery.isLoading}
                        />
                    </FlexDivCentered>
                </StakeInputContainer>
                <StakeButtonDiv>
                    {getStakeButton()}
                    {isStakingPaused && (
                        <ClaimMessage>{t('staking.lp-staking.stake.paused-message')}</ClaimMessage>
                    )}{' '}
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
