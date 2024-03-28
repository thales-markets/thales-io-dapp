import { BaseProvider } from '@ethersproject/providers';
import { CircularProgress } from '@material-ui/core';
import { CurrencyAmount, Percent, Token, TradeType } from '@uniswap/sdk-core';
import { AlphaRouter, SwapOptionsSwapRouter02, SwapType } from '@uniswap/smart-order-router';
import Modal from 'components/Modal';
import {
    getDefaultToastContent,
    getErrorToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import { PLAUSIBLE, PLAUSIBLE_KEYS } from 'constants/analytics';
import { DEFAULT_COLLATERALS } from 'constants/currency';
import { UNISWAP_V3_SWAP_ROUTER_ADDRESS } from 'constants/uniswap';
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
import { fromReadableAmount, getChainId } from 'utils/uniswap';

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
                toast.error(getErrorToastContent(t('common.errors.unknown-error-try-again')));
            }
        } catch (e) {
            setTryAgainVisible(true);
            console.log(e);
            toast.error(getErrorToastContent(t('common.errors.unknown-error-try-again')));
        }
        return false;
    }, []);

    const approveUniswap = useCallback(async (amountToApprove: JSBI) => {
        try {
            const { collateral: collateralContract } = networkConnector as any;
            const collateralContractWithSigner = collateralContract.connect((networkConnector as any).signer);
            const tx = await collateralContractWithSigner.approve(
                UNISWAP_V3_SWAP_ROUTER_ADDRESS,
                ethers.BigNumber.from(amountToApprove.toString())
            );
            const txResult = await tx.wait();
            if (txResult && txResult.transactionHash) {
            } else {
                setTryAgainVisible(true);
                toast.error(getErrorToastContent(t('common.errors.unknown-error-try-again')));
            }
        } catch (e) {
            setTryAgainVisible(true);
            console.error(e);
            toast.error(getErrorToastContent(t('common.errors.unknown-error-try-again')));
        }
    }, []);

    const swapStableForThales = useCallback(async () => {
        const { provider } = networkConnector;
        const chainId = getChainId(networkId);
        const collateralDecimals = COLLATERAL_DECIMALS[DEFAULT_COLLATERALS[networkId]];
        const amountToSwap = rewards;

        const { collateral: collateralContract } = networkConnector as any;
        const collateralContractWithSigner = collateralContract.connect((networkConnector as any).signer);

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
        const rawTokenAmountIn: JSBI = fromReadableAmount(rewards, collateralDecimals);

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
                ethers.utils.parseEther(Number(amountToSwap).toString()),
                collateralContractWithSigner,
                walletAddress,
                UNISWAP_V3_SWAP_ROUTER_ADDRESS
            );
            if (!allowance) {
                await approveUniswap(rawTokenAmountIn);
            }
            setStep(3);

            if (route?.methodParameters) {
                const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
                const tx = await (networkConnector as any).signer.sendTransaction({
                    data: route.methodParameters.calldata,
                    to: UNISWAP_V3_SWAP_ROUTER_ADDRESS,
                    value: route.methodParameters.value,
                    from: walletAddress,
                });
                const txResult = await tx.wait();

                if (txResult && txResult.transactionHash) {
                    toast.update(id, getSuccessToastOptions(t(`common.transaction.successful`), id));
                } else {
                    setTryAgainVisible(true);
                    toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
                }
            }
            setStep(4);
            const thalesIn = Number(route?.trade.swaps[0].outputAmount.toExact());
            setThalesToStake(thalesIn);
            return thalesIn;
        } catch (e) {
            setTryAgainVisible(true);
            console.error(e);
            toast.error(getErrorToastContent(t('common.errors.unknown-error-try-again')));
        }
    }, [approveUniswap, networkId, rewards, walletAddress]);

    const approveThales = useCallback(async (amountToApprove: BigNumberish) => {
        try {
            const { thalesTokenContract, stakingThalesContract } = networkConnector as any;
            const addressToApprove = stakingThalesContract.address;
            const thalesTokenContractWithSigner = thalesTokenContract.connect((networkConnector as any).signer);
            const tx = await thalesTokenContractWithSigner.approve(addressToApprove, amountToApprove);
            const txResult = await tx.wait();
            if (txResult && txResult.transactionHash) {
            } else {
                setTryAgainVisible(true);
                toast.error(getErrorToastContent(t('common.errors.unknown-error-try-again')));
            }
        } catch (e) {
            setTryAgainVisible(true);
            console.error(e);
            toast.error(getErrorToastContent(t('common.errors.unknown-error-try-again')));
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
                } else {
                    setTryAgainVisible(true);
                    toast.error(getErrorToastContent(t('common.errors.unknown-error-try-again')));
                }
            } catch (e) {
                setTryAgainVisible(true);
                toast.error(getErrorToastContent(t('common.errors.unknown-error-try-again')));
            }
        },
        [approveThales, networkId, walletAddress]
    );

    const flow = useCallback(
        async (currentStep: number) => {
            const claimed = currentStep > 0 || (await claimRewards());
            if (claimed) {
                const amountToStake = thalesToStake || (await swapStableForThales());
                if (amountToStake) {
                    await stakeThales(amountToStake);
                }
                refetchTokenQueries(walletAddress, networkId);
            }
        },
        [claimRewards, networkId, stakeThales, swapStableForThales, thalesToStake, walletAddress]
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
                        setIsOpen(false);
                        setStep(0);
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
