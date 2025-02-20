import { useConnectModal } from '@rainbow-me/rainbowkit';
import ApprovalModal from 'components/ApprovalModal';
import Button from 'components/Button';
import NumericInput from 'components/fields/NumericInput';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import { CRYPTO_CURRENCY_MAP, THALES_CURRENCY } from 'constants/currency';
import { MIGRATION_PROPOSAL_ID } from 'constants/governance';
import ROUTES from 'constants/routes';
import { SpaceKey } from 'enums/governance';
import { BigNumber, ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import useThalesBalanceQuery from 'queries/token/useThalesBalanceQuery';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { formatCurrencyWithKey, truncToDecimals } from 'thales-utils';
import { checkAllowance } from 'utils/network';
import networkConnector from 'utils/networkConnector';
import { buildGovernanceHref, buildHref } from 'utils/routes';
import {
    ButtonContainer,
    CloseIcon,
    Container,
    defaultButtonProps,
    defaultCustomStyles,
    Description,
    InputContainer,
    Summary,
    SummaryLabel,
    SummaryValue,
    TipLink,
    Title,
} from './styled-components';

type ThalesToOverMigrationModalProps = {
    onClose: () => void;
};

const ThalesToOverMigrationModal: React.FC<ThalesToOverMigrationModalProps> = ({ onClose }) => {
    const { t } = useTranslation();
    const { openConnectModal } = useConnectModal();

    const isAppReady = useSelector(getIsAppReady);
    const isWalletConnected = useSelector(getIsWalletConnected);
    const networkId = useSelector(getNetworkId);
    const walletAddress = useSelector(getWalletAddress) || '';

    const [amount, setAmount] = useState<number | string>('');
    const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
    const [isAllowing, setIsAllowing] = useState<boolean>(false);
    const [isMigrating, setIsMigrating] = useState<boolean>(false);
    const [hasAllowance, setAllowance] = useState<boolean>(false);
    const [openApprovalModal, setOpenApprovalModal] = useState<boolean>(false);
    const { thalesToOverMigrationContract } = networkConnector as any;

    const thalesBalanceQuery = useThalesBalanceQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    const thalesBalance =
        thalesBalanceQuery.isSuccess && thalesBalanceQuery.data ? Number(thalesBalanceQuery.data.balance) : 0;

    const isAmountEntered = Number(amount) > 0;
    const insufficientBalance = Number(amount) > thalesBalance || !thalesBalance;
    const isButtonDisabled =
        isMigrating || !isAmountEntered || insufficientBalance || !isWalletConnected || !hasAllowance;

    useEffect(() => {
        setIsAmountValid(Number(amount) === 0 || (Number(amount) > 0 && Number(amount) <= thalesBalance));
    }, [amount, thalesBalance]);

    useEffect(() => {
        if (!!thalesToOverMigrationContract) {
            const { thalesTokenContract } = networkConnector as any;
            const thalesTokenContractWithSigner = thalesTokenContract.connect((networkConnector as any).signer);
            const addressToApprove = thalesToOverMigrationContract.address;
            const getAllowance = async () => {
                try {
                    const parsedStakeAmount = ethers.utils.parseEther(Number(amount).toString());
                    const allowance = await checkAllowance(
                        parsedStakeAmount,
                        thalesTokenContractWithSigner,
                        walletAddress,
                        addressToApprove
                    );
                    setAllowance(allowance);
                } catch (e) {
                    console.log(e);
                }
            };
            if (isWalletConnected && thalesTokenContractWithSigner.signer) {
                getAllowance();
            }
        }
    }, [walletAddress, isWalletConnected, thalesToOverMigrationContract, amount]);

    const handleAllowance = async (approveAmount: BigNumber) => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        const { thalesTokenContract, signer } = networkConnector as any;
        const thalesTokenContractWithSigner = thalesTokenContract.connect(signer);

        const addressToApprove = thalesToOverMigrationContract.address;
        try {
            setIsAllowing(true);

            const tx = (await thalesTokenContractWithSigner.approve(
                addressToApprove,
                approveAmount
            )) as ethers.ContractTransaction;
            setOpenApprovalModal(false);
            const txResult = await tx.wait();
            if (txResult && txResult.transactionHash) {
                toast.update(id, getSuccessToastOptions(t(`common.transaction.successful`), id));
                setIsAllowing(false);
            }
        } catch (e) {
            console.log(e);
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsAllowing(false);
            setOpenApprovalModal(false);
        }
    };

    const handleMigration = async () => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());

        try {
            setIsMigrating(true);
            const thalesToOverMigrationContractWithSigner = thalesToOverMigrationContract.connect(
                (networkConnector as any).signer
            );
            const parsedAmount = parseEther(amount.toString());
            const tx = await thalesToOverMigrationContractWithSigner.migrateThalesToOver(parsedAmount);
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                toast.update(id, getSuccessToastOptions(t('migration-modal.migration-confirmation-message'), id));
                setAmount(0);
                onClose();
                setIsMigrating(false);
            }
        } catch (e) {
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            console.log(e);
            setIsMigrating(false);
        }
    };

    const getSubmitButton = () => {
        if (!isWalletConnected) {
            return (
                <Button onClick={openConnectModal} {...defaultButtonProps}>
                    {t('common.wallet.connect-your-wallet')}
                </Button>
            );
        }
        if (insufficientBalance) {
            return (
                <Button disabled={true} {...defaultButtonProps}>
                    {t(`common.errors.insufficient-balance`)}
                </Button>
            );
        }
        if (!isAmountEntered) {
            return (
                <Button disabled={true} {...defaultButtonProps}>
                    {t(`common.errors.enter-amount`)}
                </Button>
            );
        }
        if (!hasAllowance) {
            return (
                <Button disabled={isAllowing} onClick={() => setOpenApprovalModal(true)} {...defaultButtonProps}>
                    {t('common.enable-wallet-access.approve-label', { currencyKey: THALES_CURRENCY })}
                </Button>
            );
        }

        return (
            <Button disabled={isButtonDisabled} onClick={handleMigration} {...defaultButtonProps}>
                {!isMigrating
                    ? `${t('migration-modal.button.migrate-label')} ${formatCurrencyWithKey(
                          CRYPTO_CURRENCY_MAP.THALES,
                          amount
                      )}    `
                    : `${t('migration-modal.button.migrate-progress-label')} ${formatCurrencyWithKey(
                          CRYPTO_CURRENCY_MAP.THALES,
                          amount
                      )}...`}
            </Button>
        );
    };

    const onMaxClick = () => {
        setAmount(truncToDecimals(thalesBalance, 8));
    };

    return (
        <ReactModal
            isOpen
            onRequestClose={() => onClose()}
            shouldCloseOnOverlayClick={false}
            style={defaultCustomStyles}
        >
            <Container>
                <CloseIcon className="thales-icon thales-icon--close" onClick={() => onClose()} />
                <Title>{t('migration-modal.title')}</Title>
                <Description>
                    <Trans
                        i18nKey={'migration-modal.description'}
                        components={{
                            p: <p />,
                            tipLink: (
                                <TipLink
                                    href={buildGovernanceHref(SpaceKey.COUNCIL, MIGRATION_PROPOSAL_ID)}
                                    target="_blank"
                                    rel="noreferrer"
                                />
                            ),
                        }}
                    />
                </Description>
                <Description>
                    <Trans
                        i18nKey={'migration-modal.unstake-description'}
                        components={{
                            p: <p />,
                            stakingLink: (
                                <TipLink href={buildHref(ROUTES.Token.Staking.Home)} target="_blank" rel="noreferrer" />
                            ),
                            lpStakingLink: (
                                <TipLink href={buildHref(ROUTES.Token.LPStaking)} target="_blank" rel="noreferrer" />
                            ),
                        }}
                    />
                </Description>
                <InputContainer>
                    <NumericInput
                        value={amount}
                        onChange={(_, value) => setAmount(value)}
                        disabled={isAllowing || isMigrating}
                        label={t('migration-modal.amount-label')}
                        placeholder={t(`common.errors.enter-amount`)}
                        currencyLabel={CRYPTO_CURRENCY_MAP.THALES}
                        showValidation={!isAmountValid}
                        validationMessage={t('common.errors.insufficient-balance-wallet', {
                            currencyKey: CRYPTO_CURRENCY_MAP.THALES,
                        })}
                        balance={formatCurrencyWithKey(CRYPTO_CURRENCY_MAP.THALES, thalesBalance)}
                        onMaxButton={onMaxClick}
                        inputPadding="5px 10px"
                    />
                </InputContainer>
                <Summary>
                    <SummaryLabel>{t('migration-modal.over-to-receive')}:</SummaryLabel>
                    <SummaryValue>{Number(amount)}</SummaryValue>
                </Summary>
                <ButtonContainer>{getSubmitButton()}</ButtonContainer>
            </Container>
            {openApprovalModal && (
                <ApprovalModal
                    defaultAmount={Number(amount)}
                    // collateralIndex={getCollateralIndex(networkId, CRYPTO_CURRENCY_MAP.THALES as Coins)}
                    tokenSymbol={CRYPTO_CURRENCY_MAP.THALES}
                    isAllowing={isAllowing}
                    onSubmit={handleAllowance}
                    onClose={() => setOpenApprovalModal(false)}
                />
            )}
        </ReactModal>
    );
};

export default ThalesToOverMigrationModal;
