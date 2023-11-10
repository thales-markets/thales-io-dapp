import React, { CSSProperties, Suspense } from 'react';
import Lottie from 'lottie-react';
import Loader from 'components/Loader';
import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import buyingAnimation from 'assets/lotties/homepage-buying.json';
import sellingAnimation from 'assets/lotties/homepage-selling.json';
import MILESTONES from './milestones';
import {
    Wrapper,
    About,
    Title,
    Subtitle,
    StatsSection,
    SectionTitle,
    Stat,
    HomeButton,
    EcosystemSection,
    EcosystemApps,
    Description,
    Section,
    SectionTitleLink,
    SectionTitleLinkArrow,
    SectionSlogan,
    LottieContaienr,
    StepsSection,
    MilestonesContainer,
    Milestone,
    MilestoneDate,
    MilestoneDescription,
    HomeIcon,
} from './styled-components';
import { FlexDiv, FlexDivSpaceBetween } from 'styles/common';
import Footer from './Footer';

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
                    <SectionSlogan>Investors</SectionSlogan>
                    <FlexDiv gap="40px">
                        <HomeIcon className="icon icon--synthetix" />
                        <HomeIcon className="icon icon--zee-prime" />
                        <HomeIcon fontSize="12em" className="icon icon--daedalus" />
                    </FlexDiv>
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
                            <Milestone key={index} isLast={MILESTONES.length - 1 === index} index={index + 1}>
                                <MilestoneDate>{milestone.date}</MilestoneDate>
                                <MilestoneDescription>{milestone.description}</MilestoneDescription>
                            </Milestone>
                        ))}
                    </MilestonesContainer>
                </Section>
                <Section marginBottom={80}>
                    <SectionTitleLink>
                        Infrastructure Partners <SectionTitleLinkArrow />
                    </SectionTitleLink>
                    <FlexDivSpaceBetween>
                        <HomeIcon fontSize="10em" className="icon icon--chainlink" />
                        <HomeIcon fontSize="12em" className="icon icon--optimism" />
                        <HomeIcon fontSize="8em" className="icon icon--base" />
                        <HomeIcon fontSize="10em" className="icon icon--arbitrum" />
                        <HomeIcon fontSize="8em" className="icon icon--pyth" />
                        <HomeIcon fontSize="9em" className="icon icon--iosiro" />
                    </FlexDivSpaceBetween>
                </Section>
            </Wrapper>
            <Footer />
        </Suspense>
    );
};

export default Home;

const buyingAnimationStyle: CSSProperties = {
    width: '50%',
};

const sellingAnimationStyle: CSSProperties = {
    width: '29.7%',
};
