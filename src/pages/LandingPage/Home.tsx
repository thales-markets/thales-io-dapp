import React, { CSSProperties, Suspense } from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import Loader from 'components/Loader';
import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import { FlexDiv, FlexDivCentered } from 'styles/common';
import buyingAnimation from 'assets/lotties/homepage-buying.json';
import sellingAnimation from 'assets/lotties/homepage-selling.json';
import MILESTONES from './milestones';

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
                        <Description>
                            Thales Markets Purchase positions on Crypto Prices with a specific strike price at a
                            predetermined expiry date. Use Thales markets Vaults with automated trading strategies or
                            provide liquidity to the Thales AMM
                        </Description>
                        <Description>
                            Overtime is a Premier onchain Sports Positioning Markets platform built on Thales AMM
                            Architecture. Be the house by providing the liquidity to the AMM or use Vaults with
                            automated trading strategies
                        </Description>
                        <Description>
                            Tale of Thales is a web 3 Metaverse game that takes you through retro pixel experience of an
                            ancient Greek town of Miletus while teaching you how Thales Markets trading works.
                        </Description>
                        <Description>
                            Spongly is Sports Markets dapp with a social twist built on top of Thales' SportsAMM. Take
                            an opportunity to copy trade best sport traders. Use trading wisdom of the best
                        </Description>
                        <Description>
                            FlipEth is fast paced simplified crypto markets, users can trade shorter time frames of 1
                            hour to 24 hours. Every win rewards you with 100% of initial bet size.
                        </Description>
                    </EcosystemApps>
                </EcosystemSection>
                <Section>
                    <SectionTitleLink>
                        Tailored for Developers <SectionTitleLinkArrow />
                    </SectionTitleLink>
                    <SectionSlogan>Seamless Integration and Boundless Possibilities</SectionSlogan>
                    <Description marginBottom={20}>
                        To the developers poised to shape the future: Thales is your canvas. Our protocol is
                        meticulously designed to ensure that you have a frictionless experience in developing and
                        deploying your applications. With comprehensive resources, including in-depth developer
                        documentation and a vibrant Discord community, Thales empowers you to realize your vision with
                        precision and ease.
                    </Description>
                    <HomeButton>Integrate with Thales</HomeButton>
                </Section>
                <Section>
                    <SectionSlogan>Every Possible Outcome As An Erc20</SectionSlogan>
                    <Description marginBottom={20}>
                        With Thales' advanced smart contracts, you can effortlessly tokenize any outcome backed by an
                        available oracle. What truly distinguishes the Thales protocol is its ironclad guarantee of
                        claim liquidity once you enter a market. This assurance stems from the elimination of
                        counterparty risks, fortified by our decentralized contracts, ensuring unparalleled safety and
                        reliability for every user.
                    </Description>
                </Section>
                <div>
                    <LottieContaienr>
                        <Lottie animationData={buyingAnimation} style={buyingAnimationStyle} />
                    </LottieContaienr>
                    <StepsSection>
                        <Description>
                            <div>Step 1:</div>
                            User sends 50$ to ThalesAMM to buy 100 BTC UP tokens
                        </Description>
                        <Description>
                            <div>Step 2:</div> AMM sends 100$ from LP pool to BTC Market Contract to mint 100 UP and 100
                            DOWN tokens
                        </Description>
                        <Description>
                            <div>Step 3:</div> AMM sends newly minted 100 UP tokens to User
                        </Description>
                    </StepsSection>
                    <LottieContaienr>
                        <Lottie animationData={sellingAnimation} style={sellingAnimationStyle} />
                    </LottieContaienr>
                    <StepsSection>
                        <Description>
                            <div>Step 1:</div>
                            User sends positional tokens to ThalesAMM
                        </Description>
                        <Description>
                            <div>Step 2:</div> AMM buys tokens from user and sends him the money
                        </Description>
                    </StepsSection>
                </div>
                <Section>
                    <SectionTitleLink>
                        Community-Centric Governance <SectionTitleLinkArrow />
                    </SectionTitleLink>
                    <SectionSlogan>Steering the Future, Together</SectionSlogan>
                    <Description marginBottom={20}>
                        At Thales, we believe in the collective wisdom of our community. Our governance structure,
                        underpinned by ThalesDAO and the Thales Council, is a testament to our commitment to
                        decentralized decision-making. Every strategic move, every initiative, is guided by the voice of
                        our community. Through a transparent and robust DAO voting mechanism, we ensure that Thales
                        remains of the community, by the community, and for the community.
                    </Description>
                    <HomeButton>Explore Thales DAO</HomeButton>
                </Section>
                <Section>
                    <SectionSlogan>Timeline</SectionSlogan>
                    <MilestonesContainer>
                        {MILESTONES.map((milestone, index) => (
                            <Milestone isLast={MILESTONES.length - 1 === index} index={index + 1}>
                                <MilestoneDate>{milestone.date}</MilestoneDate>
                                <MilestoneDescription>{milestone.description}</MilestoneDescription>
                            </Milestone>
                        ))}
                    </MilestonesContainer>
                </Section>
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
    margin-top: 150px;
