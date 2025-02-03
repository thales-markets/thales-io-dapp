import { isAddress } from '@ethersproject/address';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import SPAAnchor from 'components/SPAAnchor';
import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import TextInput from 'components/fields/TextInput';
import LINKS from 'constants/links';
import useStakingClaimOnBehalfQuery from 'queries/token/useStakingClaimOnBehalfQuery';
import useUserStakingDataQuery from 'queries/token/useUserStakingData';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getIsAppReady } from 'redux/modules/app';
import { getIsMobile } from 'redux/modules/ui';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { useTheme } from 'styled-components';
import { FlexDiv, FlexDivCentered, FlexDivColumn, FlexDivColumnSpaceBetween, Icon } from 'styles/common';
import { getAddress, getEtherscanAddressLink } from 'thales-utils';
import networkConnector from 'utils/networkConnector';
import { refetchClaimOnBehalf } from 'utils/queryConnector';
import { SectionDescription, SectionTitle, StakingButton } from '../styled-components';
import YourTransactions from './Transactions';
import {
    ArrowIcon,
    Bottom,
    ClaimContainer,
    Container,
    Message,
    Middle,
    StyledLink,
    Subtitle,
    ValidationMessage,
} from './styled-components';

const AccPreferences: React.FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    const { openConnectModal } = useConnectModal();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '-';
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const [destAddress, setDestAddress] = useState<string>('');
    const [isMerging, setIsMerging] = useState<boolean>(false);
    const [claimAccount, setClaimAccount] = useState<string>('');
    const [isSubmittingClaim, setIsSubmittingClaim] = useState<boolean>(false);
    const { stakingThalesContract } = networkConnector as any;

    const isMobile = useSelector(getIsMobile);

    const isDestAddressEntered = destAddress !== undefined && destAddress.trim() !== '';
    const isDestAddressValid =
        !isWalletConnected ||
        destAddress === undefined ||
        destAddress.trim() === '' ||
        (isAddress(walletAddress) && isAddress(destAddress) && getAddress(walletAddress) !== getAddress(destAddress));

    const srcStakingThalesQuery = useUserStakingDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    const destStakingThalesQuery = useUserStakingDataQuery(destAddress, networkId, {
        enabled: isAppReady && isDestAddressValid && !!destAddress,
    });

    const isAccountMergingEnabled =
        srcStakingThalesQuery.isSuccess && srcStakingThalesQuery.data
            ? srcStakingThalesQuery.data.mergeAccountEnabled
            : true;

    const hasSrcAccountSomethingToClaim =
        srcStakingThalesQuery.isSuccess && srcStakingThalesQuery.data ? srcStakingThalesQuery.data.rewards > 0 : false;
    const isSrcAccountUnstaking =
        srcStakingThalesQuery.isSuccess && srcStakingThalesQuery.data
            ? srcStakingThalesQuery.data.unstakingAmount > 0
            : false;
    const hasDestAccountSomethingToClaim =
        srcStakingThalesQuery.isSuccess && destStakingThalesQuery.data
            ? destStakingThalesQuery.data.rewards > 0
            : false;
    const isDestAccountUnstaking =
        destStakingThalesQuery.isSuccess && destStakingThalesQuery.data
            ? destStakingThalesQuery.data.unstakingAmount > 0
            : false;

    const isMergeBlocked =
        isAccountMergingEnabled &&
        (hasSrcAccountSomethingToClaim ||
            isSrcAccountUnstaking ||
            hasDestAccountSomethingToClaim ||
            isDestAccountUnstaking);

    const isMergingButtonDisabled =
        isMerging ||
        !isDestAddressEntered ||
        !isDestAddressValid ||
        !isWalletConnected ||
        !isAccountMergingEnabled ||
        isMergeBlocked;

    const stakingClaimOnBehalfQuery = useStakingClaimOnBehalfQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    const isClaimAccountEntered = claimAccount !== undefined && claimAccount.trim() !== '';
    const isClaimAccountValid =
        !isWalletConnected ||
        claimAccount === undefined ||
        claimAccount.trim() === '' ||
        (isAddress(walletAddress) && isAddress(claimAccount) && getAddress(walletAddress) !== getAddress(claimAccount));

    const canClaimOnBehalf =
        stakingClaimOnBehalfQuery.isSuccess && stakingClaimOnBehalfQuery.data !== undefined && isAddress(claimAccount)
            ? stakingClaimOnBehalfQuery.data.enabledAddresses.includes(claimAccount.toLowerCase())
            : undefined;

    const enabledAddresses =
        stakingClaimOnBehalfQuery.isSuccess && stakingClaimOnBehalfQuery.data !== undefined
            ? stakingClaimOnBehalfQuery.data.enabledAddresses
            : [];

    const isClaimButtonDisabled =
        isSubmittingClaim ||
        !isClaimAccountEntered ||
        !isClaimAccountValid ||
        !isWalletConnected ||
        canClaimOnBehalf === undefined;

    const handleMerge = async () => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        try {
            setIsMerging(true);

            const stakingThalesContractWithSigner = stakingThalesContract.connect((networkConnector as any).signer);

            const tx = await stakingThalesContractWithSigner.mergeAccount(getAddress(destAddress));
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                toast.update(id, getSuccessToastOptions(t('acc-preferences.delegate.confirmation-message'), id));
                setDestAddress('');
                setIsMerging(false);
            }
        } catch (e) {
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsMerging(false);
        }
    };

    const getMergeButton = () => {
        if (!isWalletConnected) {
            return (
                <StakingButton padding="5px 30px" onClick={openConnectModal}>
                    {t('common.wallet.connect-your-wallet')}
                </StakingButton>
            );
        }
        if (!isDestAddressValid && isAccountMergingEnabled && !isMergeBlocked) {
            return (
                <StakingButton padding="5px 30px" disabled={true}>
                    {t(`common.errors.invalid-address`)}
                </StakingButton>
            );
        }
        if (!isDestAddressEntered && isAccountMergingEnabled && !isMergeBlocked) {
            return (
                <StakingButton padding="5px 30px" disabled={true}>
                    {t(`common.errors.enter-address`)}
                </StakingButton>
            );
        }
        return (
            <StakingButton padding="5px 30px" disabled={isMergingButtonDisabled} onClick={handleMerge}>
                {isMerging ? t('staking.acc-preferences.merge.merging') : t('staking.acc-preferences.merge.merge')}
            </StakingButton>
        );
    };

    const getBlockedMergeMessage = () => {
        return (
            <>
                <div>{t('staking.acc-preferences.merge.merge-blocked-message.title')}:</div>
                <span>
                    {hasSrcAccountSomethingToClaim && (
                        <ValidationMessage>
                            {t('staking.acc-preferences.merge.merge-blocked-message.src-claim')}
                        </ValidationMessage>
                    )}
                    {isSrcAccountUnstaking && (
                        <ValidationMessage>
                            {t('staking.acc-preferences.merge.merge-blocked-message.src-unstaking')}
                        </ValidationMessage>
                    )}
                    {hasDestAccountSomethingToClaim && (
                        <ValidationMessage>
                            {t('staking.acc-preferences.merge.merge-blocked-message.dest-claim')}
                        </ValidationMessage>
                    )}
                    {isDestAccountUnstaking && (
                        <ValidationMessage>
                            {t('staking.acc-preferences.merge.merge-blocked-message.dest-unstaking')}
                        </ValidationMessage>
                    )}
                </span>
            </>
        );
    };

    const handleClaimSubmit = async () => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        try {
            setIsSubmittingClaim(true);

            const stakingThalesContractWithSigner = stakingThalesContract.connect((networkConnector as any).signer);

            const tx = await stakingThalesContractWithSigner.setCanClaimOnBehalf(
                getAddress(claimAccount),
                !canClaimOnBehalf
            );
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                refetchClaimOnBehalf(walletAddress, networkId);
                toast.update(
                    id,
                    getSuccessToastOptions(
                        canClaimOnBehalf
                            ? t('staking.acc-preferences.claim.disable-button.confirmation-message')
                            : t('staking.acc-preferences.claim.enable-button.confirmation-message'),
                        id
                    )
                );
                setClaimAccount('');
                setIsSubmittingClaim(false);
            }
        } catch (e) {
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsSubmittingClaim(false);
        }
    };

    const getClaimButton = () => {
        if (!isWalletConnected) {
            return <StakingButton onClick={openConnectModal}>{t('common.wallet.connect-your-wallet')}</StakingButton>;
        }
        if (!isClaimAccountValid) {
            return <StakingButton disabled={true}>{t(`common.errors.invalid-address`)}</StakingButton>;
        }
        if (!isClaimAccountEntered) {
            return <StakingButton disabled={true}>{t(`common.errors.enter-address`)}</StakingButton>;
        }
        return (
            <StakingButton disabled={isClaimButtonDisabled} onClick={handleClaimSubmit}>
                {!canClaimOnBehalf
                    ? !isSubmittingClaim
                        ? t('staking.acc-preferences.claim.enable-button.label')
                        : t('staking.acc-preferences.claim.enable-button.progress-label')
                    : !isSubmittingClaim
                    ? t('staking.acc-preferences.claim.disable-button.label')
                    : t('staking.acc-preferences.claim.disable-button.progress-label')}
            </StakingButton>
        );
    };

    return (
        <>
            <Container>
                <Middle>
                    <FlexDiv gap="20px">
                        <FlexDivColumnSpaceBetween gap={isMobile ? '10px' : '20px'}>
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--merge" />
                                    {t('staking.acc-preferences.merge.title')}
                                </span>
                            </SectionTitle>
                            <FlexDivColumn>
                                <Subtitle>{t('staking.acc-preferences.source')}:</Subtitle>
                                <TextInput inputFontSize="14px" value={walletAddress} disabled={true} />
                            </FlexDivColumn>
                            <FlexDivCentered>
                                <Icon
                                    color={theme.textColor.tertiary}
                                    iconSize={24}
                                    className="icon icon--circle-arrow-down"
                                />
                            </FlexDivCentered>
                            <FlexDivColumn>
                                <Subtitle>{t('staking.acc-preferences.destination')}:</Subtitle>
                                <TextInput
                                    inputFontSize="14px"
                                    value={destAddress}
                                    onChange={(e: any) => setDestAddress(e.target.value)}
                                    disabled={
                                        isMerging || !isAccountMergingEnabled || isMergeBlocked || !isWalletConnected
                                    }
                                    placeholder={t('common.enter-address')}
                                    showValidation={!isDestAddressValid}
                                    validationMessage={t(`common.errors.invalid-address`)}
                                />
                            </FlexDivColumn>
                            <FlexDivCentered>{getMergeButton()}</FlexDivCentered>
                            {!isAccountMergingEnabled && (
                                <Message>{t('staking.acc-preferences.merge.merge-account-disabled')}</Message>
                            )}
                            {isMergeBlocked && <Message>{getBlockedMergeMessage()}</Message>}
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumn>
                            <Subtitle>{t('staking.acc-preferences.merge.subtitle')}</Subtitle>
                            <SectionDescription>{t('staking.acc-preferences.merge.description-1')}</SectionDescription>
                            <SectionDescription>{t('staking.acc-preferences.merge.description-2')}</SectionDescription>
                        </FlexDivColumn>
                    </FlexDiv>
                </Middle>
                <Bottom>
                    <ClaimContainer>
                        <FlexDivColumnSpaceBetween gap="20px">
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--claim" />
                                    {t('staking.acc-preferences.claim.title')}
                                </span>
                            </SectionTitle>
                            <Subtitle>{t('staking.acc-preferences.claim.subtitle')}:</Subtitle>
                            <FlexDivColumn>
                                <TextInput
                                    inputFontSize="14px"
                                    margin={'0 0 10px 0'}
                                    value={claimAccount}
                                    onChange={(e: any) => setClaimAccount(e.target.value)}
                                    disabled={isSubmittingClaim || !isWalletConnected}
                                    placeholder={t('common.enter-address')}
                                    showValidation={!isClaimAccountValid}
                                    width="100%"
                                ></TextInput>
                                <FlexDivCentered>{getClaimButton()}</FlexDivCentered>
                            </FlexDivColumn>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumn gap="20px">
                            <SectionDescription>
                                <Trans
                                    i18nKey={t('staking.acc-preferences.claim.description')}
                                    components={{
                                        tip: <SPAAnchor href={LINKS.Token.TIP66} />,
                                        guide: <SPAAnchor href={LINKS.Token.ClaimOnBehalfGuide} />,
                                    }}
                                />
                            </SectionDescription>
                            {!!enabledAddresses.length && (
                                <Subtitle>{t('staking.acc-preferences.claim.enabled-accounts-subtitle')}:</Subtitle>
                            )}
                            {enabledAddresses.map((enabledAddress, index) => (
                                <StyledLink
                                    key={index}
                                    href={getEtherscanAddressLink(networkId, enabledAddress)}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {enabledAddress}
                                    <ArrowIcon width="8" height="8" />
                                </StyledLink>
                            ))}
                        </FlexDivColumn>
                    </ClaimContainer>
                </Bottom>
            </Container>
            <YourTransactions width="60%" />
        </>
    );
};

export default AccPreferences;
