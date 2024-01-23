import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import { ScreenSizeBreakpoint } from 'enums/ui';
import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import YourTransactions from '../LPStaking/components/Transactions';
import StakeSection from './components/StakeSection';
import StakingData from './components/StakingData';
import Steps from './components/Steps';

const LPStaking: React.FC = () => {
    return (
        <Container>
            <Steps />
            <RowsContainer>
                <StakingData />
            </RowsContainer>
            <Wrapper>
                <StakeSection />
            </Wrapper>
            <RowsContainer>
                <SPAAnchor href={LINKS.LPStaking.Velodrome}>
                    <PoolWrapper>
                        <Logo className="logo logo--velodrome" />
                        <Text>
                            <Trans
                                i18nKey="staking.lp-staking.velodrome-text"
                                components={{
                                    strong: <PoolLabel />,
                                }}
                            />
                        </Text>
                        <Arrow className="icon icon--external-arrow" />
                    </PoolWrapper>
                </SPAAnchor>
                <SPAAnchor href={LINKS.LPStaking.Aerodrome}>
                    <PoolWrapper>
                        <Logo className="logo logo--aerodrome" />
                        <Text>
                            <Trans
                                i18nKey="staking.lp-staking.aerodrome-text"
                                components={{
                                    strong: <PoolLabel />,
                                }}
                            />
                        </Text>
                        <Arrow className="icon icon--external-arrow" />
                    </PoolWrapper>
                </SPAAnchor>
                <SPAAnchor href={LINKS.LPStaking.Camelot}>
                    <PoolWrapper>
                        <Logo className="logo logo--camelot" />
                        <Text>
                            <Trans
                                i18nKey="staking.lp-staking.camelot-text"
                                components={{
                                    strong: <PoolLabel />,
                                }}
                            />
                        </Text>
                        <Arrow className="icon icon--external-arrow" />
                    </PoolWrapper>
                </SPAAnchor>
            </RowsContainer>
            <YourTransactions />
        </Container>
    );
};

const Container = styled.div`
    color: ${(props) => props.theme.textColor.tertiary};
    font-family: Nunito;
    font-size: 13px;
    display: grid;
    width: 60%;
    grid-template-rows: fr 160px;
    column-gap: 10px;
    row-gap: 10px;
    grid-template-areas: 'top' 'bottom';
    z-index: 1;
    > div {
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
    }
`;

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
    gap: 10px;
`;

const Wrapper = styled(FlexDiv)`
    flex-direction: column;
`;

const PoolWrapper = styled(Wrapper)`
    font-size: 13px;
    position: relative;
    padding: 20px;
    background-color: ${(props) => props.theme.background.primary};
    border-radius: 8px;
    cursor: pointer;
`;

const PoolLabel = styled.span`
    font-size: 13px;
    font-weight: 700;
    color: ${(props) => props.theme.textColor.secondary};
`;

const Arrow = styled.i`
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-size: 15px;
`;

const Text = styled.p`
    display: inline;
    margin-top: 20px;
    margin-bottom: 30px;
    flex-direction: c;
    color: ${(props) => props.theme.textColor.primary};
    font-weight: 400;
    line-height: 15px;
`;

const Logo = styled.i`
    color: ${(props) => props.theme.textColor.primary};
`;

export default LPStaking;
