import { SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { FlexDiv, FlexDivColumnBottom, FlexDivColumnSpaceBetween } from 'styles/common';
import YourTransactions from '../StakingTab/Transactions/YourTransactions';
import PeriodDropdown from '../components/PeriodDropdown';
import { InfoDiv, SectionDescription, SectionTitle } from '../styled-components';
import { Bottom, Container, LeaderboardBreakdownTitle, Top } from './styled-components';

const Leaderboard: React.FC = () => {
    const { t } = useTranslation();

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
                                <span>1d 10h 34m</span>
                            </SectionTitle>
                            <FlexDivColumnBottom>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.time-left.points-for')}</span>
                                    <span>36.63</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.time-left.multiplier')}</span>
                                    <span>2X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.time-left.total-points')}</span>
                                    <span>549,506.26</span>
                                </InfoDiv>
                            </FlexDivColumnBottom>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumnSpaceBetween>
                            <SectionDescription>{t('staking.leaderboard.time-left.description')}</SectionDescription>
                            <FlexDivColumnBottom>
                                <PeriodDropdown
                                    period={1}
                                    setPeriod={function (_value: SetStateAction<number>): void {
                                        throw new Error('Function not implemented.');
                                    }}
                                    allPeriods={[1, 2]}
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
                                    <span>$ 121,351.22</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.multiplier')}</span>
                                    <span>2X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.points')}</span>
                                    <span>549,506.26</span>
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
                                    <span>$ 121,351.22</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.multiplier')}</span>
                                    <span>2X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.points')}</span>
                                    <span>549,506.26</span>
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
                                    <span>$ 121,351.22</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.multiplier')}</span>
                                    <span>2X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>{t('staking.leaderboard.breakdown.points')}</span>
                                    <span>549,506.26</span>
                                </InfoDiv>
                            </div>
                        </FlexDivColumnSpaceBetween>
                    </FlexDiv>
                </Bottom>
            </Container>
            <YourTransactions width="60%" />
        </>
    );
};

export default Leaderboard;
