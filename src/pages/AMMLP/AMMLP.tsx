import { Slider } from '@material-ui/core';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import ApprovalModal from 'components/ApprovalModal';
import Loader from 'components/Loader';
import { NavItemType } from 'components/NavLinks/NavItem';
import NavLinks from 'components/NavLinks/NavLinks';
import SwitchInput from 'components/SwitchInput';
import TimeRemaining from 'components/TimeRemaining';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import Tooltip from 'components/Tooltip';
import NumericInput from 'components/fields/NumericInput';
import RadioButton from 'components/fields/RadioButton';
import { USD_SIGN } from 'constants/currency';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import { LiquidityPool, LiquidityPoolPnlType } from 'enums/liquidityPool';
import { Network } from 'enums/network';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { BigNumber, ethers } from 'ethers';
import useParlayLiquidityPoolDataQuery from 'queries/liquidityPool/useParlayAmmLiquidityPoolDataQuery';
import useParlayLiquidityPoolUserDataQuery from 'queries/liquidityPool/useParlayAmmLiquidityPoolUserDataQuery';
import useSportsAmmLiquidityPoolDataQuery from 'queries/liquidityPool/useSportsAmmLiquidityPoolDataQuery';
import useSportsAmmLiquidityPoolUserDataQuery from 'queries/liquidityPool/useSportsAmmLiquidityPoolUserDataQuery';
import useThalesLiquidityPoolDataQuery from 'queries/liquidityPool/useThalesLiquidityPoolDataQuery';
import useThalesLiquidityPoolUserDataQuery from 'queries/liquidityPool/useThalesLiquidityPoolUserDataQuery';
import useStableBalanceQuery from 'queries/walletBalances.ts/useStableBalanceQuery';
import queryString from 'query-string';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled, { useTheme } from 'styled-components';
import {
    FlexDiv,
    FlexDivCentered,
    FlexDivColumn,
    FlexDivColumnCentered,
    FlexDivColumnSpaceAround,
    FlexDivColumnSpaceBetween,
    FlexDivRow,
    FlexDivStart,
    Line,
    NavContainer,
} from 'styles/common';
import { formatCurrencyWithSign, formatPercentage, getDefaultDecimalsForNetwork } from 'thales-utils';
import { LiquidityPoolData, UserLiquidityPoolData } from 'types/liquidityPool';
import { getCurrencyKeyStableBalance } from 'utils/balances';
import { getDefaultCollateral } from 'utils/currency';
import { checkAllowance } from 'utils/network';
import { refetchLiquidityPoolData } from 'utils/queryConnector';
import { buildHref } from 'utils/routes';
import snxJSConnector from 'utils/snxJSConnector';
import MaxAllowanceTooltip from './MaxAllowanceTooltip';
import PnL from './PnL';
import YourTransactions from './Transactions';
import {
    Bottom,
    ChartsContainer,
    Container,
    InfoDiv,
    InputContainer,
    SectionContentContainer,
    SectionDescription,
    SectionTitle,
    StakingButton,
    Top,
} from './styled-components';

