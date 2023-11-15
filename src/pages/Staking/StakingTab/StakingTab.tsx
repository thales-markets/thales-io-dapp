import SwitchInput from 'components/SwitchInput';
import { InfoDiv, SectionTitle, StakingButton, StakingInput } from '../styled-components';
import { Bottom, ButtonContainer, InputContainer, Container, UpperLeft, UpperRight } from './styled-components';
import { useTheme } from 'styled-components';
import { FlexDivCentered } from 'styles/common';

const StakingTab: React.FC = () => {
    const theme = useTheme();
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
            <Bottom>
                <SwitchInput
                    label={{ firstLabel: 'Stake', secondLabel: 'Unstake', fontSize: '18px' }}
                    borderColor={theme.borderColor.secondary}
                    dotBackground={theme.textColor.secondary}
                    dotSize="20px"
                    active={true}
                />
                <InputContainer>
                    <SectionTitle>
                        <span>Amount to stake</span>
                        <span>
                            <i className="icon icon--wallet" />
                            Balance: 841729.98 Thales
                        </span>
                    </SectionTitle>
                </InputContainer>
                <FlexDivCentered>
                    <StakingInput width="400px" />
                </FlexDivCentered>
                <ButtonContainer>
                    <StakingButton padding="5px 20px">Stake</StakingButton>
                </ButtonContainer>
            </Bottom>
        </Container>
    );
};

export default StakingTab;
