import {
    getDefaultToastContent,
    getErrorToastOptions,
    getLoadingToastOptions,
    getSuccessToastOptions,
} from 'components/ToastMessage/ToastMessage';
import { THALES_CURRENCY } from 'constants/currency';
import { ethers } from 'ethers';
import useUserVestingDataQuery from 'queries/token/useUserVestingDataQuery';
import { useEffect, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { FlexDivCentered, FlexDivColumn } from 'styles/common';
import { formatCurrency, formatCurrencyWithKey, formatShortDate } from 'thales-utils';
import { UserVestingData } from 'types/token';
import { refetchTokenQueries } from 'utils/queryConnector';
import snxJSConnector from 'utils/snxJSConnector';
import { SectionDescription, SectionTitle, StakingButton } from '../styled-components';
import YourTransactions from './Transactions';
import {
    Amount,
    AvailableToVestWrapper,
    Container,
    DescriptionWrapper,
    HighlightedDescText,
    ScheduleAmount,
    ScheduleContainer,
    ScheduleDate,
    ScheduleDot,
    ScheduleLine,
    ScheduleWrapper,
    VestingWrapper,
} from './styled-components';

const Vesting: React.FC = () => {
    const { t } = useTranslation();

    const [isClaiming, setIsClaiming] = useState(false);
    const [lastValidUserVestingData, setLastValidUserVestingData] = useState<UserVestingData | undefined>(undefined);

    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));

    const { escrowThalesContract } = snxJSConnector as any;

    const userVestingDataQuery = useUserVestingDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    useEffect(() => {
        if (userVestingDataQuery.isSuccess && userVestingDataQuery.data) {
            setLastValidUserVestingData(userVestingDataQuery.data);
        }
    }, [userVestingDataQuery.isSuccess, userVestingDataQuery.data]);

    const userVestingData: UserVestingData | undefined = useMemo(() => {
        if (userVestingDataQuery.isSuccess && userVestingDataQuery.data) {
            return userVestingDataQuery.data;
        }
        return lastValidUserVestingData;
    }, [userVestingDataQuery.isSuccess, userVestingDataQuery.data, lastValidUserVestingData]);

    const scheduleData = userVestingData ? userVestingData.vestingSchedule : [];
    const claimable = userVestingData ? userVestingData.claimable : 0;
    const rawClaimable = userVestingData ? userVestingData.rawClaimable : '0';

    const handleVest = async () => {
        const id = toast.loading(getDefaultToastContent(t('common.progress')), getLoadingToastOptions());
        try {
            setIsClaiming(true);
            const escrowThalesContractWithSigner = escrowThalesContract.connect((snxJSConnector as any).signer);

            const tx = (await escrowThalesContractWithSigner.vest(rawClaimable)) as ethers.ContractTransaction;
            const txResult = await tx.wait();

            if (txResult && txResult.transactionHash) {
                toast.update(id, getSuccessToastOptions(t('staking.vesting.confirmation-message'), id));
                refetchTokenQueries(walletAddress, networkId);
                setIsClaiming(false);
            }
        } catch (e) {
            console.log(e);
            toast.update(id, getErrorToastOptions(t('common.errors.unknown-error-try-again'), id));
            setIsClaiming(false);
        }
    };

    const getVestButton = () => {
        const disabled = isClaiming || !+claimable;
        return (
            <StakingButton padding="5px 30px" onClick={handleVest} disabled={disabled}>
                {!isClaiming
                    ? t('staking.vesting.vest') + ` ${formatCurrencyWithKey(THALES_CURRENCY, claimable)}`
                    : t('staking.vesting.vesting') + ` ${formatCurrencyWithKey(THALES_CURRENCY, claimable)}...`}
            </StakingButton>
        );
    };

    return (
        <>
            <Container marginBottom={isWalletConnected ? '0' : '50px'}>
                <FlexDivColumn>
                    <VestingWrapper gap="20px">
                        <AvailableToVestWrapper>
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--staking" />
                                    {t('staking.vesting.title')}
                                </span>
                            </SectionTitle>
                            <Amount>{formatCurrencyWithKey(THALES_CURRENCY, claimable, 0, true)}</Amount>
                        </AvailableToVestWrapper>
                        <DescriptionWrapper>
                            <SectionDescription>
                                <Trans
                                    i18nKey="staking.vesting.description"
                                    components={{
                                        strong: <HighlightedDescText />,
                                    }}
                                />
                            </SectionDescription>
                            {/* <VestingValid>{t('staking.vesting.vested-until')} 30. November 2023.</VestingValid> */}
                        </DescriptionWrapper>
                    </VestingWrapper>
                    <FlexDivCentered>{getVestButton()}</FlexDivCentered>
                </FlexDivColumn>
            </Container>
            {isWalletConnected && (
                <ScheduleWrapper>
                    {scheduleData.map((data, index) => {
                        return (
                            <ScheduleContainer key={index}>
                                <ScheduleAmount>
                                    <div>{formatCurrency(data.amount)}</div>
                                    <div>{THALES_CURRENCY}</div>
                                </ScheduleAmount>
                                <ScheduleDot />
                                <ScheduleLine invisible={scheduleData.length - 1 === index} />
                                <ScheduleDate>{formatShortDate(data.date)}</ScheduleDate>
                            </ScheduleContainer>
                        );
                    })}
                </ScheduleWrapper>
            )}
            <YourTransactions width="60%" />
        </>
    );
};

export default Vesting;
