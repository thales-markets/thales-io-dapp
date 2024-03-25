import { useConnectModal } from '@rainbow-me/rainbowkit';
import ApprovalModal from 'components/ApprovalModal';
import InlineLoader from 'components/InlineLoader';
import NetworkSwitch from 'components/NetworkSwitch';
import Slippage from 'components/Slippage';
import { isSlippageValid as getIsSlippageValid } from 'components/Slippage/Slippage';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import Tooltip from 'components/Tooltip';
import NumericInput from 'components/fields/NumericInput';
import { generalConfig } from 'config/general';
import { THALES_CURRENCY } from 'constants/currency';
import { BRIDGE_SUPPORTED_NETWORKS } from 'constants/network';
import { EMPTY_VALUE } from 'constants/placeholder';
import { Network } from 'enums/network';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { BigNumber, ethers } from 'ethers';
import useDebouncedEffect from 'hooks/useDebouncedEffect';
import { InputContainer } from 'pages/AMMLP/styled-components';
import useCelerBridgeDataQuery from 'queries/token/useCelerBridgeDataQuery';
import useThalesBalanceQuery from 'queries/token/useThalesBalanceQuery';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OutsideClickHandler from 'react-outside-click-handler';
import { useSelector } from 'react-redux';
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
    FlexDivRow,
    FlexDivSpaceBetween,
    FlexDivStart,
} from 'styles/common';
import { bigNumberFormatter, formatCurrencyWithKey, truncToDecimals } from 'thales-utils';
import { WebClient } from 'ts-proto/gateway/GatewayServiceClientPb';
import { EstimateAmtRequest, EstimateAmtResponse } from 'ts-proto/gateway/gateway_pb';
import { SUPPORTED_NETWORK_IDS_MAP, checkAllowance } from 'utils/network';
import networkConnector from 'utils/networkConnector';
import { refetchCelerBridgeHistory } from 'utils/queryConnector';
import History from './History';
import FeeTooltip from './components/FeeTooltip';
import NetworkIcon from './components/NetworkIcon';

const BRIDGE_SLIPPAGE_PERCENTAGE = [0.3, 0.5, 1];

