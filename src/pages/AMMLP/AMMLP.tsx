import { Slider } from '@material-ui/core';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import ApprovalModal from 'components/ApprovalModal';
import Collapse from 'components/Collapse';
import NumericInput from 'components/fields/NumericInput';
import RadioButton from 'components/fields/RadioButton';
import Loader from 'components/Loader';
import LoadingContainer from 'components/LoadingContainer';
import { NavItemType } from 'components/NavLinks/NavItem';
import NavLinks from 'components/NavLinks/NavLinks';
import SPAAnchor from 'components/SPAAnchor';
import SwitchInput from 'components/SwitchInput';
import TimeRemaining from 'components/TimeRemaining';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import Tooltip from 'components/Tooltip';
import { PLAUSIBLE, PLAUSIBLE_KEYS } from 'constants/analytics';
import { DEFAULT_COLLATERALS, USD_SIGN } from 'constants/currency';
import LINKS from 'constants/links';
import { LiquidityPoolMap } from 'constants/liquidityPoolV2';
import ROUTES from 'constants/routes';
import { LiquidityPool, LiquidityPoolPnlType } from 'enums/liquidityPool';
import { Network } from 'enums/network';
import { BigNumber, Contract, ethers } from 'ethers';
import useLiquidityPoolV2DataQuery from 'queries/liquidityPool/useLiquidityPoolV2DataQuery';
import useLiquidityPoolV2UserDataQuery from 'queries/liquidityPool/useLiquidityPoolV2UserDataQuery';
import useParlayLiquidityPoolDataQuery from 'queries/liquidityPool/useParlayAmmLiquidityPoolDataQuery';
import useParlayLiquidityPoolUserDataQuery from 'queries/liquidityPool/useParlayAmmLiquidityPoolUserDataQuery';
import useSportsAmmLiquidityPoolDataQuery from 'queries/liquidityPool/useSportsAmmLiquidityPoolDataQuery';
import useSportsAmmLiquidityPoolUserDataQuery from 'queries/liquidityPool/useSportsAmmLiquidityPoolUserDataQuery';
import useThalesLiquidityPoolDataQuery from 'queries/liquidityPool/useThalesLiquidityPoolDataQuery';
import useThalesLiquidityPoolUserDataQuery from 'queries/liquidityPool/useThalesLiquidityPoolUserDataQuery';
import useMultipleCollateralBalanceQuery from 'queries/walletBalances.ts/useMultipleCollateralBalanceQuery';
import queryString from 'query-string';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getIsAppReady } from 'redux/modules/app';
import { getIsMobile } from 'redux/modules/ui';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled, { useTheme } from 'styled-components';
import {
    FlexDiv,
    FlexDivCentered,
    FlexDivColumn,
    FlexDivColumnSpaceBetween,
    FlexDivRow,
    FlexDivSpaceAround,
    FlexDivSpaceBetween,
    Line,
    NavContainer,
} from 'styles/common';
import {
    coinParser,
    Coins,
    formatCurrencyWithKey,
    formatCurrencyWithSign,
    formatPercentage,
    NetworkId,
    Coins as UtilsCoins,
} from 'thales-utils';
import { LiquidityPoolData, UserLiquidityPoolData } from 'types/liquidityPool';
import liquidityPoolV2Contract from 'utils/contracts/liquidityPoolContractV2';
import { checkAllowance, hasV2Pools } from 'utils/network';
import networkConnector from 'utils/networkConnector';
import { refetchLiquidityPoolData } from 'utils/queryConnector';
import { buildHref } from 'utils/routes';
import { delay } from 'utils/timer';
import PnL from './PnL';
import {
    Bottom,
    ChartsContainer,
    CloseRoundButton,
    Container,
    InfoDiv,
    InputContainer,
    RoundEnd,
    RoundEndContainer,
    RoundEndLabel,
    RoundInfo,
    RoundInfoContainer,
    SectionContentContainer,
    SectionDescription,
    SectionTitle,
    StakingButton,
    SwitchContainer,
    Top,
} from './styled-components';
import YourTransactions from './Transactions';

