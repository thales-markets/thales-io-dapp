import { BaseProvider } from '@ethersproject/providers';
import { CircularProgress } from '@material-ui/core';
import { CurrencyAmount, Percent, Token, TradeType } from '@uniswap/sdk-core';
import { AlphaRouter, SwapOptionsSwapRouter02, SwapType } from '@uniswap/smart-order-router';
import { Pool, Route, SwapOptions, SwapRouter, Trade } from '@uniswap/v3-sdk';
import Modal from 'components/Modal';
import { getErrorToastOptions, getSuccessToastOptions } from 'components/ToastMessage/ToastMessage';
import { PLAUSIBLE, PLAUSIBLE_KEYS } from 'constants/analytics';
import { DEFAULT_COLLATERALS } from 'constants/currency';
import {
    UNISWAP_SWAP_ROUTER_ADDRESS,
    UNISWAP_V3_SWAP_ROUTER_ADDRESS,
    UNISWAP_V3_SWAP_ROUTER_ADDRESS_BASE,
} from 'constants/uniswap';
import { Network } from 'enums/network';
import { BigNumberish, ethers } from 'ethers';
import { t } from 'i18next';
import JSBI from 'jsbi';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv, FlexDivCentered } from 'styles/common';
import { COLLATERAL_DECIMALS } from 'thales-utils';
import collateralContractRaw from 'utils/contracts/collateralContract';
import thalesTokenContractRaw from 'utils/contracts/thalesContract';
import { checkAllowance } from 'utils/network';
import networkConnector from 'utils/networkConnector';
import { refetchTokenQueries } from 'utils/queryConnector';
import { fromReadableAmount, getChainId, getFeeAmount, getOutputQuote, getPoolInfo } from 'utils/uniswap';

type CompoundModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    rewards: number;
};

