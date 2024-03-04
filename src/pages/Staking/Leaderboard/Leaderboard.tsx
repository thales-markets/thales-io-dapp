import LoadingContainer from 'components/LoadingContainer';
import TimeRemaining from 'components/TimeRemaining';
import { USD_SIGN } from 'constants/currency';
import useStakersDataLeaderboardQuery, {
    StakersWithLeaderboardData,
} from 'queries/token/useStakersDataLeaderboardQuery';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { useTheme } from 'styled-components';
import { FlexDiv, FlexDivCentered, FlexDivColumnBottom, FlexDivColumnSpaceBetween } from 'styles/common';
import { formatCurrencyWithKey, truncateAddress } from 'thales-utils';
import snxJSConnector from 'utils/snxJSConnector';
import PeriodDropdown from '../components/PeriodDropdown';
import { InfoDiv, SectionDescription, SectionTitle } from '../styled-components';
import Table from './Table';
import {
    Bottom,
    Container,
    FlexWrapper,
    Icon,
    Label,
    LeaderboardBreakdownTitle,
    StickyCell,
    StickyExpandedRow,
    StickyRow,
    StickyRowFlex,
    StickyRowWrapper,
    TableText,
    Top,
} from './styled-components';

const Leaderboard: React.FC = () => {
    const { t } = useTranslation();

    const theme = useTheme();

    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const [period, setPeriod] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPeriod, setCurrentPeriod] = useState(-1);

    useEffect(() => {
        try {
            const { stakingThalesContract } = snxJSConnector;

            stakingThalesContract?.periodsOfStaking().then((period: number) => {
                setPeriod(period);
                setCurrentPeriod(period);
                setIsLoading(false);
            });
        } catch (e) {
            console.log('Error ', e);
            setIsLoading(false);
        }
    }, [networkId]);

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

    const stickyRowInfo = useMemo(() => {
        if (stakingData) {
            return stakingData.filter((staker) => staker.id.toLowerCase() === walletAddress.toLowerCase());
        }

        return [];
    }, [stakingData, walletAddress]);

    return (
        <>
            <Container>
                <Top>
                    <LoadingContainer isLoading={leaderboardQuery.isLoading || isLoading}>
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
                                        <span>x{globalData.maxStakingMultiplier}</span>
                                    </InfoDiv>
                                    <InfoDiv>
                                        <span>{t('staking.leaderboard.time-left.total-points')}</span>
                                        <span>{formatCurrencyWithKey('', globalData.globalPoints, 2)}</span>
                                    </InfoDiv>
                                </FlexDivColumnBottom>
                            </FlexDivColumnSpaceBetween>
                            <FlexDivColumnSpaceBetween>
                                <SectionDescription>
                                    {t('staking.leaderboard.time-left.description')}
                                </SectionDescription>
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
                    </LoadingContainer>
                </Top>
                <Bottom>
                    <LoadingContainer isLoading={leaderboardQuery.isLoading || isLoading}>
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
                                        <span>x{globalData.tradingMultiplier}</span>
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
                                        <span>x{globalData.lpMultiplier}</span>
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
                                        <span>x{globalData.vaultMultiplier}</span>
                                    </InfoDiv>
                                    <InfoDiv>
                                        <span>{t('staking.leaderboard.breakdown.points')}</span>
                                        <span>{formatCurrencyWithKey('', globalData.vaultPoints, 2)}</span>
                                    </InfoDiv>
                                </div>
                            </FlexDivColumnSpaceBetween>
                        </FlexDiv>
                    </LoadingContainer>
                </Bottom>
            </Container>
            <Table
                stakingData={stakingData}
                isLoading={leaderboardQuery.isLoading || isLoading}
                stickyRow={stickyRowInfo.length > 0 ? <StickyRowComponent stickyRowInfo={stickyRowInfo} /> : <></>}
            />
        </>
    );
};

const StickyRowComponent: React.FC<{ stickyRowInfo: StakersWithLeaderboardData }> = ({ stickyRowInfo }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    return (
        <>
            <StickyRow onClick={setOpen.bind(this, !open)}>
                <StickyRowWrapper>
                    <StickyRowFlex>
                        <StickyCell first={true}>
                            <TableText>{stickyRowInfo[0].rank}</TableText>
                        </StickyCell>
                        <StickyCell>
                            <TableText>{truncateAddress(stickyRowInfo[0].id, 5, 5)} (YOU)</TableText>
                        </StickyCell>
                        <StickyCell>
                            <TableText>{formatCurrencyWithKey('', stickyRowInfo[0].userRoundBonusPoints, 2)}</TableText>
                        </StickyCell>
                        <StickyCell hide={true}>
                            <TableText>x{formatCurrencyWithKey('', stickyRowInfo[0].stakingMultiplier, 2)}</TableText>
                        </StickyCell>
                        <StickyCell last={true}>
                            <TableText>{stickyRowInfo[0].estimatedRewards}</TableText>
                        </StickyCell>
                    </StickyRowFlex>

                    {open && (
                        <StickyExpandedRow>
                            <FlexWrapper>
                                <FlexDivCentered>
                                    <Icon dark={true} className="sidebar-icon icon--markets" />
                                    <TableText>
                                        {t('thales-token.gamified-staking.rewards.leaderboard.expanded-row.trading')}
                                    </TableText>
                                </FlexDivCentered>
                                <FlexWrapper>
                                    <Label dark={true}>
                                        {t('thales-token.gamified-staking.rewards.leaderboard.expanded-row.points')}
                                    </Label>
                                    <TableText>
                                        {formatCurrencyWithKey('', stickyRowInfo[0].userTradingBasePointsPerRound, 2)}
                                    </TableText>
                                </FlexWrapper>
                            </FlexWrapper>

                            <FlexWrapper>
                                <FlexDivCentered>
                                    <Icon dark={true} className="sidebar-icon icon--liquidity-pool" />
                                    <TableText>
                                        {t('thales-token.gamified-staking.rewards.leaderboard.expanded-row.lp')}
                                    </TableText>
                                </FlexDivCentered>
                                <FlexWrapper>
                                    <Label dark={true}>
                                        {t('thales-token.gamified-staking.rewards.leaderboard.expanded-row.points')}
                                    </Label>
                                    <TableText>
                                        {formatCurrencyWithKey('', stickyRowInfo[0].userLPBasePointsPerRound, 2)}
                                    </TableText>
                                </FlexWrapper>
                            </FlexWrapper>

                            <FlexWrapper>
                                <FlexDivCentered>
                                    <Icon dark={true} className="sidebar-icon icon--vaults" />
                                    <TableText>
                                        {t('thales-token.gamified-staking.rewards.leaderboard.expanded-row.vaults')}
                                    </TableText>
                                </FlexDivCentered>
                                <FlexWrapper>
                                    <Label dark={true}>
                                        {t('thales-token.gamified-staking.rewards.leaderboard.expanded-row.points')}
                                    </Label>
                                    <TableText>
                                        {formatCurrencyWithKey('', stickyRowInfo[0].userVaultBasePointsPerRound, 2)}
                                    </TableText>
                                </FlexWrapper>
                            </FlexWrapper>
                        </StickyExpandedRow>
                    )}
                </StickyRowWrapper>
            </StickyRow>
        </>
    );
};

export default Leaderboard;