const AMMLP: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const isMobile = useSelector((state: RootState) => getIsMobile(state));

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

    const locationTab = queryString.parse(location.search).tab as LiquidityPool;
    const paramTab: LiquidityPool =
        locationTab === LiquidityPool.OVERTIME_USDC ||
        locationTab === LiquidityPool.OVERTIME_WETH ||
        locationTab === LiquidityPool.OVERTIME_THALES
            ? networkId === Network.Base
                ? LiquidityPool.THALES
                : locationTab || LiquidityPool.THALES
            : locationTab || LiquidityPool.THALES;

    const navItems: NavItemType[] = useMemo(() => {
        if (networkId === NetworkId.OptimismMainnet || networkId === NetworkId.Arbitrum) {
            return [
                {
                    href: `${buildHref(ROUTES.AmmLP.Home)}?tab=${LiquidityPool.THALES}`,
                    title: t('amm-lp.nav.thales'),
                    active: paramTab === LiquidityPool.THALES,
                },
                {
                    href: `${buildHref(ROUTES.AmmLP.Home)}?tab=${LiquidityPool.OVERTIME_USDC}`,
                    title: t('amm-lp.nav.overtime-usdc'),
                    active: paramTab === LiquidityPool.OVERTIME_USDC,
                },
                {
                    href: `${buildHref(ROUTES.AmmLP.Home)}?tab=${LiquidityPool.OVERTIME_WETH}`,
                    title: t('amm-lp.nav.overtime-weth'),
                    active: paramTab === LiquidityPool.OVERTIME_WETH,
                },
                {
                    href: `${buildHref(ROUTES.AmmLP.Home)}?tab=${LiquidityPool.OVERTIME_THALES}`,
                    title: t('amm-lp.nav.overtime-thales'),
                    active: paramTab === LiquidityPool.OVERTIME_THALES,
                },
                {
                    href: `${buildHref(ROUTES.AmmLP.Home)}?tab=${LiquidityPool.OVERTIME_SINGLE}`,
                    title: t('amm-lp.nav.overtime-single'),
                    active: paramTab === LiquidityPool.OVERTIME_SINGLE,
                    deprecated: t('amm-lp.nav.deprecated'),
                },
                {
                    href: `${buildHref(ROUTES.AmmLP.Home)}?tab=${LiquidityPool.OVERTIME_PARLAY}`,
                    title: t('amm-lp.nav.overtime-parlay'),
                    active: paramTab === LiquidityPool.OVERTIME_PARLAY,
                    deprecated: t('amm-lp.nav.deprecated'),
                },
            ];
        }
        return [
            {
                href: `${buildHref(ROUTES.AmmLP.Home)}?tab=${LiquidityPool.THALES}`,
                title: t('amm-lp.nav.thales'),
                active: paramTab === LiquidityPool.THALES,
            },
            {
                href: `${buildHref(ROUTES.AmmLP.Home)}?tab=${LiquidityPool.OVERTIME_SINGLE}`,
                title: t('amm-lp.nav.overtime-single'),
                active: paramTab === LiquidityPool.OVERTIME_SINGLE,
                deprecated: t('amm-lp.nav.deprecated'),
            },
            {
                href: `${buildHref(ROUTES.AmmLP.Home)}?tab=${LiquidityPool.OVERTIME_PARLAY}`,
                title: t('amm-lp.nav.overtime-parlay'),
                active: paramTab === LiquidityPool.OVERTIME_PARLAY,
                deprecated: t('amm-lp.nav.deprecated'),
            },
        ];
    }, [networkId, paramTab, t]);

    const isV2Pool = useMemo(() => {
        return (
            paramTab === LiquidityPool.OVERTIME_USDC ||
            paramTab === LiquidityPool.OVERTIME_WETH ||
            paramTab === LiquidityPool.OVERTIME_THALES
        );
    }, [paramTab]);
    const V2Pool =
        isV2Pool && hasV2Pools(networkId)
            ? LiquidityPoolMap[networkId as Network.Arbitrum | Network.OptimismMainnet][paramTab]
            : LiquidityPoolMap[NetworkId.OptimismMainnet][LiquidityPool.OVERTIME_USDC];

    const collateral =
        isV2Pool && (networkId === NetworkId.OptimismMainnet || networkId === NetworkId.Arbitrum)
            ? V2Pool?.collateral || DEFAULT_COLLATERALS[networkId]
            : DEFAULT_COLLATERALS[networkId];

    const multipleCollateralBalanceQuery = useMultipleCollateralBalanceQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    useEffect(() => {
        if (multipleCollateralBalanceQuery.isSuccess && multipleCollateralBalanceQuery.data !== undefined) {
            setPaymentTokenBalance(Number(multipleCollateralBalanceQuery.data[collateral]));
        }
    }, [multipleCollateralBalanceQuery.isSuccess, multipleCollateralBalanceQuery.data, collateral]);

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

    const liquidityPoolV2DataQuery = useLiquidityPoolV2DataQuery(
        V2Pool?.address || '',
        collateral as UtilsCoins,
        networkId,
        {
            enabled: isAppReady && isV2Pool,
        }
    );

    const liquidityPoolV2UserDataQuery = useLiquidityPoolV2UserDataQuery(
        V2Pool?.address || '',
        collateral as UtilsCoins,
        walletAddress,
        networkId,
        {
            enabled: isAppReady && isV2Pool,
        }
    );

    const activePoolDataQuery = useMemo(() => {
        if (paramTab === LiquidityPool.THALES) {
            return thalesLiquidityPoolDataQuery;
        }
        if (paramTab === LiquidityPool.OVERTIME_SINGLE) {
            return sportsAmmLiquidityPoolDataQuery;
        }
        if (paramTab === LiquidityPool.OVERTIME_PARLAY) {
            return parlayLiquidityPoolDataQuery;
        }
        return liquidityPoolV2DataQuery;
    }, [
        paramTab,
        parlayLiquidityPoolDataQuery,
        sportsAmmLiquidityPoolDataQuery,
        thalesLiquidityPoolDataQuery,
        liquidityPoolV2DataQuery,
    ]);

    const activeUserPoolDataQuery = useMemo(() => {
        if (paramTab === LiquidityPool.THALES) {
            return thalesUserLiquidityPoolDataQuery;
        }
        if (paramTab === LiquidityPool.OVERTIME_SINGLE) {
            return sportsAmmUserLiquidityPoolDataQuery;
        }
        if (paramTab === LiquidityPool.OVERTIME_PARLAY) {
            return parlayUserLiquidityPoolDataQuery;
        }
        return liquidityPoolV2UserDataQuery;
    }, [
        liquidityPoolV2UserDataQuery,
        paramTab,
        parlayUserLiquidityPoolDataQuery,
        sportsAmmUserLiquidityPoolDataQuery,
        thalesUserLiquidityPoolDataQuery,
    ]);

    useEffect(() => {
        if (activePoolDataQuery.isSuccess && activePoolDataQuery.data) {
            setLiquidityPoolData(activePoolDataQuery.data);
        }
    }, [activePoolDataQuery.isSuccess, activePoolDataQuery.data]);

    useEffect(() => {
        if (activeUserPoolDataQuery.isSuccess && activeUserPoolDataQuery.data) {
            setUserLiquidityPoolData(activeUserPoolDataQuery.data);
        }
    }, [activeUserPoolDataQuery.isSuccess, activeUserPoolDataQuery.data]);

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
    const isMaximumAmountOfUsersReached =
        liquidityPoolData &&
        liquidityPoolData.usersCurrentlyInLiquidityPool === liquidityPoolData.maxAllowedUsers &&
        userLiquidityPoolData &&
        !userLiquidityPoolData.hasDepositForCurrentRound &&
        !userLiquidityPoolData.hasDepositForNextRound;
    const isLiquidityPoolCapReached = liquidityPoolData && liquidityPoolData.allocationNextRoundPercentage >= 100;

    const isWithdrawalRequested = userLiquidityPoolData && userLiquidityPoolData.isWithdrawalRequested;

    const isDepositButtonDisabled =
        !isWalletConnected ||
        !isAmountEntered ||
        insufficientBalance ||
        isSubmitting ||
        isWithdrawalRequested ||
        exceededLiquidityPoolCap ||
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
            return networkConnector.thalesLiquidityPoolContract;
        }
        if (paramTab === LiquidityPool.OVERTIME_SINGLE) {
            return networkConnector.sportLiquidityPoolContract;
        }
        if (paramTab === LiquidityPool.OVERTIME_PARLAY) {
            return networkConnector.parlayAMMLiquidityPoolContract;
        }
        if (
            paramTab === LiquidityPool.OVERTIME_USDC ||
            paramTab === LiquidityPool.OVERTIME_WETH ||
            paramTab === LiquidityPool.OVERTIME_THALES
        ) {
            return new Contract(
                // @ts-ignore
                LiquidityPoolMap[networkId][paramTab].address,
                liquidityPoolV2Contract,
                networkConnector.signer
            );
        }
    }, [networkId, paramTab]);

    useEffect(() => {
        const { signer, multipleCollateral } = networkConnector;
        if (signer && multipleCollateral && activeLiquidityPoolContract) {
            const collateralWithSigner = multipleCollateral[collateral as Coins]?.connect(signer);
            const getAllowance = async () => {
                try {
                    const parsedAmount = coinParser(Number(amount).toString(), networkId, collateral as UtilsCoins);
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
    }, [
        walletAddress,
        isWalletConnected,
        hasAllowance,
        amount,
        isAllowing,
        networkId,
        activeLiquidityPoolContract,
        collateral,
    ]);

    const handleAllowance = async (approveAmount: BigNumber) => {
        const { signer, multipleCollateral } = networkConnector;
        if (signer && multipleCollateral && activeLiquidityPoolContract) {
            const id = toast.loading(getDefaultToastContent(t('common.transaction-pending')), getLoadingToastOptions());
            setIsAllowing(true);

            try {
                const collateralWithSigner = multipleCollateral[collateral as Coins]?.connect(signer);

                const tx = (await collateralWithSigner?.approve(
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
        const { signer } = networkConnector;
        if (signer && activeLiquidityPoolContract) {
            const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
            setIsSubmitting(true);
            try {
                const liquidityPoolContractWithSigner = activeLiquidityPoolContract.connect(signer);
                const parsedPercentage = ethers.utils.parseEther((Number(withdrawalPercentage) / 100).toString());

                const tx = withdrawAll
                    ? await liquidityPoolContractWithSigner.withdrawalRequest()
                    : await liquidityPoolContractWithSigner.partialWithdrawalRequest(parsedPercentage);
                const txResult = await tx.wait();

                if (txResult && txResult.events) {
                    toast.update(id, getSuccessToastOptions(t('common.transaction.successful'), id));
                    setAmount('');
                    setIsSubmitting(false);
                    refetchLiquidityPoolData(walletAddress, networkId, paramTab, liquidityPoolData?.round);
                }
            } catch (e) {
                console.log(e);
                toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
                setIsSubmitting(false);
            }
        }
    };

    const handleDeposit = async () => {
        const { signer } = networkConnector;
        if (signer && activeLiquidityPoolContract) {
            const id = toast.loading(getDefaultToastContent(t('common.transaction-pending')), getLoadingToastOptions());
            setIsSubmitting(true);
            try {
                const liquidityPoolContractWithSigner = activeLiquidityPoolContract.connect(signer);
                const parsedAmount = coinParser(Number(amount).toString(), networkId, collateral as UtilsCoins);

                const tx = await liquidityPoolContractWithSigner.deposit(parsedAmount);
                const txResult = await tx.wait();

                if (txResult && txResult.events) {
                    toast.update(id, getSuccessToastOptions(t('common.transaction.successful'), id));
                    if (paramTab === LiquidityPool.THALES) {
                        PLAUSIBLE.trackEvent(PLAUSIBLE_KEYS.depositDigitalOptionsLp);
                    }
                    if (paramTab === LiquidityPool.OVERTIME_SINGLE) {
                        PLAUSIBLE.trackEvent(PLAUSIBLE_KEYS.depositOvertimeSingleLp);
                    }
                    if (paramTab === LiquidityPool.OVERTIME_PARLAY) {
                        PLAUSIBLE.trackEvent(PLAUSIBLE_KEYS.depositOvertimeParlayLp);
                    }
                    setAmount('');
                    setIsSubmitting(false);
                    refetchLiquidityPoolData(walletAddress, networkId, paramTab, liquidityPoolData?.round);
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
        setAmount(Math.trunc(paymentTokenBalance ? Number(paymentTokenBalance) * 100 : 0) / 100);
    };

    const closeRound = async () => {
        const id = toast.loading(getDefaultToastContent(t('staking.amm-lp.closing-round')), getLoadingToastOptions());
        setIsSubmitting(true);
        try {
            const { signer } = networkConnector;

            if (signer && activeLiquidityPoolContract) {
                const lpContractWithSigner = activeLiquidityPoolContract.connect(signer);

                const canCloseCurrentRound = await lpContractWithSigner?.canCloseCurrentRound();
                const roundClosingPrepared = await lpContractWithSigner?.roundClosingPrepared();

                let getUsersCountInCurrentRound = await lpContractWithSigner?.getUsersCountInCurrentRound();
                let usersProcessedInRound = await lpContractWithSigner?.usersProcessedInRound();
                if (canCloseCurrentRound) {
                    try {
                        if (!roundClosingPrepared) {
                            const tx = await lpContractWithSigner.prepareRoundClosing({
                                type: 2,
                            });
                            await tx.wait().then(() => {
                                console.log('prepareRoundClosing closed');
                            });
                            await delay(1000 * 2);
                        }

                        while (usersProcessedInRound < getUsersCountInCurrentRound) {
                            const tx = await lpContractWithSigner.processRoundClosingBatch(100, {
                                type: 2,
                            });
                            await tx.wait().then(() => {
                                console.log('processRoundClosingBatch for batch done');
                            });
                            await delay(1000 * 2);
                            getUsersCountInCurrentRound = await lpContractWithSigner.getUsersCountInCurrentRound();
                            usersProcessedInRound = await lpContractWithSigner.usersProcessedInRound();
                        }

                        const tx = await lpContractWithSigner.closeRound({
                            type: 2,
                        });
                        await tx.wait().then(() => {
                            console.log('Round closed');
                        });

                        toast.update(id, getSuccessToastOptions(t('staking.amm-lp.round-successfully-closed'), id));
                        setIsSubmitting(false);
                    } catch (e) {
                        toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
                        setIsSubmitting(false);
                        console.log(e);
                    }
                }
            }
        } catch (e) {
            console.log('E ', e);
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsSubmitting(false);
        }
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
            {!isMobile && <Line />}
            {!isMobile && (
                <NavContainer width={networkId === Network.Base ? '40%' : '80%'}>
                    <NavLinks items={navItems} />
                </NavContainer>
            )}
            {liquidityPoolPaused ? (
                <RoundInfoContainer>
                    <RoundInfo>{t('staking.amm-lp.liquidity-pool-paused-message')}</RoundInfo>
                </RoundInfoContainer>
            ) : liquidityPoolData?.liquidityPoolStarted ? (
                <>
                    <RoundEndContainer>
                        <FlexDivCentered gap="10px">
                            <RoundEndLabel>{t('staking.amm-lp.round-end-label')}:</RoundEndLabel>
                            <RoundEnd>
                                {liquidityPoolData.isRoundEnded ? (
                                    t('staking.amm-lp.round-ended-label')
                                ) : (
                                    <TimeRemaining
                                        end={liquidityPoolData.roundEndTime}
                                        fontSize={20}
                                        showFullCounter
                                        textColor="white"
                                    />
                                )}
                            </RoundEnd>
                        </FlexDivCentered>
                        {liquidityPoolData.canCloseCurrentRound && (
                            <CloseRoundButton disabled={isSubmitting} onClick={closeRound}>
                                {t('staking.amm-lp.button.close-round')}
                            </CloseRoundButton>
                        )}
                    </RoundEndContainer>
                </>
            ) : (
                <RoundInfoContainer>
                    <RoundInfo>{t('staking.amm-lp.liquidity-pool-not-started-message')}</RoundInfo>
                </RoundInfoContainer>
            )}
            <Container>
                <Top>
                    <LoadingContainer isLoading={multipleCollateralBalanceQuery.isLoading}>
                        <SwitchContainer>
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
                        </SwitchContainer>

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
                                                    insufficientBalance || !!exceededLiquidityPoolCap || !!invalidAmount
                                                }
                                                balance={
                                                    isWalletConnected
                                                        ? `${t('common.balance')}: ${formatCurrencyWithKey(
                                                              collateral,
                                                              paymentTokenBalance
                                                          )}`
                                                        : undefined
                                                }
                                                validationMessage={
                                                    t(
                                                        `${
                                                            insufficientBalance
                                                                ? 'common.errors.insufficient-balance'
                                                                : exceededLiquidityPoolCap
                                                                ? 'staking.amm-lp.deposit-liquidity-pool-cap-error'
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
                                                                <WithdrawalContainer>
                                                                    <ContentInfo color="white">
                                                                        <Trans
                                                                            i18nKey="staking.amm-lp.available-to-withdraw-label"
                                                                            components={{
                                                                                bold: <BoldContent />,
                                                                            }}
                                                                            values={{
                                                                                amount: formatCurrencyWithSign(
                                                                                    isV2Pool ? collateral : USD_SIGN,
                                                                                    userLiquidityPoolData.balanceCurrentRound
                                                                                ),
                                                                            }}
                                                                        />
                                                                        <Tooltip
                                                                            overlay={
                                                                                <span>
                                                                                    {t(
                                                                                        `staking.amm-lp.estimated-amount-tooltip`
                                                                                    )}
                                                                                </span>
                                                                            }
                                                                            iconFontSize={14}
                                                                            marginLeft={3}
                                                                            top={2}
                                                                        />
                                                                    </ContentInfo>
                                                                    <ContentInfo color="#BCBCBC">
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
                                                                    <ContentInfo color="white">
                                                                        <Trans
                                                                            i18nKey="staking.amm-lp.withdrawal-amount-label"
                                                                            components={{
                                                                                bold: <BoldContent />,
                                                                            }}
                                                                            values={{
                                                                                amount: formatCurrencyWithSign(
                                                                                    isV2Pool ? collateral : USD_SIGN,
                                                                                    withdrawalAmount
                                                                                ),
                                                                            }}
                                                                        />
                                                                        <Tooltip
                                                                            overlay={t(
                                                                                `staking.amm-lp.estimated-amount-tooltip`
                                                                            )}
                                                                            iconFontSize={14}
                                                                            marginLeft={3}
                                                                            top={2}
                                                                        />
                                                                    </ContentInfo>
                                                                </WithdrawalContainer>
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
                                                                    overlay={t(
                                                                        `staking.amm-lp.estimated-amount-tooltip`
                                                                    )}
                                                                    iconFontSize={14}
                                                                    marginLeft={2}
                                                                    top={-1}
                                                                />
                                                            ),
                                                        }}
                                                        values={{
                                                            amount: formatCurrencyWithSign(
                                                                isV2Pool ? collateral : USD_SIGN,
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
                    </LoadingContainer>
                </Top>
            </Container>
            <ChartsContainer>
                <LoadingContainer isLoading={!!activePoolDataQuery?.isLoading || !!activeUserPoolDataQuery?.isLoading}>
                    <FlexDiv gap="20px">
                        {liquidityPoolData && (
                            <PnL
                                liquidityPool={paramTab}
                                lifetimePnl={liquidityPoolData.lifetimePnl}
                                type={LiquidityPoolPnlType.CUMULATIVE_PNL}
                            />
                        )}
                        <LPInfo>
                            {liquidityPoolData && (
                                <div>
                                    <LiquidityPoolInfoTitle>
                                        {t('staking.amm-lp.total-info-label')}
                                    </LiquidityPoolInfoTitle>
                                    <LiquidityPoolFilledText>
                                        <div>
                                            <div>{t('staking.amm-lp.pool-size')}</div>
                                            <span>
                                                {formatCurrencyWithSign(
                                                    isV2Pool ? collateral : USD_SIGN,
                                                    liquidityPoolData.allocationNextRound
                                                )}
                                            </span>
                                        </div>
                                        <div>
                                            <div>{t('staking.amm-lp.users-in-pool')}</div>
                                            <span>{`${liquidityPoolData.usersCurrentlyInLiquidityPool} / ${liquidityPoolData.maxAllowedUsers}`}</span>
                                        </div>
                                    </LiquidityPoolFilledText>
                                </div>
                            )}
                            <div>
                                <LiquidityPoolInfoTitle>{t('staking.amm-lp.your-info-label')}</LiquidityPoolInfoTitle>
                                {liquidityPoolData?.liquidityPoolStarted && (
                                    <>
                                        <LiquidityPoolInfoContainer>
                                            <LiquidityPoolInfoLabel>
                                                {t('staking.amm-lp.current-balance-label')}:
                                            </LiquidityPoolInfoLabel>
                                            <LiquidityPoolInfo>
                                                {formatCurrencyWithSign(
                                                    isV2Pool ? collateral : USD_SIGN,
                                                    userLiquidityPoolData
                                                        ? userLiquidityPoolData.balanceCurrentRound
                                                        : 0
                                                )}
                                            </LiquidityPoolInfo>
                                        </LiquidityPoolInfoContainer>
                                        <LiquidityPoolInfoContainer>
                                            <LiquidityPoolInfoLabel>
                                                {t('staking.amm-lp.next-round-balance-label')}:
                                            </LiquidityPoolInfoLabel>
                                            <LiquidityPoolInfo>
                                                {formatCurrencyWithSign(
                                                    isV2Pool ? collateral : USD_SIGN,
                                                    userLiquidityPoolData ? userLiquidityPoolData.balanceTotal : 0
                                                )}
                                            </LiquidityPoolInfo>
                                        </LiquidityPoolInfoContainer>
                                        <LiquidityPoolInfoContainer>
                                            <LiquidityPoolInfoLabel>
                                                {t('staking.amm-lp.your-share-label')}
                                            </LiquidityPoolInfoLabel>
                                            <LiquidityPoolInfo>
                                                {formatPercentage(
                                                    (userLiquidityPoolData ? userLiquidityPoolData.balanceTotal : 0) /
                                                        liquidityPoolData.allocationNextRound
                                                )}
                                            </LiquidityPoolInfo>
                                        </LiquidityPoolInfoContainer>
                                    </>
                                )}
                            </div>

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
                                                isV2Pool ? collateral : USD_SIGN,
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
                    {liquidityPoolData && (
                        <PnL
                            liquidityPool={paramTab}
                            lifetimePnl={liquidityPoolData.lifetimePnl}
                            type={LiquidityPoolPnlType.PNL_PER_ROUND}
                        />
                    )}
                </LoadingContainer>
            </ChartsContainer>
            <Container>
                <Bottom>
                    <FlexDivColumnSpaceBetween>
                        <SectionTitle>
                            <span>
                                <i className="icon icon--staking" />
                                {t(`staking.amm-lp.how-it-works.${paramTab}.title`)}
                            </span>
                        </SectionTitle>
                        <Collapse
                            title={t(`staking.amm-lp.how-it-works.${paramTab}.subtitle`)}
                            additionalStyling={{
                                titleFontSize: '14px',
                                titleMarginTop: '15px',
                                titleMarginBottom: '5px',
                                titleFontFamily: 'Nunito',
                                downwardsArrowAlignRight: true,
                            }}
                        >
                            <SectionDescription>
                                <Trans
                                    i18nKey={t(`staking.amm-lp.how-it-works.${paramTab}.description`)}
                                    components={{
                                        tip: <SPAAnchor href={TIPLinks[paramTab]} />,
                                        bold: <span />,
                                    }}
                                />
                            </SectionDescription>
                        </Collapse>
                        <Collapse
                            title={t(`staking.amm-lp.how-it-works.limits`)}
                            additionalStyling={{
                                titleFontSize: '14px',
                                titleMarginBottom: '5px',
                                titleFontFamily: 'Nunito',
                                containerMarginBottom: '5px',
                                downwardsArrowAlignRight: true,
                            }}
                        >
                            <FlexDiv style={{ marginBottom: '10px' }}>
                                <FlexDivColumn>
                                    <InfoDiv>
                                        <span>{t('staking.amm-lp.how-it-works.max-total-deposit')}:</span>
                                        <span>
                                            {formatCurrencyWithSign(
                                                isV2Pool ? collateral : USD_SIGN,
                                                liquidityPoolData?.maxAllowedDeposit || 0,
                                                0
                                            )}
                                        </span>
                                    </InfoDiv>
                                    <InfoDiv>
                                        <span>{t('staking.amm-lp.how-it-works.max-users')}:</span>
                                        <span>{liquidityPoolData?.maxAllowedUsers}</span>
                                    </InfoDiv>
                                    <InfoDiv>
                                        <span>{t('staking.amm-lp.how-it-works.minimum-deposit')}:</span>
                                        <span>
                                            {formatCurrencyWithSign(
                                                isV2Pool ? collateral : USD_SIGN,
                                                liquidityPoolData?.minDepositAmount || 0,
                                                1
                                            )}
                                        </span>
                                    </InfoDiv>
                                    <InfoDiv>
                                        <span>{t('staking.amm-lp.how-it-works.round-duration')}:</span>
                                        <span>
                                            {liquidityPoolData?.roundLength} {t('staking.amm-lp.how-it-works.days')}
                                        </span>
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
                            </FlexDiv>
                        </Collapse>
                    </FlexDivColumnSpaceBetween>
                </Bottom>
            </Container>
            <YourTransactions
                collateral={collateral as UtilsCoins}
                liquidityPool={paramTab}
                currentRound={liquidityPoolData?.round || 0}
            />
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
    font-family: NunitoBold;
    color: ${(props) => props.theme.textColor.primary};
    white-space: nowrap;
    font-size: 18px;
    line-height: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ButtonContainer = styled(FlexDivCentered)`
    width: 100%;
`;

const LiquidityPoolInfoContainer = styled(FlexDivSpaceBetween)`
    align-items: center;
    margin-bottom: 10px;
`;

const LiquidityPoolInfoLabel = styled.span`
    white-space: nowrap;
    margin-right: 6px;
    width: 140px;
    font-size: 14px;
`;

const LiquidityPoolInfo = styled.span`
    font-family: NunitoBold;
    color: white;
    white-space: nowrap;
`;

const ContentInfo = styled.p<{ color?: string }>`
    color: ${(props) => props.color || 'inherit'};
    padding: 10px 0;
    text-align: center;
`;

const WarningContentInfo = styled(ContentInfo)`
    margin-top: -10px;
    margin-bottom: 20px;
    color: ${(props) => props.theme.warning.textColor.primary};
    i {
        color: ${(props) => props.theme.warning.textColor.primary};
    }
`;

const LiquidityPoolFilledText = styled(FlexDivColumn)`
    margin-top: 10px;
    width: 100%;
    font-size: 14px;
    > div {
        display: flex;
        justify-content: space-between;
        height: 20px;
    }
    span {
        color: white;
        font-family: NunitoBold;
    }
`;

const LPInfo = styled.div`
    display: flex;
    flex-direction: column;
    color: ${(props) => props.theme.textColor.tertiary};
    padding: 0 15px;
    font-size: 14px;
    flex: 1;
    justify-content: space-evenly;
`;

const TIPLinks = {
    [LiquidityPool.THALES]: LINKS.Token.TIP139,
    [LiquidityPool.OVERTIME_SINGLE]: LINKS.Token.TIP99,
    [LiquidityPool.OVERTIME_PARLAY]: LINKS.Token.TIP142,
    [LiquidityPool.OVERTIME_USDC]: LINKS.Token.TIP142,
    [LiquidityPool.OVERTIME_WETH]: LINKS.Token.TIP142,
    [LiquidityPool.OVERTIME_THALES]: LINKS.Token.TIP142,
};

const BoldContent = styled.span`
    font-weight: 600;
`;

const RadioButtonContainer = styled(FlexDivSpaceAround)`
    padding-top: 20px;
    label {
        text-transform: uppercase;
    }
`;

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 0 5px;
    margin-bottom: 10px;
`;

const StyledSlider = styled((props) => (
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
        width: 10px;
        height: 10px;
        margin-top: -2px;
        background: ${(props) => props.theme.textColor.primary};
        box-shadow: none;

        &:focus,
        &:hover {
            box-shadow: none;
        }

        &.Mui-disabled {
            width: 10px;
            height: 10px;
            margin-top: -2px;
            margin-left: -6px;
            box-shadow: none;
            outline: 0;
        }
    }

    &.MuiSlider-track {
        height: 5px;
        border-radius: 10px;
        background: ${(props) => props.theme.textColor.secondary};
    }

    &.MuiSlider-rail {
        height: 5px;
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

const WithdrawalContainer = styled.div`
    width: 60%;
    align-self: center;
`;

export default AMMLP;