`;

const Description = styled.div<{ marginBottom?: number }>`
    color: #a9abbb;
    text-align: justify;
    font-family: MontserratLight;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0')}px;
`;

const Section = styled.div`
    margin-top: 100px;
`;

const SectionSlogan = styled.div`
    color: white;
    text-align: justify;
    font-family: MontserratBold;
    font-size: 40px;
    font-style: normal;
    line-height: 120%;
    margin: 15px 0;
`;

const SectionTitleLink = styled.div`
    color: #a9abbb;
    font-family: NunitoExtraLight;
    font-size: 13px;
    font-style: normal;
    line-height: 120%;
    text-transform: uppercase;
`;

const SectionTitleLinkArrow = styled(ArrowHyperlinkIcon)`
    color: #a9abbb;
    width: 9px;
    height: 9px;
`;

const LottieContaienr = styled(FlexDivCentered)`
    margin-top: -50px;
`;

const StepsSection = styled(FlexDivCentered)`
    align-items: flex-start;
    margin-top: -50px;
    gap: 50px;
    & > div {
        width: 15%;
    }
    & > div > div {
        color: white;
    }
`;

const MilestonesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 60px;
    column-gap: 20px;
    padding: 20px 0;
`;

const Milestone = styled.div<{ index: number; isLast: boolean }>`
    height: 80px;
    border-radius: 8px;
    background: #313652;
    box-shadow: -15px 13px 31px -3px rgba(0, 0, 0, 0.46);
    padding: 15px 20px;
    transform-style: preserve-3d;
    &:before {
        content: '';
        height: 60px;
        position: absolute;
        border-radius: 10px 0 0 0;
        border-top: ${(props) =>
            props.index > 4 && props.index % 4 === 1 ? '#424451 solid 6px' : 'transparent solid 6px'};
        border-left: ${(props) => (props.index > 4 && props.index % 4 === 1 ? '#424451 solid 6px' : '0')};
        z-index: -1;
        width: calc(100% + 20px);
        transform: translateZ(-1px);
        top: calc(-50% + 6px);
        left: 50%;
    }
    &:after {
        content: '';
        height: 60px;
        position: absolute;
        border-radius: ${(props) => ((props.index + 1) % 4 === 0 ? '0 0 10px 0' : '0')};
        border-top: ${(props) =>
            props.isLast || props.index % 4 === 0 ? 'transparent solid 6px' : '#424451 solid 6px'};
        border-right: ${(props) => ((props.index + 1) % 4 === 0 ? '#424451 solid 6px' : '0')};
        border-bottom: ${(props) =>
            props.isLast || (props.index + 3) % 4 == 0 || props.index % 4 === 0
                ? 'transparent solid 6px'
                : '#424451 solid 6px'};
        z-index: -1;
        width: calc(100% + 20px);
        transform: translateZ(-1px);
        top: 50%;
        left: 50%;
    }
`;

const MilestoneDate = styled.div`
    color: white;
    font-family: MontserratBold;
    font-size: 13px;
    font-style: normal;
    line-height: normal;
    text-transform: uppercase;
`;

const MilestoneDescription = styled.div`
    color: #a9abbb;
    font-family: MontserratLight;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 155%;
`;

const buyingAnimationStyle: CSSProperties = {
    width: '50%',
};

const sellingAnimationStyle: CSSProperties = {
    width: '29.7%',
};
