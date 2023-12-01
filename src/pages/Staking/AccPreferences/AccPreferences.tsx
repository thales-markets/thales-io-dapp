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
import { ZERO_ADDRESS } from 'constants/network';
import { TransactionFilterEnum } from 'enums/token';
import { orderBy } from 'lodash';
import useStakingClaimOnBehalfQuery from 'queries/token/useStakingClaimOnBehalfQuery';
import useUserStakingDataQuery from 'queries/token/useUserStakingData';
import useUserTokenTransactionsQuery from 'queries/token/useUserTokenTransactionsQuery';
import { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { FlexDiv, FlexDivCentered, FlexDivColumn, FlexDivColumnSpaceBetween, FlexDivSpaceBetween } from 'styles/common';
import { getAddress, getEtherscanAddressLink, truncateAddress } from 'thales-utils';
import snxJSConnector from 'utils/snxJSConnector';
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
    Top,
    ValidationMessage,
} from './styled-components';

const AccPreferences: React.FC = () => {
    const { t } = useTranslation();

    const { openConnectModal } = useConnectModal();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '-';
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const [destAddress, setDestAddress] = useState<string>('');
    const [delegateDestAddress, setDelegateDestAddress] = useState<string>('');
    const [isMerging, setIsMerging] = useState<boolean>(false);
    const [isDelegating, setIsDelegating] = useState<boolean>(false);
    const [claimAccount, setClaimAccount] = useState<string>('');
    const [isSubmittingClaim, setIsSubmittingClaim] = useState<boolean>(false);
    const { stakingThalesContract } = snxJSConnector as any;

    const isDestAddressEntered = destAddress !== undefined && destAddress.trim() !== '';
    const isDestAddressValid =
        !isWalletConnected ||
        destAddress === undefined ||
        destAddress.trim() === '' ||
        (isAddress(walletAddress) && isAddress(destAddress) && getAddress(walletAddress) !== getAddress(destAddress));

    const isDelegateDestAddressEntered = delegateDestAddress !== undefined && delegateDestAddress.trim() !== '';
    const isDelegateDestAddressValid =
        !isWalletConnected ||
        delegateDestAddress === undefined ||
        delegateDestAddress.trim() === '' ||
        (isAddress(walletAddress) &&
            isAddress(delegateDestAddress) &&
            getAddress(walletAddress) !== getAddress(delegateDestAddress));

    const srcStakingThalesQuery = useUserStakingDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    const destStakingThalesQuery = useUserStakingDataQuery(destAddress, networkId, {
        enabled: isAppReady && isDestAddressValid && !!destAddress,
    });

    const userTokenTransactionsQuery = useUserTokenTransactionsQuery(
        undefined,
        networkId,
        '[delegateVolume, removeDelegation]',
        {
            enabled: isAppReady && isWalletConnected,
        }
    );

    const userTokenTransactions = useMemo(
        () =>
            userTokenTransactionsQuery.isSuccess && userTokenTransactionsQuery.data
                ? orderBy(userTokenTransactionsQuery.data, ['timestamp', 'blockNumber'], ['asc', 'asc'])
                : [],
        [userTokenTransactionsQuery.isSuccess, userTokenTransactionsQuery.data]
    );

    const addressesThatDelegateToYou = useMemo(() => {
        const map = {} as Record<string, boolean>;
        userTokenTransactions.forEach((tx) => {
            if (tx.destAccount?.toUpperCase() === walletAddress.toUpperCase()) {
                map[tx.account] = true;
            }

            if (tx.type === TransactionFilterEnum.REMOVE_DELEGATION) {
                delete map[tx.account];
            }
        });
        return Object.keys(map);
    }, [userTokenTransactions, walletAddress]);
    console.log(addressesThatDelegateToYou);
    const isAccountMergingEnabled =
        srcStakingThalesQuery.isSuccess && srcStakingThalesQuery.data
            ? srcStakingThalesQuery.data.mergeAccountEnabled
            : true;

    const isUserLPing = srcStakingThalesQuery.data && srcStakingThalesQuery.data?.isUserLPing;
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

    const delegatedVolumeAddress =
        srcStakingThalesQuery.isSuccess && srcStakingThalesQuery.data
            ? srcStakingThalesQuery.data.delegatedVolume
            : ZERO_ADDRESS;

    const isMergeBlocked =
        isAccountMergingEnabled &&
        (hasSrcAccountSomethingToClaim ||
            isSrcAccountUnstaking ||
            isUserLPing ||
            hasDestAccountSomethingToClaim ||
            isDestAccountUnstaking);

    const isMergingButtonDisabled =
        isMerging ||
        !isDestAddressEntered ||
        !isDestAddressValid ||
        !isWalletConnected ||
        !isAccountMergingEnabled ||
        isMergeBlocked;

    const isDelegateButtonDisabled =
        isDelegating || !isDelegateDestAddressEntered || !isDelegateDestAddressValid || !isWalletConnected;

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

            const stakingThalesContractWithSigner = stakingThalesContract.connect((snxJSConnector as any).signer);

            const tx = await stakingThalesContractWithSigner.mergeAccount(getAddress(destAddress));
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                toast.update(
                    id,
                    getSuccessToastOptions(t('thales-token.gamified-staking.merge-account.confirmation-message'), id)
                );
                setDestAddress('');
                setIsMerging(false);
            }
        } catch (e) {
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsMerging(false);
        }
    };

    const handleDelegate = async () => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        try {
            setIsDelegating(true);

            const stakingThalesContractWithSigner = stakingThalesContract.connect((snxJSConnector as any).signer);

            const tx = await stakingThalesContractWithSigner.delegateVolume(
                getAddress(delegatedVolumeAddress !== ZERO_ADDRESS ? ZERO_ADDRESS : delegateDestAddress)
            );
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                toast.update(
                    id,
                    getSuccessToastOptions(
                        t('thales-token.gamified-staking.merge-account.delegation-confirmation-message'),
                        id
                    )
                );
                setDelegateDestAddress('');
                setIsDelegating(false);
            }
        } catch (e) {
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsDelegating(false);
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
                {!isMerging ? t('staking.acc-preferences.merge.merging') : t('staking.acc-preferences.merge.merge')}
            </StakingButton>
        );
    };

    const getDelegateButton = () => {
        if (!isWalletConnected) {
            return (
                <StakingButton padding="5px 30px" onClick={openConnectModal}>
                    {t('common.wallet.connect-your-wallet')}
                </StakingButton>
            );
        }

        if (delegatedVolumeAddress !== ZERO_ADDRESS) {
            return (
                <StakingButton padding="5px 30px" onClick={handleDelegate}>
                    {t(`staking.acc-preferences.delegate.remove-delegation`)}
                </StakingButton>
            );
        }

        if (!isDelegateDestAddressValid) {
            return (
                <StakingButton padding="5px 30px" disabled={true}>
                    {t(`common.errors.invalid-address`)}
                </StakingButton>
            );
        }
        if (!isDelegateDestAddressEntered) {
            return (
                <StakingButton padding="5px 30px" disabled={true}>
                    {t(`common.errors.enter-address`)}
                </StakingButton>
            );
        }

        return (
            <StakingButton padding="5px 30px" disabled={isDelegateButtonDisabled} onClick={handleDelegate}>
                {!isDelegating
                    ? t('staking.acc-preferences.delegate.delegating')
                    : t('staking.acc-preferences.delegate.delegate')}
            </StakingButton>
        );
    };

    const getBlockedMergeMessage = () => {
        return (
            <>
                <div>{t('staking.acc-preferences.merge.merge-blocked-message.title')}:</div>
                <ul>
                    {isUserLPing && (
                        <ValidationMessage>
                            {t('staking.acc-preferences.merge.merge-blocked-message.user-lping')}
                        </ValidationMessage>
                    )}
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
                </ul>
            </>
        );
    };

    const handleClaimSubmit = async () => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        try {
            setIsSubmittingClaim(true);

            const stakingThalesContractWithSigner = stakingThalesContract.connect((snxJSConnector as any).signer);

            const tx = await stakingThalesContractWithSigner.setCanClaimOnBehalf(
                getAddress(claimAccount),
                !canClaimOnBehalf
            );
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
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
                <Top>
                    <FlexDiv gap="20px">
                        <FlexDivColumnSpaceBetween gap="20px">
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--delegate" />
                                    {t('staking.acc-preferences.delegate.title')}
                                </span>
                            </SectionTitle>
                            <FlexDivColumn>
                                <Subtitle>{t('staking.acc-preferences.source')}:</Subtitle>
                                <TextInput value={walletAddress} disabled={true} />
                            </FlexDivColumn>
                            <FlexDivColumn>
                                <Subtitle>{t('staking.acc-preferences.destination')}:</Subtitle>
                                <TextInput
                                    value={
                                        delegatedVolumeAddress !== ZERO_ADDRESS
                                            ? delegatedVolumeAddress
                                            : delegateDestAddress
                                    }
                                    onChange={(e: any) => setDelegateDestAddress(e.target.value)}
                                    disabled={
                                        delegatedVolumeAddress !== ZERO_ADDRESS || isDelegating || !isWalletConnected
                                    }
                                    placeholder={t('common.enter-address')}
                                    showValidation={!isDelegateDestAddressValid}
                                    validationMessage={t(`common.errors.invalid-address`)}
                                />
                            </FlexDivColumn>
                            <FlexDivCentered>{getDelegateButton()}</FlexDivCentered>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumn>
                            <Subtitle>{t('staking.acc-preferences.delegate.subtitle')}</Subtitle>
                            <SectionDescription>
                                {t('staking.acc-preferences.delegate.description-1')}
                            </SectionDescription>
                            <SectionDescription>
                                {t('staking.acc-preferences.delegate.description-2')}
                            </SectionDescription>
                        </FlexDivColumn>
                    </FlexDiv>
                </Top>
                <Middle>
                    <FlexDiv gap="20px">
                        <FlexDivColumnSpaceBetween gap="20px">
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--merge" />
                                    {t('staking.acc-preferences.merge.title')}
                                </span>
                            </SectionTitle>
                            <FlexDivColumn>
                                <Subtitle>{t('staking.acc-preferences.source')}:</Subtitle>
                                <TextInput value={walletAddress} disabled={true} />
                            </FlexDivColumn>
                            <FlexDivColumn>
                                <Subtitle>{t('staking.acc-preferences.destination')}:</Subtitle>
                                <TextInput
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
                            <FlexDivSpaceBetween>
                                <TextInput
                                    margin={'0'}
                                    value={claimAccount}
                                    onChange={(e: any) => setClaimAccount(e.target.value)}
                                    disabled={isSubmittingClaim || !isWalletConnected}
                                    placeholder={t('common.enter-address')}
                                    showValidation={!isClaimAccountValid}
                                    width="100%"
                                ></TextInput>
                                {getClaimButton()}
                            </FlexDivSpaceBetween>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumn gap="20px">
                            <SectionDescription>
                                <Trans
                                    i18nKey={t('staking.acc-preferences.claim.description')}
                                    components={{
                                        guide: <SPAAnchor href={LINKS.Token.TIP66} />,
                                        tip: <SPAAnchor href={LINKS.Token.ClaimOnBehalfGuide} />,
                                    }}
                                />
                            </SectionDescription>
                            {!!enabledAddresses.length && (
                                <Subtitle>{t('staking.acc-preferences.claim.enabled-accounts-subtitle')}:</Subtitle>
                            )}
                            {enabledAddresses.map((enabledAddress) => (
                                <StyledLink
                                    href={getEtherscanAddressLink(networkId, enabledAddress)}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {truncateAddress(enabledAddress)}
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
