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
    LottieContainer,
    StepsSection,
    MilestonesContainer,
    Milestone,
    MilestoneDate,
    MilestoneDescription,
    HomeIcon,
    Highlight,
    SocialIcon,
} from './styled-components';
import { FlexDivCentered, FlexDivColumn, FlexDivSpaceAround, FlexDivSpaceBetween } from 'styles/common';
import Footer from './Footer';
import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';

const Home: React.FC = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Wrapper>
                <About>
                    <Title>
                        Thales<span>Protocol</span>
                    </Title>
                    <Subtitle>
                        A permissionless ecosystem where every derivative market is a unique smart contract,
                    </Subtitle>
                    <Subtitle>
                        Powered by pioneering AMM architecture and permissionless liquidity pools, any oracle provided
                        pre-event probability data and post-event results data can be made into a tokenized derivative
                        market by using the Thales Protocol architecture.
                    </Subtitle>
                    <SPAAnchor href={LINKS.Github}>
                        <SocialIcon className="icon icon--github" />
                    </SPAAnchor>
                    <SPAAnchor href={LINKS.Discord}>
                        <SocialIcon className="icon icon--discord" />
                    </SPAAnchor>
                    <SPAAnchor href={LINKS.Twitter}>
                        <SocialIcon className="icon icon--twitter" />
                    </SPAAnchor>
                </About>
                <StatsSection>
                    <SectionTitle>Total protocol volume</SectionTitle>
                    <Stat>$ 944,459,682</Stat>
                </StatsSection>
                <StatsSection>
                    <SectionTitle>Total value locked</SectionTitle>
                    <Stat>$ 145,548,562</Stat>
                </StatsSection>
                <StatsSection>
                    <SectionTitle>Total unique users</SectionTitle>
                    <Stat>548,562</Stat>
                </StatsSection>
                <HomeButton>
                    See All Stats <ArrowHyperlinkIcon />
                </HomeButton>
                <EcosystemSection>
                    <SectionTitle>Ecosystem Apps</SectionTitle>
                    <EcosystemApps>
                        <FlexDivColumn>
                            <HomeIcon fontSize="10em" className="icon icon--thales-markets" />
                            <Description>
                                Digital Options marketplace built using Thales architecture. Thales Markets allows
                                anyone to buy positions on crypto strike prices on specific dates. Any user can receive
                                a fixed payout if a specific price condition is met at a specific expiry date. Choice of
                                conditions vary from UP, DOWN, IN or OUT compared to chosen strike price(s).
                            </Description>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <HomeIcon fontSize="10em" className="icon icon--overtime" />
                            <Description>
                                Onchain Sports Markets Automated Market Maker (AMM) interface with integrated Parlay AMM
                                architecture. Built on top of Thales Protocol technology, Overtime offers seamless user
                                experience for all sports enthusiasts while bolstering transparent full
                                collateralization at all times and permissionless security of the Ethereum network.
                            </Description>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <HomeIcon fontSize="10em" className="icon icon--spongly" />
                            <Description>
                                Spongly is Sports Markets dapp built on top of Thales' SportsAMM and ParlayAMM with a
                                social twist. Take an opportunity to copy trade best sports traders, view individual
                                wallets success rates and have a more detailed overview of all global parlay tickets.
                                Use trading wisdom of the best to your own advantage!
                            </Description>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <HomeIcon style={{ height: '80px' }} fontSize="6em" className="icon icon--telegram" />
                            <Description>
                                By connecting Thales smart contracts to Telegram Bot trading interfaces, several new
                                projects were born. These projects utilize simple trading experience within the easily
                                accessible Telegram app to grow their userbase while leveraging the Thales collateral
                                and onchain market making architecture to provide the backend.
                            </Description>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <HomeIcon fontSize="10em" className="icon icon--tale-of-thales" />
                            <Description>
                                Tale of Thales is a Metaverse minigame that takes you through retro pixel experience of
                                an ancient Greek town of Miletus while teaching you how Thales Markets trading works.
                                You can play the single-player or you can join the multiplayer metaverse, explore the
                                infinity hotel, chat with other players or mint NFTs.
                            </Description>
                        </FlexDivColumn>
                    </EcosystemApps>
                </EcosystemSection>
                <Section>
                    <SectionSlogan>Investors</SectionSlogan>
                    <FlexDivSpaceBetween>
                        <HomeIcon className="icon icon--framework" />
                        <HomeIcon fontSize="6em" className="icon icon--lao" />
                        <HomeIcon className="icon icon--zee-prime" />
                        <HomeIcon fontSize="12em" className="icon icon--daedalus" />
                        <HomeIcon fontSize="9em" className="icon icon--koji" />
                    </FlexDivSpaceBetween>
                </Section>
                <Section>
                    <SectionTitleLink>
                        Tailored for Developers <SectionTitleLinkArrow />
                    </SectionTitleLink>
                    <SectionSlogan>Seamless Integration and Boundless Possibilities</SectionSlogan>
                    <Description marginBottom={20} marginTop={20}>
                        To the developers poised to shape the future of simple derivatives trading: Thales is your
                        canvas. Our protocol is meticulously designed to ensure that you have a frictionless experience
                        in developing your applications with Thales infrastructure guaranteeing collateral liquidity,
                        market making and security in the background. With comprehensive resources, including in-depth
                        developer documentation, responsive tech support and a vibrant Discord community, Thales
                        empowers you to realize your vision with precision and ease.
                    </Description>
                    <Highlight>Thales Sport Markets API</Highlight>
                    <Description marginBottom={20} marginTop={20}>
                        Leverage the decentralization of the Ethereum network and it’s Smart Contracts for full
                        collateralization and decentralization of a wide offering of global Sports Games Markets. By
                        using Thales’ Sports API for SportsAMM and ParlayAMM integration, any developer can
                        permissionlessly have access to a worlds most transparent and fair Sports Markets data with
                        included cutting edge liquidity and trading infrastructure.
                    </Description>
                    <Highlight>Thales Digital Options API</Highlight>
                    <Description marginBottom={20} marginTop={20}>
                        Thales Digital Options contracts provide integrators access to Automated Market Maker, on-demand
                        liquidity and collateralization architecture for onchain Digital Options. With various supported
                        assets ranging from crypto assets to commodities, anyone can integrate with ThalesAMM and
                        RangedAMM contracts and provide it’s users simple-to-use and permissionless derivatives trading
                        platform. Users can instantly place a position on whether the selected Asset Pricewill be UP or
                        DOWN from selected Strike Price on selected Strike Date. Similarly, users can place IN or OUT
                        positions on Price Ranges of the same Assets.
                    </Description>
                    <Highlight>Thales Speed Markets API</Highlight>
                    <Description marginBottom={20} marginTop={20}>
                        Thales Speed Markets contracts is the newest Thales Protocol product that leverages Pyth
                        Benchmark oracles to facilitate a front-running-free backend for fast intra-day digital options.
                        Users of Thales Speed Markets contracts are able to speculate on the direction of a Crypto Asset
                        price with custom market expiry that can go as short as 15 minutes. With a fixed potential
                        return of +100% (minus the fees) for any type of open market and thus not needing a pricing
                        algorithm, Thales SpeedMarketsAMM contract is super-lightweight and easy to integrate.
                    </Description>
                    <HomeButton>Integrate with Thales</HomeButton>
                </Section>
                <Section>
                    <SectionSlogan>Every Possible Outcome As An Erc20</SectionSlogan>
                    <Description>
                        Thales Protocol architecture tokenizes all unique positions as ERC20 tokens. Every market has a
                        set of unique ERC20 token types that cover all potential exclusive outcomes of that market.
                        These tokenized positions are minted by locking USD collateral in the designated Market Smart
                        Contract. Each locked 1 USD mints 1 of each type of ERC20 tokenized positions. Only one type of
                        these ERC20 positions can win on market expiry and only that type can claim the locked USD,
                        while the losing ERC20 positions expire worthless. With this permissionless and automated
                        architecture, Thales Protocol guarantees transparent and non-custodial full collateralization
                        for all positions at all times.
                    </Description>
                    <Description>
                        With liquidity and collateralization solved, the next necessary step is pricing the minted
                        positional ERC20 tokens and allowing for a good trading experience to the public. This is where
                        the unique design of Thales Automated Market Maker comes into play. The Thales AMM contract is
                        whitelisted to mint the ERC20 positions by locking the Liquidity Pool collateral funds in the
                        designated market contracts. After minting, the AMM offers the ERC20 positional tokens on-demand
                        to traders based on Algorithmic Probability Pricing that determines the fixed potential payout
                        on market expiry.
                    </Description>
                </Section>
                <div>
                    <Section>
                        <FlexDivCentered>
                            <Highlight>Buying a position example</Highlight>
                        </FlexDivCentered>
                        <LottieContainer>
                            <Lottie animationData={buyingAnimation} style={buyingAnimationStyle} />
                        </LottieContainer>
                        <FlexDivCentered>
                            <StepsSection>
                                <Description>
                                    1. ThalesAMM algorithmic probability pricing quotes BTC UP Options at $0.5 per
                                    Option
                                </Description>
                                <Description>
                                    2. User wants to buy 1000 BTC UP tokens from the ThalesAMM for $500
                                </Description>
                                <Description>3. ThalesAMM takes $1000 from the LP pool</Description>
                                <Description>
                                    4. ThalesAMM deposits $1000 to the Market Contract and mints 1000 BTC UP and 1000
                                    BTC DOWN tokens from the Market Contract
                                </Description>
                                <Description>
                                    5. ThalesAMM receives $500 from the User and sends 1000 BTC UP tokens to the User
                                </Description>
                            </StepsSection>
                        </FlexDivCentered>
                    </Section>
                    <Section>
                        <FlexDivCentered>
                            <Highlight>Exercising a winning position example</Highlight>
                        </FlexDivCentered>
                        <LottieContainer>
                            <Lottie animationData={sellingAnimation} style={sellingAnimationStyle} />
                        </LottieContainer>
                        <FlexDivCentered>
                            <StepsSection>
                                <Description>
                                    1. Bitcoin price was above the Strike Price on the Maturity Date which means that
                                    User’s 1000 BTC UP positions are resolved as winning and every 1 BTC UP token is
                                    redeemable for $1 while BTC DOWN tokens are deemed worthless
                                </Description>
                                <Description>
                                    2. User sends his 1000 BTC UP tokens to the Market Contract and claims the $1000
                                    from the contract
                                </Description>
                            </StepsSection>
                        </FlexDivCentered>
                    </Section>
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
                            <Milestone
                                key={index}
                                isLastRow={index + 1 > Math.floor((MILESTONES.length - 1) / 4) * 4}
                                isLast={MILESTONES.length - 1 === index}
                                index={index + 1}
                            >
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
                        <HomeIcon fontSize="16em" className="icon icon--synthetix" />
                        <HomeIcon fontSize="11em" className="icon icon--optimism" />
                        <HomeIcon fontSize="11em" className="icon icon--arbitrum" />
                    </FlexDivSpaceBetween>
                    <FlexDivSpaceAround>
                        <HomeIcon fontSize="9em" className="icon icon--base" />
                        <HomeIcon fontSize="9em" className="icon icon--pyth" />
                        <HomeIcon fontSize="9em" className="icon icon--iosiro" />
                    </FlexDivSpaceAround>
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