const Bridge: React.FC = () => {
    const { t } = useTranslation();
    const { openConnectModal } = useConnectModal();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const [amount, setAmount] = useState<number | string>('');
    const [destNetwork, setDestNetwork] = useState<number>(Network.Arbitrum);
    const [destSupportedNetworks, setDestSupportedNetworks] = useState<number[]>(BRIDGE_SUPPORTED_NETWORKS);
    const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
    const [thalesBalance, setThalesBalance] = useState<number | string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasAllowance, setAllowance] = useState<boolean>(false);
    const [isAllowing, setIsAllowing] = useState<boolean>(false);
    const [openApprovalModal, setOpenApprovalModal] = useState<boolean>(false);
    const [bridgeEstimation, setBridgeEstimation] = useState<EstimateAmtResponse.AsObject | undefined>(undefined);
    const [slippage, setSlippage] = useState<number>(BRIDGE_SLIPPAGE_PERCENTAGE[0]);
    const [isSlippageDropdownOpen, setIsSlippageDropdownOpen] = useState(false);
    const [bridgeError, setBridgeError] = useState<string | undefined>(undefined);
    const [isFetchingEstimation, setIsFetchingEstimation] = useState<boolean>(false);

    const isAmountEntered = Number(amount) > 0;
    const isSlippageValid = getIsSlippageValid(Number(slippage));
    const insufficientBalance = Number(thalesBalance) < Number(amount) || Number(thalesBalance) === 0;

    const isButtonDisabled =
        isSubmitting ||
        !isWalletConnected ||
        !isAmountEntered ||
        insufficientBalance ||
        !hasAllowance ||
        !!bridgeError ||
        !isSlippageValid ||
        isFetchingEstimation;

    const thalesBalanceQuery = useThalesBalanceQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    const theme = useTheme();

    useEffect(() => {
        const filteredDestSupportedNetworks = BRIDGE_SUPPORTED_NETWORKS.filter((network) => network !== networkId);
        setDestSupportedNetworks(filteredDestSupportedNetworks);
        if (networkId === destNetwork) {
            setDestNetwork(filteredDestSupportedNetworks[0]);
        }
    }, [networkId, destNetwork]);

    useEffect(() => {
        if (thalesBalanceQuery.isSuccess && thalesBalanceQuery.data) {
            setThalesBalance(Number(thalesBalanceQuery.data.balance));
        }
    }, [thalesBalanceQuery.isSuccess, thalesBalanceQuery.data]);

    const celerBridgeDataQuery = useCelerBridgeDataQuery(networkId, destNetwork, {
        enabled: isAppReady && isWalletConnected,
    });

    const celerBridgeData =
        celerBridgeDataQuery.isSuccess && celerBridgeDataQuery.data ? celerBridgeDataQuery.data : undefined;

    useEffect(() => {
        const { thalesTokenContract, celerBridgeContract } = networkConnector as any;

        if (thalesTokenContract && celerBridgeContract) {
            const thalesTokenContractWithSigner = thalesTokenContract.connect((networkConnector as any).signer);
            const addressToApprove = celerBridgeContract.address;

            const getAllowance = async () => {
                try {
                    const parsedAmount = ethers.utils.parseEther(Number(amount).toString());
                    const allowance = await checkAllowance(
                        parsedAmount,
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
    }, [walletAddress, isWalletConnected, hasAllowance, networkId, amount, isAllowing]);

    const handleAllowance = async (approveAmount: BigNumber) => {
        const { thalesTokenContract, celerBridgeContract } = networkConnector as any;

        if (thalesTokenContract && celerBridgeContract) {
            const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
            const thalesTokenContractWithSigner = thalesTokenContract.connect((networkConnector as any).signer);
            const addressToApprove = celerBridgeContract.address;

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
        }
    };

    const fetchEstimation = async () => {
        setIsFetchingEstimation(true);
        let resObject;
        if (Number(amount) > 0 && Number(slippage) > 0) {
            const estimateRequest = new EstimateAmtRequest();

            estimateRequest.setSrcChainId(networkId);
            estimateRequest.setDstChainId(Number(destNetwork));
            estimateRequest.setTokenSymbol(THALES_CURRENCY);
            estimateRequest.setSlippageTolerance(Math.floor(slippage * 1000));
            estimateRequest.setAmt(ethers.utils.parseEther(amount.toString()).toString());

            const client = new WebClient(generalConfig.CELER_BRIDGE_URL, null, null);
            const res: EstimateAmtResponse = await client.estimateAmt(estimateRequest, null);

            resObject = res.toObject();
            setBridgeEstimation(resObject);
            if (resObject.err) {
                setBridgeError(resObject.err.msg);
            } else {
                if (Number(resObject.estimatedReceiveAmt) < 0) {
                    setBridgeError(t('bridge.low-amount-error'));
                } else {
                    setBridgeError(undefined);
                }
            }
        } else {
            setBridgeEstimation(undefined);
            setBridgeError(undefined);
        }
        setIsFetchingEstimation(false);
        return resObject;
    };

    useDebouncedEffect(() => {
        fetchEstimation();
    }, [amount, slippage, networkId, destNetwork, walletAddress]);

    const handleSubmit = async () => {
        const { thalesTokenContract, celerBridgeContract } = networkConnector as any;

        const estimation = await fetchEstimation();
        if (thalesTokenContract && celerBridgeContract && estimation) {
            setIsSubmitting(true);
            const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());

            try {
                const celerBridgeContractWithSigner = celerBridgeContract.connect((networkConnector as any).signer);

                const parsedAmount = ethers.utils.parseEther(amount.toString()).toString();
                const tx = await celerBridgeContractWithSigner.send(
                    walletAddress,
                    thalesTokenContract.address,
                    parsedAmount,
                    destNetwork,
                    new Date().getTime(),
                    estimation.maxSlippage
                );
                const txResult = await tx.wait();

                if (txResult && txResult.transactionHash) {
                    toast.update(id, getSuccessToastOptions(t('bridge.button.confirmation-message'), id));
                    refetchCelerBridgeHistory(walletAddress);
                    setIsSubmitting(false);
                    setAmount('');
                }
            } catch (e) {
                console.log(e);
                toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
                setIsSubmitting(false);
            }
        }
    };

    const getSubmitButton = () => {
        if (!isWalletConnected) {
            return <Button onClick={openConnectModal}>{t('common.wallet.connect-your-wallet')}</Button>;
        }
        if (bridgeError) {
            return <Button disabled={true}>{t(`bridge.button.label`)}</Button>;
        }
        if (insufficientBalance) {
            return <Button disabled={true}>{t(`common.errors.insufficient-balance`)}</Button>;
        }
        if (!isAmountEntered) {
            return <Button disabled={true}>{t(`common.errors.enter-amount`)}</Button>;
        }
        if (!isSlippageValid) {
            return <Button disabled={true}>{t(`common.errors.enter-slippage`)}</Button>;
        }
        if (!hasAllowance) {
            return (
                <Button disabled={isAllowing} onClick={() => setOpenApprovalModal(true)}>
                    {!isAllowing
                        ? t('common.enable-wallet-access.approve-label', { currencyKey: THALES_CURRENCY })
                        : t('common.enable-wallet-access.approve-progress-label', {
                              currencyKey: THALES_CURRENCY,
                          })}
                </Button>
            );
        }
        return (
            <Button disabled={isButtonDisabled} onClick={handleSubmit}>
                {!isSubmitting ? t('bridge.button.label') : t('bridge.button.progress-label')}
            </Button>
        );
    };

    const onMaxClick = () => {
        setAmount(truncToDecimals(thalesBalance, 8));
    };

    useEffect(() => {
        setIsAmountValid(Number(amount) === 0 || (Number(amount) > 0 && Number(amount) <= Number(thalesBalance)));
    }, [amount, thalesBalance]);

    const getEstimationData = (value: any, isValidValue: boolean, isLoading?: boolean) => (
        <EstimationData>
            {isLoading ? <InlineLoader size={12} thickness={6} /> : isValidValue ? value : EMPTY_VALUE}
        </EstimationData>
    );

    const bridgeRate = bridgeEstimation && bridgeEstimation.bridgeRate ? bridgeEstimation.bridgeRate : 0;
    const estimatedReceiveAmt =
        bridgeEstimation && Number(bridgeEstimation.estimatedReceiveAmt) > 0
            ? bigNumberFormatter(bridgeEstimation.estimatedReceiveAmt)
            : 0;
    const baseFee = bridgeEstimation && bridgeEstimation.baseFee ? bigNumberFormatter(bridgeEstimation.baseFee) : 0;
    const protocolFee = bridgeEstimation && bridgeEstimation.percFee ? bigNumberFormatter(bridgeEstimation.percFee) : 0;
    const totalFee = baseFee + protocolFee;
    const minimumReceivedAmt =
        bridgeEstimation && Number(bridgeEstimation.estimatedReceiveAmt) > 0 && bridgeEstimation.bridgeRate
            ? bigNumberFormatter(bridgeEstimation.estimatedReceiveAmt) -
              (Number(amount) * bridgeEstimation.bridgeRate * slippage) / 100
            : 0;

    return (
        <GridWrapper>
            <Wrapper>
                <Container>
                    <Header>{t('bridge.header')}</Header>
                    <InfoSection>{t('bridge.info')}</InfoSection>
                    <FlexDivSpaceBetween>
                        <NetworkSwitchContainer>
                            <NetworkSwitchLabel>{t('bridge.from-label')}:</NetworkSwitchLabel>
                            <NetworkSwitchWrapper>
                                <NetworkSwitch
                                    xl={true}
                                    supportedNetworks={BRIDGE_SUPPORTED_NETWORKS}
                                    forceNetworkSwitch={true}
                                />
                            </NetworkSwitchWrapper>
                            <SlippageContainer>
                                <OutsideClickHandler
                                    onOutsideClick={() => isSlippageDropdownOpen && setIsSlippageDropdownOpen(false)}
                                >
                                    <DetailsIcon
                                        className="thales-icon thales-icon--gear"
                                        onClick={() => setIsSlippageDropdownOpen(!isSlippageDropdownOpen)}
                                    />
                                    {isSlippageDropdownOpen && (
                                        <SlippageDropDown>
                                            <Slippage
                                                fixed={BRIDGE_SLIPPAGE_PERCENTAGE}
                                                defaultValue={slippage}
                                                onChangeHandler={setSlippage}
                                                maxValue={10}
                                                tooltip={t('bridge.slippage-tooltip')}
                                            />
                                        </SlippageDropDown>
                                    )}
                                </OutsideClickHandler>
                            </SlippageContainer>
                        </NetworkSwitchContainer>
                    </FlexDivSpaceBetween>
                    <InputContainer mediaMarginBottom={10}>
                        <NumericInput
                            value={amount}
                            onChange={(_, value) => setAmount(value)}
                            disabled={isSubmitting}
                            placeholder={t('common.enter-amount')}
                            label={t('bridge.send-label')}
                            onMaxButton={onMaxClick}
                            showValidation={!isAmountValid || !!bridgeError}
                            validationMessage={
                                bridgeError ||
                                t(`common.errors.insufficient-balance-wallet`, {
                                    currencyKey: THALES_CURRENCY,
                                })
                            }
                            balance={
                                isWalletConnected
                                    ? `${t('common.balance')}: ${formatCurrencyWithKey(THALES_CURRENCY, thalesBalance)}`
                                    : undefined
                            }
                            isBalanceLoading={thalesBalanceQuery.isLoading}
                        />
                    </InputContainer>
                    <ArrowContainer>
                        <i className="icon icon--circle-arrow-down" />
                    </ArrowContainer>
                    <NetworkSwitchContainer>
                        <NetworkSwitchLabel>{t('bridge.to-label')}:</NetworkSwitchLabel>
                        <NetworkSwitchWrapper>
                            <NetworkSwitch
                                xl={true}
                                selectedNetworkId={destNetwork}
                                setSelectedNetworkId={setDestNetwork}
                                supportedNetworks={destSupportedNetworks}
                            />
                        </NetworkSwitchWrapper>
                    </NetworkSwitchContainer>
                    <InputContainer mediaMarginBottom={10}>
                        <NumericInput
                            value={isFetchingEstimation ? 0 : truncToDecimals(estimatedReceiveAmt, 2)}
                            onChange={() => {}}
                            disabled={true}
                            currencyLabel={THALES_CURRENCY}
                            label={t('bridge.estimated-receive-label')}
                            tooltip={t('bridge.estimated-receive-tooltip')}
                        />
                    </InputContainer>
                    <EstimationContainer>
                        <EstimationRow>
                            <EstimationDataLabel>{t('bridge.bridge-rate-label')}</EstimationDataLabel>
                            {getEstimationData(
                                <FlexDivRow>
                                    <span>{`1 ${THALES_CURRENCY} on `}</span>
                                    <NetworkIcon networkId={networkId} size={14} margin="1px 4px 0px 4px" />
                                    <span>{` ≈ ${formatCurrencyWithKey(THALES_CURRENCY, bridgeRate)} on `}</span>
                                    <NetworkIcon networkId={destNetwork} size={14} margin="1px 0px 0px 4px" />
                                </FlexDivRow>,
                                bridgeRate > 0,
                                isFetchingEstimation
                            )}
                        </EstimationRow>
                        <EstimationRow>
                            <EstimationDataLabel>
                                {t('bridge.fee-label')}
                                <Tooltip
                                    iconColor={theme.textColor.tertiary}
                                    overlay={<FeeTooltip baseFee={baseFee} protocolFee={protocolFee} />}
                                    iconFontSize={12}
                                />
                            </EstimationDataLabel>
                            {getEstimationData(
                                formatCurrencyWithKey(THALES_CURRENCY, totalFee),
                                totalFee > 0,
                                isFetchingEstimation
                            )}
                        </EstimationRow>
                        <EstimationRow>
                            <EstimationDataLabel>
                                {t('bridge.minimum-received-label')}
                                <Tooltip
                                    iconColor={theme.textColor.tertiary}
                                    overlay={t('bridge.minimum-received-tooltip', {
                                        minimum:
                                            minimumReceivedAmt > 0
                                                ? formatCurrencyWithKey(THALES_CURRENCY, minimumReceivedAmt)
                                                : '-',
                                        network: SUPPORTED_NETWORK_IDS_MAP[destNetwork].name,
                                    })}
                                    iconFontSize={12}
                                />
                            </EstimationDataLabel>
                            {getEstimationData(
                                formatCurrencyWithKey(THALES_CURRENCY, minimumReceivedAmt),
                                minimumReceivedAmt > 0,
                                isFetchingEstimation
                            )}
                        </EstimationRow>
                        <EstimationRow>
                            <EstimationDataLabel>{t('bridge.estimated-time-of-arrival-label')}</EstimationDataLabel>
                            {getEstimationData(
                                `${celerBridgeData?.transferLatencyInMinutes} ${t('common.time-remaining.minutes')}`,
                                !!celerBridgeData,
                                celerBridgeDataQuery.isLoading
                            )}
                        </EstimationRow>
                    </EstimationContainer>
                    <SubmitButtonContainer>{getSubmitButton()}</SubmitButtonContainer>
                    {openApprovalModal && (
                        <ApprovalModal
                            defaultAmount={amount}
                            tokenSymbol={THALES_CURRENCY}
                            isNonStable={true}
                            isAllowing={isAllowing}
                            onSubmit={handleAllowance}
                            onClose={() => setOpenApprovalModal(false)}
                        />
                    )}
                </Container>
            </Wrapper>
            <History />
        </GridWrapper>
    );
};

const GridWrapper = styled(FlexDivColumnCentered)`
    align-items: center;
    width: 100%;
`;

const Wrapper = styled(FlexDivColumnCentered)`
    padding: 1px;
    border-radius: 15px;
    margin: 100px 10px 40px 10px;
    width: 60%;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        margin: 0;
        width: 100%;
    }
`;

const Container = styled(FlexDivColumn)`
    background: ${(props) => props.theme.background.primary};
    border-radius: 15px;
    padding: 30px 60px 40px 60px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 30px 20px 40px 20px;
    }
`;

const Header = styled(FlexDiv)`
    text-transform: uppercase;
    justify-content: center;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.5px;
    color: ${(props) => props.theme.textColor.primary};
`;

const InfoSection = styled.span`
    color: ${(props) => props.theme.textColor.tertiary};
    margin: 30px 0;
    font-size: 15px;
    margin-bottom: 20px;
    text-align: justify;
`;

const NetworkSwitchContainer = styled(FlexDivColumn)`
    position: relative;
    margin-top: 10px;
    margin-bottom: 15px;
    z-index: 2;
`;

const NetworkSwitchLabel = styled(FlexDivStart)`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 15px;
    min-width: 50px;
    align-items: center;
`;

const NetworkSwitchWrapper = styled(FlexDivCentered)`
    margin-top: 5px;
    background: ${(props) => props.theme.button.background.secondary};
    border-radius: 8px;
`;

const ArrowContainer = styled(FlexDivCentered)`
    color: ${(props) => props.theme.textColor.tertiary};
    margin-top: 10px;
    margin-bottom: 10px;
    > i {
        font-size: 30px;
    }
    @media (max-width: 1192px) {
        margin-bottom: 5px;
    }
`;

const EstimationContainer = styled(FlexDivColumnCentered)`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 13px;
    line-height: 18px;
`;

const EstimationRow = styled(FlexDivSpaceBetween)``;

const EstimationDataLabel = styled(FlexDiv)`
    color: ${(props) => props.theme.textColor.tertiary};
`;

const EstimationData = styled(FlexDiv)`
    font-weight: 700;
`;

const SubmitButtonContainer = styled(FlexDivColumnCentered)`
    margin-top: 40px;
    align-items: center;
`;

const SlippageContainer = styled(FlexDivCentered)`
    position: absolute;
    right: 5px;
    top: -5px;
`;

const SlippageDropDown = styled(FlexDivCentered)`
    z-index: 9999;
    position: absolute;
    top: 30px;
    right: 0;
    border-radius: 8px;
    background: ${(props) => props.theme.background.primary};
    width: 260px;
    max-width: 280px;
    padding: 10px 15px;
    user-select: none;
    box-shadow: -15px 13px 31px -3px rgba(0, 0, 0, 0.46);
`;

const DetailsIcon = styled.i`
    font-size: 20px;
    color: ${(props) => props.theme.textColor.tertiary};
    cursor: pointer;
    margin-bottom: 5px;
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

export default Bridge;
