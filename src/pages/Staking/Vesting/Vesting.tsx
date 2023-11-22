import { FlexDiv, FlexDivColumnSpaceBetween } from 'styles/common';
import YourTransactions from '../StakingTab/Transactions';
import { SectionDescription, SectionTitle, StakingButton } from '../styled-components';
import { Container, VestingValid } from './styled-components';

const Vesting: React.FC = () => {
    return (
        <>
            <Container>
                <FlexDiv gap="10px">
                    <FlexDivColumnSpaceBetween>
                        <SectionTitle>
                            <span>
                                <i className="icon icon--staking" />
                                Available to vest
                            </span>
                            <span>98,659.31 THALES</span>
                        </SectionTitle>
                        <div>
                            <StakingButton padding="5px 30px">Vest</StakingButton>
                        </div>
                    </FlexDivColumnSpaceBetween>
                    <FlexDivColumnSpaceBetween>
                        <SectionDescription>
                            Vest your THALES staking rewards in escrow. THALES ongoing rewards are subject to 10 weeks
                            vesting. Escrowed THALES is calculated in your staked THALES balance.
                        </SectionDescription>
                        <VestingValid>Vested until 30. November 2023.</VestingValid>
                    </FlexDivColumnSpaceBetween>
                </FlexDiv>
            </Container>
            <YourTransactions width="60%" />
        </>
    );
};

export default Vesting;
