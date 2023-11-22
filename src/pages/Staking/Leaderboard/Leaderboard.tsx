import { SetStateAction } from 'react';
import { FlexDiv, FlexDivColumnBottom, FlexDivColumnSpaceBetween } from 'styles/common';
import YourTransactions from '../StakingTab/Transactions/YourTransactions';
import PeriodDropdown from '../components/PeriodDropdown';
import { InfoDiv, SectionDescription, SectionTitle } from '../styled-components';
import { Bottom, Container, LeaderboardBreakdownTitle, Top } from './styled-components';

const Leaderboard: React.FC = () => {
    return (
        <>
            <Container>
                <Top>
                    <FlexDiv gap="30px">
                        <FlexDivColumnSpaceBetween>
                            <SectionTitle>
                                <span>
                                    <i className="icon icon--hourglass" />
                                    Time left in round:
                                </span>
                                <span>1d 10h 34m</span>
                            </SectionTitle>
                            <FlexDivColumnBottom>
                                <InfoDiv>
                                    <span>Points for 1 Thales</span>
                                    <span>36.63</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>Multiplier</span>
                                    <span>2X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>Total Points</span>
                                    <span>549,506.26</span>
                                </InfoDiv>
                            </FlexDivColumnBottom>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumnSpaceBetween>
                            <SectionDescription>
                                Leaderboard for current round is based on estimations of current user balances across LP
                                pools and vaults. Actual points are determined when rounds close.
                            </SectionDescription>
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
                                <span>Trading</span>
                            </LeaderboardBreakdownTitle>
                            <div>
                                <InfoDiv>
                                    <span>Volume</span>
                                    <span>$ 121,351.22</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>Multiplier</span>
                                    <span>2X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>Points</span>
                                    <span>549,506.26</span>
                                </InfoDiv>
                            </div>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumnSpaceBetween>
                            <LeaderboardBreakdownTitle>
                                <i className="icon icon--dollar-arrow-circle" />
                                <span>AMM LP</span>
                            </LeaderboardBreakdownTitle>
                            <div>
                                <InfoDiv>
                                    <span>Volume</span>
                                    <span>$ 121,351.22</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>Multiplier</span>
                                    <span>2X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>Points</span>
                                    <span>549,506.26</span>
                                </InfoDiv>
                            </div>
                        </FlexDivColumnSpaceBetween>
                        <FlexDivColumnSpaceBetween>
                            <LeaderboardBreakdownTitle>
                                <i className="icon icon--thales-cog" />
                                <span>Vaults</span>
                            </LeaderboardBreakdownTitle>
                            <div>
                                <InfoDiv>
                                    <span>Volume</span>
                                    <span>$ 121,351.22</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>Multiplier</span>
                                    <span>2X</span>
                                </InfoDiv>
                                <InfoDiv>
                                    <span>Points</span>
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
