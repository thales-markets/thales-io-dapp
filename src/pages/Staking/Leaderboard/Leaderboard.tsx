import TimeRemaining from 'components/TimeRemaining';
import { USD_SIGN } from 'constants/currency';
import useStakersDataLeaderboardQuery from 'queries/token/useStakersDataLeaderboardQuery';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { useTheme } from 'styled-components';
import { FlexDiv, FlexDivColumnBottom, FlexDivColumnSpaceBetween } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import snxJSConnector from 'utils/snxJSConnector';
import PeriodDropdown from '../components/PeriodDropdown';
import { InfoDiv, SectionDescription, SectionTitle } from '../styled-components';
import Table from './Table';
import { Bottom, Container, LeaderboardBreakdownTitle, Top } from './styled-components';

const Leaderboard: React.FC = () => {
    const { t } = useTranslation();

    const theme = useTheme();

    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const [period, setPeriod] = useState(0);
    const [currentPeriod, setCurrentPeriod] = useState(-1);

    useEffect(() => {
        const { stakingThalesContract } = snxJSConnector;

        stakingThalesContract?.periodsOfStaking().then((period: number) => {
            setPeriod(period);
            setCurrentPeriod(period);
        });
    }, []);

    const leaderboardQuery = useStakersDataLeaderboardQuery(
        walletAddress,
        networkId,
        period,
        Number(period) === Number(currentPeriod),
        {
            enabled: Number(period) >= 0 && Number(currentPeriod) >= 0,
        }
    );

    const stakingData = useMemo(() => {
        if (leaderboardQuery.isSuccess && leaderboardQuery.data) {
            return leaderboardQuery.data.leaderboard;
        }
        return [];
    }, [leaderboardQuery.isSuccess, leaderboardQuery.data]);

    const globalData = useMemo(() => {
        if (leaderboardQuery.isSuccess && leaderboardQuery.data) {
            return leaderboardQuery.data.data;
        }
        return {
            globalVaults: 0,
            globalLp: 0,
            globalTrading: 0,
            tradingPoints: 0,
            vaultPoints: 0,
            lpPoints: 0,
            globalPoints: 0,
            tradingMultiplier: 0,
            vaultMultiplier: 0,
            lpMultiplier: 0,
            estimationForOneThales: 0,
            maxStakingMultiplier: 0,
        };
    }, [leaderboardQuery.isSuccess, leaderboardQuery.data]);

    const closingDate = useMemo(() => {
        if (Number(period) === Number(currentPeriod) && leaderboardQuery.isSuccess && leaderboardQuery.data) {
            return leaderboardQuery.data.closingDate;
        }
        return Date.now();
    }, [leaderboardQuery.isSuccess, leaderboardQuery.data, period, currentPeriod]);

    return (
        <>
            <Container>
                <Top>
                    <FlexDiv gap="30px">
                        <FlexDivColumnSpaceBetween>
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--hourglass" />
                                    {t('staking.leaderboard.time-left.title')}
                                </span>
                                <span>
                                    <TimeRemaining
                                        end={closingDate}
                                        textColor={theme.textColor.secondary}
                                        fontSize={18}
                                        showFullCounter
                                        fontWeight={700}
                                    />
                                </span>
                            </SectionTitle>
                            <FlexDivColumnBottom>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.time-left.points-for')}</span>
                                    <span>{formatCurrencyWithKey('', globalData.estimationForOneThales, 2)}</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.time-left.multiplier')}</span>
                                    <span>{globalData.maxStakingMultiplier}X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.time-left.total-points')}</span>
                                    <span>{formatCurrencyWithKey('', globalData.globalPoints, 2)}</span>
                                </InfoDiv>
                            </FlexDivColumnBottom>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumnSpaceBetween>
                            <SectionDescription>{t('staking.leaderboard.time-left.description')}</SectionDescription>
                            <FlexDivColumnBottom>
                                <PeriodDropdown
                                    period={Number(period)}
                                    setPeriod={setPeriod}
                                    allPeriods={[
                                        Number(currentPeriod),
                                        currentPeriod - 1,
                                        currentPeriod - 2,
                                        currentPeriod - 3,
                                    ]}
                                />
                            </FlexDivColumnBottom>
                        </FlexDivColumnSpaceBetween>
                    </FlexDiv>
                </Top>
                <Bottom>
                    <FlexDiv gap="20px">
                        <FlexDivColumnSpaceBetween>
                            <LeaderboardBreakdownTitle>
                                <i className="icon icon--magnifying-glass" />
                                <span>{t('staking.leaderboard.breakdown.trading')}</span>
                            </LeaderboardBreakdownTitle>
                            <div>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.volume')}</span>
                                    <span>{formatCurrencyWithKey(USD_SIGN, globalData.globalTrading, 2)}</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.multiplier')}</span>
                                    <span>{globalData.tradingMultiplier}X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.points')}</span>
                                    <span>{formatCurrencyWithKey('', globalData.tradingPoints, 2)}</span>
                                </InfoDiv>
                            </div>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumnSpaceBetween>
                            <LeaderboardBreakdownTitle>
                                <i className="icon icon--dollar-arrow-circle" />
                                <span>{t('staking.leaderboard.breakdown.amm-lp')}</span>
                            </LeaderboardBreakdownTitle>
                            <div>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.volume')}</span>
                                    <span>{formatCurrencyWithKey(USD_SIGN, globalData.globalLp, 2)}</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.multiplier')}</span>
                                    <span>{globalData.lpMultiplier}X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.points')}</span>
                                    <span>{formatCurrencyWithKey('', globalData.lpPoints, 2)}</span>
                                </InfoDiv>
                            </div>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumnSpaceBetween>
                            <LeaderboardBreakdownTitle>
                                <i className="icon icon--thales-cog" />
                                <span>{t('staking.leaderboard.breakdown.vaults')}</span>
                            </LeaderboardBreakdownTitle>
                            <div>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.volume')}</span>
                                    <span>{formatCurrencyWithKey(USD_SIGN, globalData.globalVaults, 2)}</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.multiplier')}</span>
                                    <span>{globalData.vaultMultiplier}X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.points')}</span>
                                    <span>{formatCurrencyWithKey('', globalData.vaultPoints, 2)}</span>
                                </InfoDiv>
                            </div>
                        </FlexDivColumnSpaceBetween>
                    </FlexDiv>
                </Bottom>
            </Container>
            <Table stakingData={stakingData} isLoading={leaderboardQuery.isLoading} />
        </>
    );
};

export default Leaderboard;
