import { InfoDiv, SectionTitle } from '../styled-components';
import { Bottom, Container, UpperLeft, UpperRight } from './styled-components';

const StakingTab: React.FC = () => {
    return (
        <Container>
            <UpperLeft>
                <SectionTitle>
                    <span>
                        <i className="icon icon--staking" />
                        Staking data
                    </span>
                </SectionTitle>
                <div>
                    <InfoDiv>
                        <span>APY:</span>
                        <span>20%</span>
                    </InfoDiv>
                    <InfoDiv>
                        <span>My Staking Share:</span>
                        <span>20%</span>
                    </InfoDiv>
                    <InfoDiv>
                        <span>Estimated Rewards:</span>
                        <span>865 THALES</span>
                    </InfoDiv>
                    <InfoDiv>
                        <span>For Date:</span>
                        <span>18.12-21.12</span>
                    </InfoDiv>
                </div>
            </UpperLeft>
            <UpperRight>
                <SectionTitle>
                    <span>
                        <i className="icon icon--person" />
                        My staking balance
                    </span>
                    <span>5000 THALES</span>
                </SectionTitle>
                <div>
                    <InfoDiv>
                        <span>Staked Directly:</span>
                        <span>8265 THALES</span>
                    </InfoDiv>
                    <InfoDiv>
                        <span>Escrowed Balance:</span>
                        <span>865 THALES</span>
                    </InfoDiv>
                </div>
            </UpperRight>
            <Bottom></Bottom>
        </Container>
    );
};

export default StakingTab;