const AMMLP: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const paramTab: LiquidityPool = (queryString.parse(location.search).tab as LiquidityPool) || LiquidityPool.THALES;

    const navItems: NavItemType[] = useMemo(() => {
        return [
            {
                href: `${buildHref(ROUTES.AMMLP)}?tab=${LiquidityPool.THALES}`,
                title: t('amm-lp.nav.thales'),
                active: paramTab === LiquidityPool.THALES,
            },
            {
                href: `${buildHref(ROUTES.AMMLP)}?tab=${LiquidityPool.OVERTIME_SINGLE}`,
                title: t('amm-lp.nav.overtime-single'),
                active: paramTab === LiquidityPool.OVERTIME_SINGLE,
            },
            {
                href: `${buildHref(ROUTES.AMMLP)}?tab=${LiquidityPool.OVERTIME_PARLAY}`,
                title: t('amm-lp.nav.overtime-parlay'),
                active: paramTab === LiquidityPool.OVERTIME_PARLAY,
            },
        ];
    }, [paramTab, t]);

    const theme = useTheme();
    const { openConnectModal } = useConnectModal();
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const [amount, setAmount] = useState<number | string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasAllowance, setAllowance] = useState<boolean>(false);
    const [isAllowing, setIsAllowing] = useState<boolean>(false);
    const [openApprovalModal, setOpenApprovalModal] = useState<boolean>(false);
    const [paymentTokenBalance, setPaymentTokenBalance] = useState<number | string>('');
    const [liquidityPoolData, setLiquidityPoolData] = useState<LiquidityPoolData | undefined>(undefined);
    const [userLiquidityPoolData, setUserLiquidityPoolData] = useState<UserLiquidityPoolData | undefined>(undefined);
    const [withdrawAll, setWithdrawAll] = useState<boolean>(true);
    const [withdrawalPercentage, setWithdrawalPercentage] = useState<number | string>(10);
    const [isWithdrawalPercentageValid, setIsWithdrawalPercentageValid] = useState<boolean>(true);
    const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
    const [depositSelected, setDepositSelected] = useState(true);

    const collateral = getDefaultCollateral(networkId);

    const paymentTokenBalanceQuery = useStableBalanceQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    useEffect(() => {
        if (paymentTokenBalanceQuery.isSuccess && paymentTokenBalanceQuery.data !== undefined) {
            setPaymentTokenBalance(
                getCurrencyKeyStableBalance(paymentTokenBalanceQuery.data, getDefaultCollateral(networkId))
            );
        }
    }, [paymentTokenBalanceQuery.isSuccess, paymentTokenBalanceQuery.data, networkId]);

    const thalesLiquidityPoolDataQuery = useThalesLiquidityPoolDataQuery(networkId, {
        enabled: isAppReady && paramTab === LiquidityPool.THALES,
    });

    const thalesUserLiquidityPoolDataQuery = useThalesLiquidityPoolUserDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected && paramTab === LiquidityPool.THALES,
    });

    const sportsAmmLiquidityPoolDataQuery = useSportsAmmLiquidityPoolDataQuery(networkId, {
        enabled: isAppReady && paramTab === LiquidityPool.OVERTIME_SINGLE,
    });

    const sportsAmmUserLiquidityPoolDataQuery = useSportsAmmLiquidityPoolUserDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected && paramTab === LiquidityPool.OVERTIME_SINGLE,
    });

    const parlayLiquidityPoolDataQuery = useParlayLiquidityPoolDataQuery(networkId, {
        enabled: isAppReady && paramTab === LiquidityPool.OVERTIME_PARLAY,
    });

    const parlayUserLiquidityPoolDataQuery = useParlayLiquidityPoolUserDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected && paramTab === LiquidityPool.OVERTIME_PARLAY,
    });

    useEffect(() => {
        if (
            thalesLiquidityPoolDataQuery.isSuccess &&
            thalesLiquidityPoolDataQuery.data &&
            paramTab === LiquidityPool.THALES
        ) {
            setLiquidityPoolData(thalesLiquidityPoolDataQuery.data);
        }
        if (
            sportsAmmLiquidityPoolDataQuery.isSuccess &&
            sportsAmmLiquidityPoolDataQuery.data &&
            paramTab === LiquidityPool.OVERTIME_SINGLE
        ) {
            setLiquidityPoolData(sportsAmmLiquidityPoolDataQuery.data);
        }
        if (
            parlayLiquidityPoolDataQuery.isSuccess &&
            parlayLiquidityPoolDataQuery.data &&
            paramTab === LiquidityPool.OVERTIME_PARLAY
        ) {
            setLiquidityPoolData(parlayLiquidityPoolDataQuery.data);
        }
    }, [
        thalesLiquidityPoolDataQuery.isSuccess,
        thalesLiquidityPoolDataQuery.data,
        sportsAmmLiquidityPoolDataQuery.isSuccess,
        sportsAmmLiquidityPoolDataQuery.data,
        parlayLiquidityPoolDataQuery.isSuccess,
        parlayLiquidityPoolDataQuery.data,
        paramTab,
    ]);

    useEffect(() => {
        if (
            thalesUserLiquidityPoolDataQuery.isSuccess &&
            thalesUserLiquidityPoolDataQuery.data &&
            paramTab === LiquidityPool.THALES
        ) {
            setUserLiquidityPoolData(thalesUserLiquidityPoolDataQuery.data);
        }
        if (
            sportsAmmUserLiquidityPoolDataQuery.isSuccess &&
            sportsAmmUserLiquidityPoolDataQuery.data &&
            paramTab === LiquidityPool.OVERTIME_SINGLE
        ) {
            setUserLiquidityPoolData(sportsAmmUserLiquidityPoolDataQuery.data);
        }
        if (
            parlayUserLiquidityPoolDataQuery.isSuccess &&
            parlayUserLiquidityPoolDataQuery.data &&
            paramTab === LiquidityPool.OVERTIME_PARLAY
        ) {
            setUserLiquidityPoolData(parlayUserLiquidityPoolDataQuery.data);
        }
    }, [
        thalesUserLiquidityPoolDataQuery.isSuccess,
        thalesUserLiquidityPoolDataQuery.data,
        paramTab,
        sportsAmmUserLiquidityPoolDataQuery.isSuccess,
        sportsAmmUserLiquidityPoolDataQuery.data,
        parlayUserLiquidityPoolDataQuery.isSuccess,
        parlayUserLiquidityPoolDataQuery.data,
    ]);

    const isAmountEntered = Number(amount) > 0;
    const invalidAmount =
        liquidityPoolData &&
        Number(liquidityPoolData.minDepositAmount) > Number(amount) &&
        userLiquidityPoolData &&
        !userLiquidityPoolData.hasDepositForCurrentRound &&
        !userLiquidityPoolData.hasDepositForNextRound &&
        isAmountEntered;
    const insufficientBalance =
        (Number(paymentTokenBalance) < Number(amount) || Number(paymentTokenBalance) === 0) && isWalletConnected;

    const liquidityPoolPaused = liquidityPoolData && liquidityPoolData.paused;

    const exceededLiquidityPoolCap =
        liquidityPoolData && liquidityPoolData.availableAllocationNextRound < Number(amount);
    const exceededMaxAllowance = userLiquidityPoolData && userLiquidityPoolData.availableToDeposit < Number(amount);
    const isMaximumAmountOfUsersReached =
        liquidityPoolData &&
        liquidityPoolData.usersCurrentlyInLiquidityPool === liquidityPoolData.maxAllowedUsers &&
        userLiquidityPoolData &&
        !userLiquidityPoolData.hasDepositForCurrentRound &&
        !userLiquidityPoolData.hasDepositForNextRound;
    const isLiquidityPoolCapReached = liquidityPoolData && liquidityPoolData.allocationNextRoundPercentage >= 100;

    const isWithdrawalRequested = userLiquidityPoolData && userLiquidityPoolData.isWithdrawalRequested;
    // const nothingToWithdraw = userLiquidityPoolData && userLiquidityPoolData.balanceCurrentRound === 0;

    const isDepositButtonDisabled =
        !isWalletConnected ||
        !isAmountEntered ||
        insufficientBalance ||
        isSubmitting ||
        isWithdrawalRequested ||
        exceededLiquidityPoolCap ||
        exceededMaxAllowance ||
        isMaximumAmountOfUsersReached ||
        invalidAmount ||
        liquidityPoolPaused ||
        isLiquidityPoolCapReached;

    const isDepositAmountInputDisabled =
        isSubmitting ||
        isWithdrawalRequested ||
        isMaximumAmountOfUsersReached ||
        liquidityPoolPaused ||
        isLiquidityPoolCapReached;

    const infoGraphicPercentages = getInfoGraphicPercentages(
        userLiquidityPoolData ? userLiquidityPoolData.balanceCurrentRound : 0,
        userLiquidityPoolData ? userLiquidityPoolData.balanceTotal : 0,
        userLiquidityPoolData ? userLiquidityPoolData.maxDeposit : 0
    );

    const nothingToWithdraw = userLiquidityPoolData && userLiquidityPoolData.balanceCurrentRound === 0;

    const isRequestWithdrawalButtonDisabled =
        !isWalletConnected ||
        isSubmitting ||
        nothingToWithdraw ||
        (userLiquidityPoolData && userLiquidityPoolData.hasDepositForNextRound) ||
        liquidityPoolPaused;

    const isPartialWithdrawalDisabled = isRequestWithdrawalButtonDisabled || withdrawAll;

    const activeLiquidityPoolContract = useMemo(() => {
        if (paramTab === LiquidityPool.THALES) {
            return snxJSConnector.thalesLiquidityPoolContract;
        }
        if (paramTab === LiquidityPool.OVERTIME_SINGLE) {
            return snxJSConnector.sportLiquidityPoolContract;
        }
        if (paramTab === LiquidityPool.OVERTIME_PARLAY) {
            return snxJSConnector.parlayAMMLiquidityPoolContract;
        }
    }, [paramTab]);

    useEffect(() => {
        const { signer, collateral } = snxJSConnector;
        if (signer && collateral && activeLiquidityPoolContract) {
            const collateralWithSigner = collateral.connect(signer);
            const getAllowance = async () => {
                try {
                    const parsedAmount = ethers.utils.parseUnits(
                        Number(amount).toString(),
                        getDefaultDecimalsForNetwork(networkId)
                    );
                    const allowance = await checkAllowance(
                        parsedAmount,
                        collateralWithSigner,
                        walletAddress,
                        activeLiquidityPoolContract?.address || ''
                    );
                    setAllowance(allowance);
                } catch (e) {
                    console.log(e);
                }
            };
            if (isWalletConnected) {
                getAllowance();
            }
        }
    }, [walletAddress, isWalletConnected, hasAllowance, amount, isAllowing, networkId, activeLiquidityPoolContract]);

    const handleAllowance = async (approveAmount: BigNumber) => {
        const { signer, collateral } = snxJSConnector;
        if (signer && collateral && activeLiquidityPoolContract) {
            const id = toast.loading(getDefaultToastContent(t('common.transaction-pending')), getLoadingToastOptions());
            setIsAllowing(true);

            try {
                const collateralWithSigner = collateral.connect(signer);

                const tx = (await collateralWithSigner.approve(
                    activeLiquidityPoolContract.address,
                    approveAmount
                )) as ethers.ContractTransaction;
                setOpenApprovalModal(false);
                const txResult = await tx.wait();

                if (txResult && txResult.transactionHash) {
                    toast.update(id, getSuccessToastOptions(t('common.approve-success', { token: collateral }), id));
                    setIsAllowing(false);
                }
            } catch (e) {
                console.log(e);
                toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
                setIsAllowing(false);
            }
        }
    };

    const handleWithdrawalRequest = async () => {
        const { signer, thalesLiquidityPoolContract } = snxJSConnector;
        if (signer && thalesLiquidityPoolContract) {
            const id = toast.loading(
                getDefaultToastContent(t('markets.market.toast-messsage.transaction-pending')),
                getLoadingToastOptions()
            );
            setIsSubmitting(true);
            try {
                const liquidityPoolContractWithSigner = thalesLiquidityPoolContract.connect(signer);
                const parsedPercentage = ethers.utils.parseEther((Number(withdrawalPercentage) / 100).toString());

                const tx = withdrawAll
                    ? await liquidityPoolContractWithSigner.withdrawalRequest()
                    : await liquidityPoolContractWithSigner.partialWithdrawalRequest(parsedPercentage);
                const txResult = await tx.wait();

                if (txResult && txResult.events) {
                    toast.update(
                        id,
                        getSuccessToastOptions(t('staking.amm-lp.button.request-withdrawal-confirmation-message'), id)
                    );
                    setAmount('');
                    setIsSubmitting(false);
                    refetchLiquidityPoolData(walletAddress, networkId, paramTab);
                }
            } catch (e) {
                console.log(e);
                toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
                setIsSubmitting(false);
            }
        }
    };

    const handleDeposit = async () => {
        const { signer, thalesLiquidityPoolContract } = snxJSConnector;
        if (signer && thalesLiquidityPoolContract) {
            const id = toast.loading(getDefaultToastContent(t('common.transaction-pending')), getLoadingToastOptions());
            setIsSubmitting(true);
            try {
                const liquidityPoolContractWithSigner = thalesLiquidityPoolContract.connect(signer);
                const parsedAmount = ethers.utils.parseUnits(
                    Number(amount).toString(),
                    getDefaultDecimalsForNetwork(networkId)
                );

                const tx = await liquidityPoolContractWithSigner.deposit(parsedAmount);
                const txResult = await tx.wait();

                if (txResult && txResult.events) {
                    toast.update(
                        id,
                        getSuccessToastOptions(t('staking.amm-lp.deposit-withdraw.deposit-confirmation-message'), id)
                    );
                    setAmount('');
                    setIsSubmitting(false);
                    refetchLiquidityPoolData(walletAddress, networkId, paramTab);
                }
            } catch (e) {
                console.log(e);
                toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
                setIsSubmitting(false);
            }
        }
    };

    const getDepositSubmitButton = () => {
        if (!isWalletConnected) {
            return <StakingButton onClick={openConnectModal}>{t('common.wallet.connect-your-wallet')}</StakingButton>;
        }
        if (insufficientBalance) {
            return <StakingButton disabled={true}>{t(`common.errors.insufficient-balance`)}</StakingButton>;
        }
        if (!isAmountEntered) {
            return <StakingButton disabled={true}>{t(`common.errors.enter-amount`)}</StakingButton>;
        }
        if (!hasAllowance) {
            return (
                <StakingButton disabled={isAllowing} onClick={() => setOpenApprovalModal(true)}>
                    {!isAllowing
                        ? t('common.enable-wallet-access.approve-label', { currencyKey: collateral })
                        : t('common.enable-wallet-access.approve-progress-label', {
                              currencyKey: collateral,
                          })}
                </StakingButton>
            );
        }
        return (
            <StakingButton disabled={isDepositButtonDisabled} onClick={handleDeposit}>
                {!isSubmitting
                    ? t('staking.amm-lp.deposit-withdraw.deposit')
                    : t('staking.amm-lp.deposit-withdraw.depositing')}
            </StakingButton>
        );
    };

    const getWithdrawSubmitButton = () => {
        if (!isWalletConnected) {
            return <StakingButton onClick={openConnectModal}>{t('common.wallet.connect-your-wallet')}</StakingButton>;
        }
        return (
            <StakingButton
                disabled={isRequestWithdrawalButtonDisabled || !isWithdrawalPercentageValid}
                onClick={handleWithdrawalRequest}
            >
                {t('staking.amm-lp.button.request-withdrawal-label')}
            </StakingButton>
        );
    };

    const setMaxAmount = () => {
        setAmount(Math.trunc(userLiquidityPoolData ? userLiquidityPoolData.availableToDeposit * 100 : 0) / 100);
    };

    useEffect(
        () =>
            setIsWithdrawalPercentageValid(
                (Number(withdrawalPercentage) <= 90 && Number(withdrawalPercentage) >= 10) || withdrawAll
            ),
        [withdrawalPercentage, withdrawAll]
    );

    useEffect(() => {
        if (userLiquidityPoolData) {
            setWithdrawalAmount(
                withdrawAll
                    ? userLiquidityPoolData.balanceCurrentRound
                    : (userLiquidityPoolData.balanceCurrentRound * Number(withdrawalPercentage)) / 100
            );
        }
    }, [withdrawalPercentage, withdrawAll, userLiquidityPoolData]);

    return (
        <Suspense fallback={<Loader />}>
            <Line />
            <NavContainer width="40%">
                <NavLinks items={navItems} />
            </NavContainer>
            <Container>
                <Top>
                    <FlexDivColumnSpaceBetween>
                        <SectionTitle>
                            <span>
                                <i className="icon icon--staking" />
                                {t('staking.amm-lp.how-it-works.title')}
                                <div>{t('staking.amm-lp.how-it-works.subtitle')}</div>
                            </span>
                        </SectionTitle>
                        <SectionDescription>{t('staking.amm-lp.how-it-works.description-1')}</SectionDescription>
                        <SectionDescription>{t('staking.amm-lp.how-it-works.description-2')}</SectionDescription>
                        <SectionTitle>
                            <span>
                                <div>{t('staking.amm-lp.how-it-works.variables')}</div>
                            </span>
                        </SectionTitle>
                        <FlexDiv>
                            <FlexDivColumn>
                                <InfoDiv>
                                    <span>{t('staking.amm-lp.how-it-works.max-total-deposit')}:</span>
                                    <span>
                                        {formatCurrencyWithSign(USD_SIGN, liquidityPoolData?.maxAllowedDeposit || 0, 0)}
                                    </span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.amm-lp.how-it-works.max-users')}:</span>
                                    <span>{liquidityPoolData?.maxAllowedUsers}</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.amm-lp.how-it-works.minimum-deposit')}:</span>
                                    <span>
                                        {formatCurrencyWithSign(USD_SIGN, liquidityPoolData?.minDepositAmount || 0, 0)}
                                    </span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.amm-lp.how-it-works.round-duration')}:</span>
                                    <span>{liquidityPoolData?.roundLength}</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.amm-lp.how-it-works.round-ends-in')}:</span>
                                    <span>
                                        {liquidityPoolData?.roundEndTime && (
                                            <TimeRemaining
                                                end={liquidityPoolData?.roundEndTime}
                                                fontSize={13}
                                                showFullCounter
                                            />
                                        )}
                                    </span>
                                </InfoDiv>
                            </FlexDivColumn>
                            <FlexDivColumnSpaceAround>
                                <FlexDivCentered>
                                    <a target="_blank" rel="noreferrer" href={getUniswapLink(networkId)}>
                                        <StakingButton width="230px">
                                            {t('staking.amm-lp.how-it-works.get-thales')}
                                        </StakingButton>
                                    </a>
                                </FlexDivCentered>
                                <FlexDivCentered>
                                    <a target="_blank" rel="noreferrer" href={LINKS.Token.ThalesStaking}>
                                        <StakingButton width="230px">
                                            {t('staking.amm-lp.how-it-works.stake-thales')}
                                        </StakingButton>
                                    </a>
                                </FlexDivCentered>
                            </FlexDivColumnSpaceAround>
                        </FlexDiv>
                    </FlexDivColumnSpaceBetween>
                </Top>
                <Bottom>
                    <SwitchInput
                        label={{
                            firstLabel: t('staking.amm-lp.deposit-withdraw.deposit'),
                            secondLabel: t('staking.amm-lp.deposit-withdraw.withdraw'),
                            fontSize: '18px',
                        }}
                        borderColor={theme.borderColor.secondary}
                        dotBackground={theme.textColor.secondary}
                        dotSize="20px"
                        active={!depositSelected}
                        handleClick={() => setDepositSelected(!depositSelected)}
                    />
                    <SectionContentContainer>
                        {depositSelected && (
                            <>
                                {isWithdrawalRequested && (
                                    <WarningContentInfo>
                                        <Trans i18nKey="staking.amm-lp.deposit-withdrawal-warning" />
                                    </WarningContentInfo>
                                )}
                                {isLiquidityPoolCapReached && (
                                    <WarningContentInfo>
                                        <Trans i18nKey="staking.amm-lp.deposit-liquidity-pool-cap-reached-warning" />
                                    </WarningContentInfo>
                                )}
                                {isMaximumAmountOfUsersReached && (
                                    <WarningContentInfo>
                                        <Trans i18nKey="staking.amm-lp.deposit-max-amount-of-users-warning" />
                                    </WarningContentInfo>
                                )}
                                <InputContainer marginTop={10}>
                                    <FlexDivCentered>
                                        <NumericInput
                                            value={amount}
                                            disabled={isDepositAmountInputDisabled}
                                            onChange={(_, value) => setAmount(value)}
                                            onMaxButton={setMaxAmount}
                                            placeholder={t('common.enter-amount')}
                                            showValidation={
                                                insufficientBalance ||
                                                !!exceededLiquidityPoolCap ||
                                                !!exceededMaxAllowance ||
                                                !!invalidAmount
                                            }
                                            validationMessage={
                                                t(
                                                    `${
                                                        insufficientBalance
                                                            ? 'common.errors.insufficient-balance'
                                                            : exceededLiquidityPoolCap
                                                            ? 'staking.amm-lp.deposit-liquidity-pool-cap-error'
                                                            : exceededMaxAllowance
                                                            ? 'staking.amm-lp.deposit-staked-thales-error'
                                                            : 'staking.amm-lp.deposit-min-amount-error'
                                                    }`,
                                                    {
                                                        amount: formatCurrencyWithSign(
                                                            USD_SIGN,
                                                            liquidityPoolData?.minDepositAmount || 0
                                                        ),
                                                    }
                                                ) as string
                                            }
                                        />
                                    </FlexDivCentered>
                                </InputContainer>
                                <ButtonContainer>{getDepositSubmitButton()}</ButtonContainer>
                            </>
                        )}
                        {!depositSelected && (
                            <>
                                {((liquidityPoolData && userLiquidityPoolData && !isWithdrawalRequested) ||
                                    !isWalletConnected) && (
                                    <>
                                        {nothingToWithdraw || !isWalletConnected ? (
                                            <>
                                                <ContentInfo>
                                                    <Trans i18nKey="staking.amm-lp.nothing-to-withdraw-label" />
                                                </ContentInfo>
                                                {userLiquidityPoolData &&
                                                    userLiquidityPoolData.hasDepositForNextRound && (
                                                        <ContentInfo>
                                                            <Trans i18nKey="staking.amm-lp.first-deposit-withdrawal-message" />
                                                        </ContentInfo>
                                                    )}
                                            </>
                                        ) : (
                                            <>
                                                {userLiquidityPoolData && (
                                                    <>
                                                        {userLiquidityPoolData.hasDepositForNextRound ? (
                                                            <WarningContentInfo>
                                                                <Trans i18nKey="staking.amm-lp.withdrawal-deposit-warning" />
                                                            </WarningContentInfo>
                                                        ) : (
                                                            <>
                                                                <ContentInfo>
                                                                    <Trans
                                                                        i18nKey="staking.amm-lp.available-to-withdraw-label"
                                                                        components={{
                                                                            bold: <BoldContent />,
                                                                        }}
                                                                        values={{
                                                                            amount: formatCurrencyWithSign(
                                                                                USD_SIGN,
                                                                                userLiquidityPoolData.balanceCurrentRound
                                                                            ),
                                                                        }}
                                                                    />
                                                                    <Tooltip
                                                                        overlay={t(
                                                                            `staking.amm-lp.estimated-amount-tooltip`
                                                                        )}
                                                                        iconFontSize={14}
                                                                        marginLeft={2}
                                                                        top={-1}
                                                                    />
                                                                </ContentInfo>
                                                                <ContentInfo>
                                                                    <Trans i18nKey="staking.amm-lp.withdrawal-message" />
                                                                </ContentInfo>
                                                                <RadioButtonContainer>
                                                                    <RadioButton
                                                                        checked={withdrawAll}
                                                                        value={'true'}
                                                                        onChange={() => setWithdrawAll(true)}
                                                                        label={t(
                                                                            `staking.amm-lp.full-withdrawal-label`
                                                                        )}
                                                                    />
                                                                    <RadioButton
                                                                        checked={!withdrawAll}
                                                                        value={'false'}
                                                                        onChange={() => setWithdrawAll(false)}
                                                                        label={t(
                                                                            `staking.amm-lp.partial-withdrawal-label`
                                                                        )}
                                                                    />
                                                                </RadioButtonContainer>
                                                                <NumericInput
                                                                    value={withdrawalPercentage}
                                                                    onChange={(_, value) =>
                                                                        setWithdrawalPercentage(value)
                                                                    }
                                                                    disabled={isPartialWithdrawalDisabled}
                                                                    step="1"
                                                                    currencyLabel="%"
                                                                    placeholder={t('common.enter-percentage')}
                                                                    showValidation={!isWithdrawalPercentageValid}
                                                                    validationMessage={t(
                                                                        Number(withdrawalPercentage) === 0
                                                                            ? 'common.errors.enter-percentage'
                                                                            : 'common.errors.invalid-percentage-range',
                                                                        { min: 10, max: 90 }
                                                                    )}
                                                                />
                                                                <SliderContainer>
                                                                    <StyledSlider
                                                                        value={Number(withdrawalPercentage)}
                                                                        step={1}
                                                                        max={90}
                                                                        min={10}
                                                                        onChange={(_: any, value: any) =>
                                                                            setWithdrawalPercentage(Number(value))
                                                                        }
                                                                        disabled={isPartialWithdrawalDisabled}
                                                                    />
                                                                    <FlexDivRow>
                                                                        <SliderRange
                                                                            className={
                                                                                isPartialWithdrawalDisabled
                                                                                    ? 'disabled'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            10%
                                                                        </SliderRange>
                                                                        <SliderRange
                                                                            className={
                                                                                isPartialWithdrawalDisabled
                                                                                    ? 'disabled'
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            90%
                                                                        </SliderRange>
                                                                    </FlexDivRow>
                                                                </SliderContainer>
                                                                <ContentInfo>
                                                                    <Trans
                                                                        i18nKey="staking.amm-lp.withdrawal-amount-label"
                                                                        components={{
                                                                            bold: <BoldContent />,
                                                                        }}
                                                                        values={{
                                                                            amount: formatCurrencyWithSign(
                                                                                USD_SIGN,
                                                                                withdrawalAmount
                                                                            ),
                                                                        }}
                                                                    />
                                                                    <Tooltip
                                                                        overlay={t(
                                                                            `staking.amm-lp.estimated-amount-tooltip`
                                                                        )}
                                                                        iconFontSize={14}
                                                                        marginLeft={2}
                                                                        top={-1}
                                                                    />
                                                                </ContentInfo>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                        <ButtonContainer>{getWithdrawSubmitButton()}</ButtonContainer>
                                    </>
                                )}
                                {liquidityPoolData &&
                                    userLiquidityPoolData &&
                                    userLiquidityPoolData.isWithdrawalRequested && (
                                        <>
                                            <ContentInfo>
                                                <Trans
                                                    i18nKey={`staking.amm-lp.${
                                                        userLiquidityPoolData.isPartialWithdrawalRequested
                                                            ? 'partial'
                                                            : 'full'
                                                    }-withdrawal-requested-message`}
                                                    components={{
                                                        bold: <BoldContent />,
                                                        tooltip: (
                                                            <Tooltip
                                                                overlay={t(`staking.amm-lp.estimated-amount-tooltip`)}
                                                                iconFontSize={14}
                                                                marginLeft={2}
                                                                top={-1}
                                                            />
                                                        ),
                                                    }}
                                                    values={{
                                                        amount: formatCurrencyWithSign(
                                                            USD_SIGN,
                                                            userLiquidityPoolData.withdrawalAmount
                                                        ),
                                                        percentage: formatPercentage(
                                                            userLiquidityPoolData.withdrawalShare
                                                        ),
                                                    }}
                                                />
                                            </ContentInfo>
                                            <ContentInfo>
                                                <Trans i18nKey="staking.amm-lp.withdrawal-requested-message" />
                                            </ContentInfo>
                                        </>
                                    )}
                            </>
                        )}
                    </SectionContentContainer>
                </Bottom>
            </Container>
            <ChartsContainer>
                {liquidityPoolData && (
                    <PnL
                        liquidityPool={paramTab}
                        lifetimePnl={liquidityPoolData.lifetimePnl}
                        type={LiquidityPoolPnlType.PNL_PER_ROUND}
                    />
                )}
                <FlexDiv>
                    {liquidityPoolData && (
                        <PnL
                            liquidityPool={paramTab}
                            lifetimePnl={liquidityPoolData.lifetimePnl}
                            type={LiquidityPoolPnlType.CUMULATIVE_PNL}
                        />
                    )}
                    <LPInfo>
                        {liquidityPoolData && (
                            <>
                                <LiquidityPoolInfoTitle>{t('staking.amm-lp.total-info-label')}</LiquidityPoolInfoTitle>
                                <span>
                                    <Trans
                                        i18nKey="staking.amm-lp.users-in-liquidity-pool-label"
                                        values={{
                                            number: liquidityPoolData.usersCurrentlyInLiquidityPool,
                                            max: liquidityPoolData.maxAllowedUsers,
                                        }}
                                    />
                                </span>
                                <LiquidityPoolFilledGraphicContainer>
                                    <LiquidityPoolFilledGraphicPercentage
                                        width={liquidityPoolData.allocationNextRoundPercentage}
                                    ></LiquidityPoolFilledGraphicPercentage>
                                </LiquidityPoolFilledGraphicContainer>
                                <LiquidityPoolFilledText>
                                    <span>{`${formatCurrencyWithSign(
                                        USD_SIGN,
                                        liquidityPoolData.allocationNextRound
                                    )} / ${formatCurrencyWithSign(
                                        USD_SIGN,
                                        liquidityPoolData.maxAllowedDeposit
                                    )}`}</span>
                                    <span>
                                        <Trans
                                            i18nKey="staking.amm-lp.your-share-label"
                                            values={{
                                                percentage: formatPercentage(
                                                    (userLiquidityPoolData ? userLiquidityPoolData.balanceTotal : 0) /
                                                        liquidityPoolData.allocationNextRound
                                                ),
                                            }}
                                        />
                                    </span>
                                </LiquidityPoolFilledText>
                            </>
                        )}
                        <LiquidityPoolInfoTitle>{t('staking.amm-lp.your-info-label')}</LiquidityPoolInfoTitle>
                        {liquidityPoolData?.liquidityPoolStarted && (
                            <LiquidityPoolInfoContainer>
                                <LiquidityPoolInfoLabel>
                                    {t('staking.amm-lp.current-balance-label')}:
                                </LiquidityPoolInfoLabel>
                                <LiquidityPoolInfoGraphic
                                    background={'linear-gradient(90.21deg, #A40A95 0.18%, #FC6679 99.82%)'}
                                    widthPercentage={infoGraphicPercentages.currentBalancePercenatage}
                                />
                                <LiquidityPoolInfo>
                                    {formatCurrencyWithSign(
                                        USD_SIGN,
                                        userLiquidityPoolData ? userLiquidityPoolData.balanceCurrentRound : 0
                                    )}
                                </LiquidityPoolInfo>
                            </LiquidityPoolInfoContainer>
                        )}
                        <LiquidityPoolInfoContainer>
                            <LiquidityPoolInfoLabel>
                                {t('staking.amm-lp.next-round-balance-label')}:
                            </LiquidityPoolInfoLabel>
                            <LiquidityPoolInfoGraphic
                                background={'linear-gradient(90deg, #2A3895 0%, #893CE2 100%)'}
                                widthPercentage={infoGraphicPercentages.nextRoundBalancePercenatage}
                            />
                            <LiquidityPoolInfo>
                                {formatCurrencyWithSign(
                                    USD_SIGN,
                                    userLiquidityPoolData ? userLiquidityPoolData.balanceTotal : 0
                                )}
                                {userLiquidityPoolData &&
                                    userLiquidityPoolData.balanceCurrentRound > 0 &&
                                    userLiquidityPoolData.balanceTotal > 0 && (
                                        <Tooltip
                                            overlay={t(`staking.amm-lp.estimated-amount-tooltip`)}
                                            iconFontSize={14}
                                            marginLeft={2}
                                            top={-1}
                                        />
                                    )}
                            </LiquidityPoolInfo>
                        </LiquidityPoolInfoContainer>
                        <LiquidityPoolInfoContainer>
                            <LiquidityPoolInfoLabel>{t('staking.amm-lp.max-allowance-label')}:</LiquidityPoolInfoLabel>
                            <LiquidityPoolInfoGraphic
                                background={'linear-gradient(270deg, #3AECD3 0%, #017F9C 100%)'}
                                widthPercentage={infoGraphicPercentages.maxAllowancePercenatage}
                            />
                            <LiquidityPoolInfo>
                                {formatCurrencyWithSign(
                                    USD_SIGN,
                                    userLiquidityPoolData ? userLiquidityPoolData.maxDeposit : 0
                                )}
                                <Tooltip
                                    overlay={
                                        <MaxAllowanceTooltip
                                            stakedThales={
                                                userLiquidityPoolData ? userLiquidityPoolData.stakedThales : 0
                                            }
                                            stakedThalesMultiplier={liquidityPoolData?.stakedThalesMultiplier || 0}
                                        />
                                    }
                                    overlayClassName="lp-max-allowance"
                                    iconFontSize={14}
                                    marginLeft={2}
                                    top={-1}
                                />
                            </LiquidityPoolInfo>
                        </LiquidityPoolInfoContainer>
                        {isWithdrawalRequested && (
                            <WarningContentInfo>
                                <Trans
                                    i18nKey={`staking.amm-lp.${
                                        userLiquidityPoolData.isPartialWithdrawalRequested ? 'partial' : 'full'
                                    }-withdrawal-request-label`}
                                    components={{
                                        tooltip: (
                                            <Tooltip
                                                overlay={t(`staking.amm-lp.estimated-amount-tooltip`)}
                                                iconFontSize={14}
                                                marginLeft={2}
                                                top={-1}
                                            />
                                        ),
                                    }}
                                    values={{
                                        amount: formatCurrencyWithSign(
                                            USD_SIGN,
                                            userLiquidityPoolData ? userLiquidityPoolData.withdrawalAmount : 0
                                        ),
                                        percentage: formatPercentage(
                                            userLiquidityPoolData ? userLiquidityPoolData.withdrawalShare : 0
                                        ),
                                    }}
                                />
                            </WarningContentInfo>
                        )}
                    </LPInfo>
                </FlexDiv>
            </ChartsContainer>
            <YourTransactions liquidityPool={paramTab} currentRound={liquidityPoolData?.round || 0} />
            {openApprovalModal && (
                <ApprovalModal
                    defaultAmount={amount}
                    tokenSymbol={collateral}
                    isAllowing={isAllowing}
                    onSubmit={handleAllowance}
                    onClose={() => setOpenApprovalModal(false)}
                />
            )}
        </Suspense>
    );
};

const LiquidityPoolInfoTitle = styled.div`
    color: ${(props) => props.theme.textColor.primary};
    text-align: center;
    white-space: nowrap;
    font-weight: 400;
    font-size: 18px;
    line-height: 100%;
    margin-top: 10px;
    margin-bottom: 15px;
`;

export const ExternalButton = styled.a`
    background: ${(props) => props.theme.button.background.primary};
    margin-top: 5px;
    border-radius: 30px;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
    color: ${(props) => props.theme.button.textColor.primary};
    width: 100%;
    border: none;
    padding: 3px;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    height: 26px;
`;

const ButtonContainer = styled(FlexDivCentered)`
    width: 100%;
`;

const LiquidityPoolInfoContainer = styled(FlexDivStart)`
    align-items: center;
    margin-bottom: 10px;
`;

const LiquidityPoolInfoLabel = styled.span`
    white-space: nowrap;
    margin-right: 6px;
    width: 140px;
`;

const LiquidityPoolInfoGraphic = styled(FlexDivStart)<{ background: string; widthPercentage: number }>`
    width: ${(props) => 170 * props.widthPercentage}px;
    height: 14px;
    background: ${(props) => props.background};
    border-radius: 9px;
    margin-right: ${(props) => (props.widthPercentage === 0 ? 0 : 6)}px;
    @media (max-width: 1199px) {
        width: ${(props) => 150 * props.widthPercentage}px;
    }
    @media (max-width: 991px) {
        width: ${(props) => 120 * props.widthPercentage}px;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: ${(props) => 200 * props.widthPercentage}px;
    }
    @media (max-width: 575px) {
        width: ${(props) => 120 * props.widthPercentage}px;
    }
`;

const LiquidityPoolInfo = styled.span`
    white-space: nowrap;
`;

const ContentInfo = styled.p`
    padding: 10px 0;
    text-align: center;
`;

const WarningContentInfo = styled(ContentInfo)`
    margin-top: 5px;
    color: ${(props) => props.theme.warning.textColor.primary};
    i {
        color: ${(props) => props.theme.warning.textColor.primary};
    }
`;

const LiquidityPoolFilledText = styled(FlexDivRow)`
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
`;

const LiquidityPoolFilledGraphicContainer = styled(FlexDivStart)`
    position: relative;
    width: 100%;
    height: 14px;
    background: ${(props) => props.theme.background.secondary};
    border-radius: 9px;
    margin-top: 10px;
`;

const LiquidityPoolFilledGraphicPercentage = styled(FlexDivStart)<{ width: number }>`
    position: absolute;
    width: ${(props) => props.width}%;
    transition: width 1s linear;
    max-width: 100%;
    height: 10px;
    left: 2px;
    top: 2px;
    background: linear-gradient(269.97deg, #ff774c 16.18%, #b50a5e 77.77%);
    border-radius: 9px;
`;

const getInfoGraphicPercentages = (currentBalance: number, nextRoundBalance: number, maxAllowance: number) => {
    let currentBalancePercenatage = 1;
    let nextRoundBalancePercenatage = 1;
    let maxAllowancePercenatage = 1;

    if (maxAllowance > currentBalance && maxAllowance > nextRoundBalance) {
        currentBalancePercenatage = currentBalance / maxAllowance;
        nextRoundBalancePercenatage = nextRoundBalance / maxAllowance;
    } else if (currentBalance > nextRoundBalance) {
        maxAllowancePercenatage = maxAllowance / currentBalance;
        nextRoundBalancePercenatage = nextRoundBalance / currentBalance;
    } else if (nextRoundBalance === 0) {
        currentBalancePercenatage = 0;
        nextRoundBalancePercenatage = 0;
        maxAllowancePercenatage = 0;
    } else {
        maxAllowancePercenatage = maxAllowance / nextRoundBalance;
        currentBalancePercenatage = currentBalance / nextRoundBalance;
    }

    return {
        currentBalancePercenatage,
        nextRoundBalancePercenatage,
        maxAllowancePercenatage,
    };
};

const LPInfo = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    padding: 10px;
`;

const getUniswapLink = (networkId: Network) => {
    if (networkId === Network.Arbitrum) return LINKS.Token.UniswapBuyThalesArbitrum;
    if (networkId === Network.Base) return LINKS.Token.UniswapBuyThalesBase;
    return LINKS.Token.UniswapBuyThalesOp;
};

const BoldContent = styled.span`
    font-weight: 600;
`;

const RadioButtonContainer = styled(FlexDivColumnCentered)`
    align-items: center;
    label {
        text-transform: uppercase;
    }
`;

export const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 0 5px;
    margin-bottom: 10px;
`;

export const StyledSlider = styled((props) => (
    <Slider
        classes={{ root: props.className, thumb: props.className, track: props.className, rail: props.className }}
        {...props}
    />
))`
    &.MuiSlider-root {
        color: ${(props) => props.theme.textColor.quaternary};
        padding: 6px 0 10px 0;

        &.Mui-disabled {
            color: ${(props) => props.theme.textColor.quaternary};
            opacity: 0.5;
        }
    }

    &.MuiSlider-thumb {
        width: 14px;
        height: 14px;
        margin-top: -2px;
        background: ${(props) => props.theme.textColor.primary};
        box-shadow: none;

        &:focus,
        &:hover {
            box-shadow: none;
        }

        &.Mui-disabled {
            width: 14px;
            height: 14px;
            margin-top: -2px;
            margin-left: -6px;
            box-shadow: none;
            outline: 0;
        }
    }

    &.MuiSlider-track {
        height: 10px;
        border-radius: 10px;
    }

    &.MuiSlider-rail {
        height: 10px;
        border-radius: 10px;
    }
`;

const SliderRange = styled.div`
    font-size: 13px;
    line-height: 13px;
    letter-spacing: 0.4px;
    color: ${(props) => props.theme.link.textColor.primary};
    &.disabled {
        opacity: 0.4;
        cursor: default;
    }
`;

export default AMMLP;
