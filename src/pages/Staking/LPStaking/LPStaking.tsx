import React from 'react';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { Container } from '../styled-components';
import ClaimSection from './components/ClaimSection';
import MyStakingBalance from './components/MyStakingBalance';
import StakeSection from './components/StakeSection';
import StakingData from './components/StakingData';
import Steps from './components/Steps';

const LPStaking: React.FC = () => {
    return (
        <Container>
            <Steps />
            <RowsContainer>
                <StakingData />
                <MyStakingBalance />
            </RowsContainer>
            <ClaimSection />
            <Wrapper>
                <StakeSection />
            </Wrapper>
        </Container>
    );
};

const RowsContainer = styled(FlexDiv)`
    flex-direction: row;
    background-color: transparent !important;
    padding: 0 !important;
    justify-content: space-between;
    flex: 1;
    > div {
        flex: 1;
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

const Wrapper = styled(FlexDiv)`
    flex-direction: column;
`;

export default LPStaking;
