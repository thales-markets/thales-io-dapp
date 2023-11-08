import React, { Suspense } from 'react';
import styled from 'styled-components';
import Loader from 'components/Loader';
import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import { FlexDiv } from 'styles/common';

const Home: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Wrapper>
                <About>
                    <Title>
                        Thales<span>Protocol</span>
                    </Title>
                    <Subtitle>A permissionless ecosystem where every market is a unique smart contract,</Subtitle>
                    <Subtitle>powered by AMM-driven liquidity. Pioneering the Future of On-Chain Markets</Subtitle>
                </About>
                <StatsSection>
                    <SectionTitle>Total protocol volume</SectionTitle>
                    <Stat>$ 944,459,682</Stat>
                </StatsSection>
                <StatsSection>
                    <SectionTitle>Total value locked</SectionTitle>
                    <Stat>$ 145,548,562</Stat>{' '}
                </StatsSection>
                <HomeButton>
                    See All Stats <ArrowHyperlinkIcon />
                </HomeButton>
                <EcosystemSection>
                    <SectionTitle>Ecosystem Apps</SectionTitle>
                    <EcosystemApps>
                        <AppDescription>
                            Thales Markets Purchase positions on Crypto Prices with a specific strike price at a
                            predetermined expiry date. Use Thales markets Vaults with automated trading strategies or
                            provide liquidity to the Thales AMM
                        </AppDescription>
                        <AppDescription>
                            Overtime is a Premier onchain Sports Positioning Markets platform built on Thales AMM
                            Architecture. Be the house by providing the liquidity to the AMM or use Vaults with
                            automated trading strategies
                        </AppDescription>
                        <AppDescription>
                            Tale of Thales is a web 3 Metaverse game that takes you through retro pixel experience of an
                            ancient Greek town of Miletus while teaching you how Thales Markets trading works.
                        </AppDescription>
                        <AppDescription>
                            Spongly is Sports Markets dapp with a social twist built on top of Thales' SportsAMM. Take
                            an opportunity to copy trade best sport traders. Use trading wisdom of the best
                        </AppDescription>
                        <AppDescription>
                            FlipEth is fast paced simplified crypto markets, users can trade shorter time frames of 1
                            hour to 24 hours. Every win rewards you with 100% of initial bet size.
                        </AppDescription>
                    </EcosystemApps>
                </EcosystemSection>
            </Wrapper>
        </Suspense>
    );
};

export default Home;

const About = styled.div`
    margin-top: 150px;
    margin-bottom: 50px;
`;

const Wrapper = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    max-width: 1400px;
`;

const Title = styled.div`
    color: white;
    font-family: 'NunitoBold';
    font-weight: bold;
    font-size: 50px;
    font-style: normal;
    line-height: 91.4%;
    letter-spacing: 3.25px;
    text-transform: uppercase;
    & > span {
        font-family: 'NunitoExtraLight';
        font-weight: normal;
    }
`;

const Subtitle = styled.div`
    color: #a9abbb;
    font-family: 'NunitoExtraLight';
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 103%;
    text-transform: capitalize;
`;

const StatsSection = styled.div`
    margin-bottom: 10px;
`;

const SectionTitle = styled.div`
    color: #a9abbb;
    font-family: 'NunitoExtraLight';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
`;

const Stat = styled.div`
    color: #fff;
    font-family: MontserratBold;
    font-size: 50px;
    font-style: normal;
    line-height: normal;
`;

const HomeButton = styled.button`
    color: white;
    border-radius: 8px;
    border: 1px solid #19f8ef;
    text-transform: capitalize;
    background: transparent;
    width: fit-content;
    text-align: center;
    font-family: NunitoBold;
    font-size: 13px;
    line-height: 80%;
    text-transform: capitalize;
    padding: 7px 12px;
`;

const EcosystemApps = styled(FlexDiv)`
    gap: 30px;
`;

const EcosystemSection = styled.div`
    margin-top: 300px;
`;

const AppDescription = styled.div`
    color: #a9abbb;
    text-align: justify;
    font-family: MontserratLight;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
`;
