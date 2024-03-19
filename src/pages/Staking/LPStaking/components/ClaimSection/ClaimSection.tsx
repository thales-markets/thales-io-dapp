import { useConnectModal } from '@rainbow-me/rainbowkit';
import Button from 'components/Button';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import { CRYPTO_CURRENCY_MAP, THALES_CURRENCY } from 'constants/currency';
import { ethers } from 'ethers';
import useLPStakingQuery from 'queries/token/useLPStakingQuery';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled, { useTheme } from 'styled-components';
import { FlexDiv } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { ThemeInterface } from 'types/ui';
import networkConnector from 'utils/networkConnector';
import { refetchLPStakingQueries, refetchTokenQueries } from 'utils/queryConnector';

const ClaimSection: React.FC = () => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));

    const [isClaiming, setIsClaiming] = useState(false);

    const { openConnectModal } = useConnectModal();

    const theme: ThemeInterface = useTheme();

    const lpStakingQuery = useLPStakingQuery(walletAddress, networkId, {
        enabled: isAppReady,
    });

    const rewards = lpStakingQuery.isSuccess && lpStakingQuery.data ? Number(lpStakingQuery.data.rewards) : 0;
    const secondRewards =
        lpStakingQuery.isSuccess && lpStakingQuery.data ? Number(lpStakingQuery.data.secondRewards) : 0;

    const { lpStakingRewardsContract } = networkConnector as any;

    const handleClaimStakingRewards = async () => {
        if (rewards || secondRewards) {
            const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
            try {
                setIsClaiming(true);
                const lpStakingRewardsContractWithSigner = lpStakingRewardsContract.connect(
                    (networkConnector as any).signer
                );
                const tx = (await lpStakingRewardsContractWithSigner.getReward()) as ethers.ContractTransaction;
                const txResult = await tx.wait();

                if (txResult && txResult.transactionHash) {
                    toast.update(id, getSuccessToastOptions(t('thales-token.lp-staking.claim.claimed'), id));
                    refetchTokenQueries(walletAddress, networkId);
                    refetchLPStakingQueries(walletAddress, networkId);
                    setIsClaiming(false);
                }
            } catch (e) {
                console.log(e);
                toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
                setIsClaiming(false);
            }
        }
    };

    const getClaimButton = () => {
        if (!isWalletConnected) {
            return (
                <Button
                    backgroundColor={theme.button.background.tertiary}
                    textColor={theme.button.textColor.tertiary}
                    fontSize={'13px'}
                    additionalStyles={{ fontWeight: '800', textTransform: 'uppercase', marginTop: '15px' }}
                    onClick={() => openConnectModal?.()}
                >
                    {t('common.wallet.connect-your-wallet')}
                </Button>
            );
        }

        const buttonDisabled = isClaiming || (!rewards && !secondRewards);

        return (
            <Button
                backgroundColor={theme.button.background.tertiary}
                textColor={theme.button.textColor.tertiary}
                fontSize={'13px'}
                additionalStyles={{ fontWeight: '800', textTransform: 'uppercase', marginTop: '15px' }}
                onClick={handleClaimStakingRewards}
                disabled={buttonDisabled}
            >
                {isClaiming
                    ? t('staking.lp-staking.claim.claiming-rewards') + ` ...`
                    : t('staking.lp-staking.claim.claim-rewards')}
            </Button>
        );
    };

    return (
        <Wrapper>
            <ClaimWrapper>
                <Balance>{`${formatCurrencyWithKey(THALES_CURRENCY, rewards)} + ${formatCurrencyWithKey(
                    CRYPTO_CURRENCY_MAP.OP,
                    secondRewards
                )}`}</Balance>
                {getClaimButton()}
            </ClaimWrapper>
        </Wrapper>
    );
};

const Wrapper = styled(FlexDiv)`
    flex-direction: column;
`;

const Balance = styled.span`
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${(props) => props.theme.textColor.secondary};
`;

const ClaimWrapper = styled(FlexDiv)`
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default ClaimSection;