const CompoundModal: React.FC<CompoundModalProps> = ({ isOpen, setIsOpen, rewards }) => {
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const [step, setStep] = useState<number>(0);
    const [flowStarted, setFlowStarted] = useState<boolean>(false);
    const [thalesToStake, setThalesToStake] = useState<number>(0);
    const [tryAgainVisible, setTryAgainVisible] = useState<boolean>(false);
    const [rewardsToSwap] = useState<number>(rewards);

    const claimRewards = useCallback(async () => {
        const { stakingThalesContract } = networkConnector as any;
        const stakingThalesContractWithSigner = stakingThalesContract.connect((networkConnector as any).signer);
        try {
            const tx = (await stakingThalesContractWithSigner.claimReward()) as ethers.ContractTransaction;
            const txResult = await tx.wait();
            if (txResult && txResult.transactionHash) {
                setStep(1);
                return true;
            } else {
                setTryAgainVisible(true);
                toast.error(
                    t('common.errors.unknown-error-try-again'),
                    getErrorToastOptions(t('common.errors.unknown-error-try-again'))
                );
            }
        } catch (e) {
            setTryAgainVisible(true);
            console.log(e);
            toast.error(
                t('common.errors.unknown-error-try-again'),
                getErrorToastOptions(t('common.errors.unknown-error-try-again'))
            );
        }
        return false;
    }, []);

    const approveUniswap = useCallback(async (amountToApprove: JSBI, address: string) => {
        const { collateral: collateralContract } = networkConnector as any;
        const collateralContractWithSigner = collateralContract.connect((networkConnector as any).signer);
        const tx = await collateralContractWithSigner.approve(
            address,
            ethers.BigNumber.from(amountToApprove.toString())
        );
        const txResult = await tx.wait();
        if (txResult && txResult.transactionHash) {
        } else {
            setTryAgainVisible(true);
            toast.error(
                t('common.errors.unknown-error-try-again'),
                getErrorToastOptions(t('common.errors.unknown-error-try-again'))
            );
            throw new Error(t('common.errors.unknown-error-try-again'));
        }
    }, []);

    const swapStableForThales = useCallback(async () => {
        const { provider } = networkConnector;
        const chainId = getChainId(networkId);
        const collateralDecimals = COLLATERAL_DECIMALS[DEFAULT_COLLATERALS[networkId]];
        const amountToSwap = rewardsToSwap;

        const { collateral: collateralContract } = networkConnector as any;
        const collateralContractWithSigner = collateralContract.connect((networkConnector as any).signer);
        const uniswapRouterAddress =
            networkId === Network.Base ? UNISWAP_V3_SWAP_ROUTER_ADDRESS_BASE : UNISWAP_V3_SWAP_ROUTER_ADDRESS;

        const router = new AlphaRouter({
            chainId,
            provider: provider as BaseProvider,
        });
        const options: SwapOptionsSwapRouter02 = {
            recipient: walletAddress,
            slippageTolerance: new Percent(20, 1000),
            deadline: Math.floor(Date.now() / 1000 + 3800),
            type: SwapType.SWAP_ROUTER_02,
        };
        const rawTokenAmountIn: JSBI = fromReadableAmount(amountToSwap, collateralDecimals);

        try {
            const route = await router.route(
                CurrencyAmount.fromRawAmount(
                    new Token(chainId, collateralContractRaw.addresses[networkId], collateralDecimals),
                    rawTokenAmountIn.toString()
                ),
                new Token(chainId, thalesTokenContractRaw.addresses[networkId], 18),
                TradeType.EXACT_INPUT,
                options
            );
            setStep(2);
            const allowance = await checkAllowance(
                ethers.utils.parseUnits(Number(amountToSwap).toString(), collateralDecimals),
                collateralContractWithSigner,
                walletAddress,
                uniswapRouterAddress
            );
            if (!allowance) {
                await approveUniswap(rawTokenAmountIn, uniswapRouterAddress);
            }
            setStep(3);

            if (route?.methodParameters) {
                const tx = await (networkConnector as any).signer.sendTransaction({
                    data: route.methodParameters.calldata,
                    to: uniswapRouterAddress,
                    value: route.methodParameters.value,
                    from: walletAddress,
                });
                const txResult = await tx.wait();

                if (txResult && txResult.transactionHash) {
                } else {
                    setTryAgainVisible(true);
                    toast.error(
                        t('common.errors.unknown-error-try-again'),
                        getErrorToastOptions(t('common.errors.unknown-error-try-again'))
                    );
                }
            }
            setStep(4);
            const thalesIn = Number(route?.trade.swaps[0].outputAmount.toFixed());
            setThalesToStake(thalesIn);
            return thalesIn;
        } catch (e) {
            setTryAgainVisible(true);
            console.error(e);
            toast.error(
                t('common.errors.unknown-error-try-again'),
                getErrorToastOptions(t('common.errors.unknown-error-try-again'))
            );
        }
    }, [approveUniswap, networkId, rewardsToSwap, walletAddress]);

    const swapStableForThalesArbitrum = useCallback(async () => {
        const chainId = getChainId(networkId);
        const collateralDecimals = COLLATERAL_DECIMALS[DEFAULT_COLLATERALS[networkId]];
        const amountToSwap = rewardsToSwap;

        const { collateral: collateralContract } = networkConnector as any;
        const collateralContractWithSigner = collateralContract.connect((networkConnector as any).signer);

        const tokenIn = new Token(chainId, collateralContractRaw.addresses[networkId], collateralDecimals);
        const tokenOut = new Token(chainId, thalesTokenContractRaw.addresses[networkId], 18);

        try {
            const poolInfo = await getPoolInfo(networkId, tokenIn, tokenOut);

            if (!poolInfo) {
                throw new Error('Could not fetch pool info');
            }

            const pool = new Pool(
                tokenIn,
                tokenOut,
                getFeeAmount(networkId),
                poolInfo.sqrtPriceX96.toString(),
                poolInfo.liquidity.toString(),
                poolInfo.tick
            );

            const swapRoute = new Route([pool], tokenIn, tokenOut);
            const amountOut = await getOutputQuote(swapRoute, tokenIn, amountToSwap);
            const rawTokenAmountIn: JSBI = fromReadableAmount(amountToSwap, collateralDecimals);

            const uncheckedTrade = Trade.createUncheckedTrade({
                route: swapRoute,
                inputAmount: CurrencyAmount.fromRawAmount(
                    tokenIn,
                    fromReadableAmount(amountToSwap, tokenIn.decimals).toString()
                ),
                outputAmount: CurrencyAmount.fromRawAmount(tokenOut, JSBI.BigInt(amountOut)),
                tradeType: TradeType.EXACT_INPUT,
            });

            setStep(2);

            const allowance = await checkAllowance(
                ethers.utils.parseUnits(Number(amountToSwap).toString(), collateralDecimals),
                collateralContractWithSigner,
                walletAddress,
                UNISWAP_SWAP_ROUTER_ADDRESS
            );

            if (!allowance) {
                await approveUniswap(rawTokenAmountIn, UNISWAP_SWAP_ROUTER_ADDRESS);
            }

            setStep(3);

            const options: SwapOptions = {
                recipient: walletAddress,
                slippageTolerance: new Percent(20, 1000),
                deadline: Math.floor(Date.now() / 1000 + 3800),
            };
            const methodParameters = SwapRouter.swapCallParameters([uncheckedTrade], options);
            const tx = await (networkConnector as any).signer.sendTransaction({
                data: methodParameters.calldata,
                to: UNISWAP_SWAP_ROUTER_ADDRESS,
                value: methodParameters.value,
                from: walletAddress,
            });
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
            } else {
                setTryAgainVisible(true);
                toast.error(
                    t('common.errors.unknown-error-try-again'),
                    getErrorToastOptions(t('common.errors.unknown-error-try-again'))
                );
            }
            setStep(4);
            const thalesIn = Number(uncheckedTrade.swaps[0].outputAmount.toFixed());
            setThalesToStake(thalesIn);
            return thalesIn;
        } catch (e) {
            setTryAgainVisible(true);
            console.error(e);
            toast.error(
                t('common.errors.unknown-error-try-again'),
                getErrorToastOptions(t('common.errors.unknown-error-try-again'))
            );
        }
    }, [approveUniswap, networkId, walletAddress, rewardsToSwap]);

    const approveThales = useCallback(async (amountToApprove: BigNumberish) => {
        const { thalesTokenContract, stakingThalesContract } = networkConnector as any;
        const addressToApprove = stakingThalesContract.address;
        const thalesTokenContractWithSigner = thalesTokenContract.connect((networkConnector as any).signer);
        const tx = await thalesTokenContractWithSigner.approve(addressToApprove, amountToApprove);
        const txResult = await tx.wait();
        if (txResult && txResult.transactionHash) {
        } else {
            setTryAgainVisible(true);
            toast.error(
                t('common.errors.unknown-error-try-again'),
                getErrorToastOptions(t('common.errors.unknown-error-try-again'))
            );
            throw new Error(t('common.errors.unknown-error-try-again'));
        }
    }, []);

    const stakeThales = useCallback(
        async (amountToStake: number) => {
            const { thalesTokenContract, stakingThalesContract } = networkConnector as any;
            const thalesTokenContractWithSigner = thalesTokenContract.connect((networkConnector as any).signer);
            const addressToApprove = stakingThalesContract.address;
            const parsedStakeAmount = ethers.utils.parseEther(Number(amountToStake).toString());

            try {
                const allowance = await checkAllowance(
                    parsedStakeAmount,
                    thalesTokenContractWithSigner,
                    walletAddress,
                    addressToApprove
                );

                if (!allowance) {
                    await approveThales(parsedStakeAmount);
                }

                setStep(5);

                const stakingThalesContractWithSigner = stakingThalesContract.connect((networkConnector as any).signer);
                const tx = await stakingThalesContractWithSigner.stake(parsedStakeAmount);
                const txResult = await tx.wait();

                if (txResult && txResult.transactionHash) {
                    refetchTokenQueries(walletAddress, networkId);
                    PLAUSIBLE.trackEvent(PLAUSIBLE_KEYS.stake);
                    setStep(6);
                    toast.success(
                        t('staking.rewards.claim.compound-success'),
                        getSuccessToastOptions(t('staking.rewards.claim.compound-success'))
                    );
                } else {
                    setTryAgainVisible(true);
                    toast.error(
                        t('common.errors.unknown-error-try-again'),
                        getErrorToastOptions(t('common.errors.unknown-error-try-again'))
                    );
                }
            } catch (e) {
                console.error(e);
                setTryAgainVisible(true);
                toast.error(
                    t('common.errors.unknown-error-try-again'),
                    getErrorToastOptions(t('common.errors.unknown-error-try-again'))
                );
            }
        },
        [approveThales, networkId, walletAddress]
    );

    const flow = useCallback(
        async (currentStep: number) => {
            const claimed = currentStep > 0 || (await claimRewards());
            if (claimed) {
                const amountToStake =
                    thalesToStake ||
                    (networkId === Network.Arbitrum
                        ? await swapStableForThalesArbitrum()
                        : await swapStableForThales());
                if (amountToStake) {
                    await stakeThales(amountToStake);
                }
            }
        },
        [claimRewards, networkId, stakeThales, swapStableForThales, swapStableForThalesArbitrum, thalesToStake]
    );

    useEffect(() => {
        if (isOpen && !flowStarted) {
            setFlowStarted(true);
            flow(0);
        }
    }, [flow, flowStarted, isOpen]);

    return (
        <>
            {isOpen && (
                <Modal
                    customStyle={{ content: { width: '300px' } }}
                    title=""
                    onClose={() => {
                        refetchTokenQueries(walletAddress, networkId);
                        setStep(0);
                        setFlowStarted(false);
                        setIsOpen(false);
                    }}
                >
                    <StepRow>
                        <span>Claim rewards</span>
                        <span>
                            {step < 1 ? <CustomCircularProgress /> : <Checkmark className="icon icon--checkmark" />}
                        </span>
                    </StepRow>
                    <StepRow>
                        <span>Fetching quote</span>
                        {step > 0 && (
                            <span>
                                {step < 2 ? <CustomCircularProgress /> : <Checkmark className="icon icon--checkmark" />}
                            </span>
                        )}
                    </StepRow>
                    <StepRow>
                        <span>Approve swap</span>
                        {step > 1 && (
                            <span>
                                {step < 3 ? <CustomCircularProgress /> : <Checkmark className="icon icon--checkmark" />}
                            </span>
                        )}
                    </StepRow>
                    <StepRow>
                        <span>Swap</span>
                        {step > 2 && (
                            <span>
                                {step < 4 ? <CustomCircularProgress /> : <Checkmark className="icon icon--checkmark" />}
                            </span>
                        )}
                    </StepRow>
                    <StepRow>
                        <span>Approve stake</span>
                        {step > 3 && (
                            <span>
                                {step < 5 ? <CustomCircularProgress /> : <Checkmark className="icon icon--checkmark" />}
                            </span>
                        )}
                    </StepRow>
                    <StepRow>
                        <span>Stake</span>
                        {step > 4 && (
                            <span>
                                {step < 6 ? <CustomCircularProgress /> : <Checkmark className="icon icon--checkmark" />}
                            </span>
                        )}
                    </StepRow>
                    <FlexDivCentered>
                        {tryAgainVisible && (
                            <Button
                                onClick={() => {
                                    flow(step);
                                    setTryAgainVisible(false);
                                }}
                            >
                                Try Again
                            </Button>
                        )}
                    </FlexDivCentered>
                </Modal>
            )}
        </>
    );
};

const StepRow = styled(FlexDiv)`
    color: white;
    padding: 10px 0;
    align-items: center;
    justify-content: space-between;
    line-height: 27px;
`;

const CustomCircularProgress = styled(CircularProgress)`
    &.MuiCircularProgress-root {
        width: 20px !important;
        height: 20px !important;
    }
    &.MuiCircularProgress-colorPrimary {
        color: ${(props) => props.theme.textColor.secondary};
    }
`;

const Button = styled.button<{ padding?: string; disabled?: boolean; width?: string }>`
    cursor: pointer;
    color: ${(props) => props.theme.background.primary};
    padding: ${(props) => props.padding || '5px 15px'};
    border-radius: 8px;
    border: 0;
    background: ${(props) => props.theme.textColor.secondary};
    text-align: center;
    font-family: NunitoExtraBold;
    font-size: 13px;
    text-transform: uppercase;
    width: ${(props) => props.width || 'auto'};
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

const Checkmark = styled.i``;
export default CompoundModal;
