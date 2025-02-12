import LoadingContainer from 'components/LoadingContainer';
import Tooltip from 'components/Tooltip';
import { THALES_CURRENCY } from 'constants/currency';
import useUserStakingDataQuery from 'queries/token/useUserStakingData';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { formatCurrencyWithKey } from 'thales-utils';
import { UserStakingData } from 'types/token';
import { InfoDiv, SectionTitle, TooltipContainer } from '../styled-components';
import YourTransactions from './Transactions';
import Unstake from './Unstake';
import { Bottom, Container, Top, WarningMessage } from './styled-components';

const StakingTab: React.FC = () => {
    const { t } = useTranslation();

    const [lastValidUserStakingData, setLastValidUserStakingData] = useState<UserStakingData | undefined>(undefined);

    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));

    const userStakingDataQuery = useUserStakingDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    useEffect(() => {
        if (userStakingDataQuery.isSuccess && userStakingDataQuery.data) {
            setLastValidUserStakingData(userStakingDataQuery.data);
        }
    }, [userStakingDataQuery.isSuccess, userStakingDataQuery.data]);

    const userStakingData: UserStakingData | undefined = useMemo(() => {
        if (userStakingDataQuery.isSuccess && userStakingDataQuery.data) {
            return userStakingDataQuery.data;
        }
        return lastValidUserStakingData;
    }, [userStakingDataQuery.isSuccess, userStakingDataQuery.data, lastValidUserStakingData]);

    const thalesStaked = userStakingData ? userStakingData.thalesStaked : 0;
    const escrowedBalance = userStakingData ? userStakingData.escrowedBalance : 0;

    const notEligibleForStakingRewards = thalesStaked === 0 && escrowedBalance > 0;

    return (
        <>
            <Container>
                <Top>
                    <LoadingContainer isLoading={userStakingDataQuery.isLoading}>
                        <SectionTitle>
                            <TooltipContainer>
                                <i className="icon icon--person" />
                                {t('staking.staking.my-balance.title')}
                                <Tooltip
                                    overlay={t('staking.rewards.base-rewards.tooltips.your-staked')}
                                    mobileIconFontSize={11}
                                    iconFontSize={11}
                                />
                            </TooltipContainer>
                            <span>{formatCurrencyWithKey(THALES_CURRENCY, escrowedBalance + thalesStaked)}</span>
                        </SectionTitle>
                        {notEligibleForStakingRewards && (
                            <WarningMessage>{t('staking.staking.staking-data.not-eligible-message')}</WarningMessage>
                        )}
                        <div>
                            <InfoDiv>
                                <span>
                                    <TooltipContainer>
                                        {t('staking.staking.my-balance.staked-directly')}
                                        <Tooltip
                                            overlay={t('staking.staking.staking-data.staked-balance-tooltip')}
                                            marginBottom={2}
                                            mobileIconFontSize={11}
                                            iconFontSize={11}
                                        />
                                    </TooltipContainer>
                                </span>
                                <span>{formatCurrencyWithKey(THALES_CURRENCY, thalesStaked)}</span>
                            </InfoDiv>
                            <InfoDiv>
                                <span>
                                    <TooltipContainer>
                                        {t('staking.staking.my-balance.escrowed-balance')}:
                                        <Tooltip
                                            overlay={t('staking.staking.staking-data.escrowed-balance-tooltip')}
                                            marginBottom={2}
                                            mobileIconFontSize={11}
                                            iconFontSize={11}
                                        />
                                    </TooltipContainer>
                                </span>
                                <span>{formatCurrencyWithKey(THALES_CURRENCY, escrowedBalance)}</span>
                            </InfoDiv>
                        </div>
                    </LoadingContainer>
                </Top>
                <Bottom>
                    <Unstake />
                </Bottom>
            </Container>
            <YourTransactions />
        </>
    );
};

export default StakingTab;
