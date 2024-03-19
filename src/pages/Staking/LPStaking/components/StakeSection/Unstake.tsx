import { useConnectModal } from '@rainbow-me/rainbowkit';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import NumericInput from 'components/fields/NumericInput';
import { LP_TOKEN } from 'constants/currency';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// import { getIsMobile } from 'redux/modules/ui';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { getIsMobile } from 'redux/modules/ui';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDivCentered, FlexDivColumn, FlexDivColumnCentered } from 'styles/common';
import { formatCurrency, formatCurrencyWithKey, truncToDecimals } from 'thales-utils';
import networkConnector from 'utils/networkConnector';
import { refetchLPStakingQueries, refetchTokenQueries } from 'utils/queryConnector';

type Properties = {
    staked: number;
};

const Unstake: React.FC<Properties> = ({ staked }) => {
    const { t } = useTranslation();
    const { openConnectModal } = useConnectModal();
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const isMobile = useSelector((state: RootState) => getIsMobile(state));

    const [isUnstaking, setIsUnstaking] = useState<boolean>(false);
    const [amountToUnstake, setAmountToUnstake] = useState<number | string>('');
    const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
    const { lpStakingRewardsContract } = networkConnector as any;

    const isAmountEntered = Number(amountToUnstake) > 0;
    const insufficientBalance = Number(amountToUnstake) > staked || !staked;

    const isUnstakeButtonDisabled = isUnstaking || !lpStakingRewardsContract || !isWalletConnected;

    const handleUnstakeThales = async () => {
        const { lpStakingRewardsContract } = networkConnector as any;
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        try {
            setIsUnstaking(true);
            const lpStakingRewardsContractWithSigner = lpStakingRewardsContract.connect(
                (networkConnector as any).signer
            );
            const amount = ethers.utils.parseEther(amountToUnstake.toString());
            const tx = await lpStakingRewardsContractWithSigner.withdraw(amount);
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                toast.update(
                    id,
                    getSuccessToastOptions(
                        t('thales-token.gamified-staking.staking.unstake.unstake-confirmation-message'),
                        id
                    )
                );
                refetchTokenQueries(walletAddress, networkId);
                refetchLPStakingQueries(walletAddress, networkId);
                setIsUnstaking(false);
                setAmountToUnstake('');
            }
        } catch (e) {
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsUnstaking(false);
        }
    };

    const getSubmitButton = () => {
        if (!isWalletConnected) {
            return <StakingButton onClick={openConnectModal}>{t('common.wallet.connect-your-wallet')}</StakingButton>;
        }
        if (insufficientBalance) {
            return <StakingButton disabled={true}>{t(`common.errors.insufficient-staking-balance`)}</StakingButton>;
        }
        if (!isAmountEntered) {
            return <StakingButton disabled={true}>{t(`common.errors.enter-amount`)}</StakingButton>;
        }

        return (
            <StakingButton disabled={isUnstakeButtonDisabled} onClick={handleUnstakeThales}>
                {!isUnstaking
                    ? `${t('staking.lp-staking.unstake.name')} ${formatCurrencyWithKey(LP_TOKEN, amountToUnstake)}`
                    : `${t('staking.lp-staking.unstake.unstaking')} ${formatCurrencyWithKey(
                          LP_TOKEN,
                          amountToUnstake
                      )}...`}
            </StakingButton>
        );
    };

    const onMaxClick = () => {
        setAmountToUnstake(truncToDecimals(staked, 8));
    };

    useEffect(() => {
        setIsAmountValid(
            Number(amountToUnstake) === 0 || (Number(amountToUnstake) > 0 && Number(amountToUnstake) <= staked)
        );
    }, [amountToUnstake, staked]);

    return (
        <>
            <SectionContentContainer>
                <StakeInputContainer marginTop={10}>
                    <FlexDivCentered>
                        <NumericInput
                            value={amountToUnstake}
                            onChange={(_, value) => setAmountToUnstake(value)}
                            disabled={isUnstaking}
                            placeholder={t('common.enter-amount')}
                            label={t('staking.lp-staking.unstake.amount-to-unstake')}
                            onMaxButton={onMaxClick}
                            showValidation={!isAmountValid}
                            validationMessage={t(`common.errors.insufficient-staking-balance`, {
                                currencyKey: LP_TOKEN,
                            })}
                            balance={
                                isWalletConnected ? `${t('common.balance')}: ${formatCurrency(staked)}` : undefined
                            }
                            width="100%"
                            containerWidth={isMobile ? '100%' : '70%'}
                        />
                    </FlexDivCentered>
                </StakeInputContainer>
                <StakeButtonDiv>{getSubmitButton()}</StakeButtonDiv>
            </SectionContentContainer>
        </>
    );
};

export const StakingButton = styled.button<{ padding?: string; disabled?: boolean; width?: string }>`
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

export const ClaimMessage = styled.div<{ invisible?: boolean; color?: string; above?: boolean }>`
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.25px;
    color: ${(props) => (props.color ? props.color : props.theme.warning.textColor.primary)};
    ${(props) => (props.above ? 'margin-bottom: 10px;' : 'margin-top: 10px;')}
    visibility: ${(props) => (props.invisible ? 'hidden' : 'visible')};
    min-height: 16px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 12px;
    }
`;

export const SectionContentContainer = styled(FlexDivColumn)`
    height: 100%;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding: 0 5px 0 5px;
    }
`;

export const StakeButtonDiv = styled(FlexDivColumnCentered)`
    align-items: center;
`;

export const StakeInputContainer = styled.div<{ marginTop?: number; mediaMarginBottom?: number }>`
    display: flex;
    flex-direction: column;
    position: relative;
    ${(props) => (props.marginTop ? 'margin-top: ' + props.marginTop + 'px;' : '')}
    @media (max-width: 1192px) {
        ${(props) => (props.mediaMarginBottom ? 'margin-bottom: ' + props.mediaMarginBottom + 'px;' : '')}
    }
`;

export default Unstake;
