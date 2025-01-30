import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import buyingAnimation from 'assets/lotties/homepage-buying.json';
import sellingAnimation from 'assets/lotties/homepage-selling.json';
import Collapse from 'components/Collapse';
import Loader from 'components/Loader';
import NumberCountdown from 'components/NumberCountdown';
import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import Lottie from 'lottie-react';
import useStatsQuery from 'queries/dashboard/useStatsQuery';
import React, { CSSProperties, Suspense, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { FlexDiv, FlexDivCentered, FlexDivSpaceAround } from 'styles/common';
import { AllStats } from 'types/statistics';
import { buildHref, navigateTo } from 'utils/routes';
import EcosystemApps from './components/EcosystemApps';
import Timeline from './components/Timeline';
import Footer from './Footer';
import {
    About,
    Backers,
    BulletNumberIcon,
    BuySection,
    BuySellSections,
    Description,
    EcosystemSection,
    FooterLine,
    Highlight,
    HighlightTitle,
    HomeButton,
    HomeIcon,
    IconLink,
    Logo,
    LottieContainer,
    Partners,
    Section,
    SectionSlogan,
    SectionSloganHighlight,
    SectionTitle,
    SectionTitleLink,
    SectionTitleLinkArrow,
    SellSection,
    Stat,
    StatsSection,
    StepsSection,
    Title,
    Wrapper,
} from './styled-components';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const [duneStats, setDuneStats] = useState<AllStats>();

    const isMobile = useSelector(getIsMobile);

    const statsQuery = useStatsQuery();
    const TVL = useMemo(() => {
        if (!duneStats?.TVLStats) {
            return 0;
        }
        return (
            duneStats.TVLStats.overtimeParlayTVL +
            duneStats.TVLStats.overtimeSingleTVL +
            duneStats.TVLStats.overtimeV2TVL +
            duneStats.TVLStats.speedMarketsTVL +
            duneStats.TVLStats.thalesLpTVL +
            duneStats.TVLStats.vaultsTVL +
            duneStats.TVLStats.stakingThalesTVL
        );
    }, [duneStats]);

    useEffect(() => {
        if (statsQuery.isSuccess && statsQuery.data) {
            setDuneStats(statsQuery.data);
        }
    }, [statsQuery.isSuccess, statsQuery.data]);

    return (
        <Suspense fallback={<Loader />}>
            <Wrapper>
                <About>
                    <Logo className="overtime-icon overtime-icon--overtime" />
                    <Title>
                        <HighlightTitle>{t('home.fully-onchain')}</HighlightTitle>{' '}
                        <span>{t('home.sportsbook-ecosystem')}</span>
                    </Title>
                </About>
                <EcosystemSection>
                    <SectionTitle>{t('home.ecosystem-apps.title')}</SectionTitle>
                    <EcosystemApps />
                </EcosystemSection>
                <StatsSection>
                    <SectionTitle>{t('home.total-protocol-volume')}</SectionTitle>
                    <Stat>
                        $ <NumberCountdown number={duneStats?.volumeStats?.totalProtocolVolume || 0} />
                    </Stat>
                </StatsSection>
                <StatsSection>
                    <SectionTitle>{t('home.total-value-locked')}</SectionTitle>
                    <Stat>
                        $ <NumberCountdown number={TVL || 0} />
                    </Stat>
                </StatsSection>
                <StatsSection>
                    <SectionTitle>{t('home.total-unique-users')}</SectionTitle>
                    <Stat>
                        <NumberCountdown number={duneStats?.usersStats?.totalUniqueUsers || 0} />
                    </Stat>
                </StatsSection>
                <StatsSection>
                    <SectionTitle>{t('home.markets-created')}</SectionTitle>
                    <Stat>
                        <NumberCountdown number={duneStats?.marketsStats?.totalUniqueMarkets || 0} />
                    </Stat>
                </StatsSection>
                <HomeButton onClick={() => navigateTo(ROUTES.Dashboard)}>
                    {t('home.see-all-stats-button')} <ArrowHyperlinkIcon />
                </HomeButton>
                <Section>
                    <SectionSlogan align="center">{t('home.infrastructure.title')}</SectionSlogan>
                    {!isMobile && (
                        <>
                            <Partners>
                                <SPAAnchor href={LINKS.Synthetix}>
                                    <HomeIcon mobileFontSize="20em" fontSize="17em" className="icon icon--synthetix" />
                                </SPAAnchor>

                                <SPAAnchor href={LINKS.Chainlink}>
                                    <HomeIcon mobileFontSize="8em" fontSize="10em" className="icon icon--chainlink" />
                                </SPAAnchor>
                                <SPAAnchor href={LINKS.Optimism}>
                                    <HomeIcon mobileFontSize="8em" fontSize="11em" className="icon icon--optimism" />
                                </SPAAnchor>
                                <SPAAnchor href={LINKS.Arbitrum}>
                                    <HomeIcon fontSize="11em" className="icon icon--arbitrum" />
                                </SPAAnchor>
                            </Partners>
                            <Backers>
                                <SPAAnchor href={LINKS.Base}>
                                    <HomeIcon fontSize="9em" className="icon icon--base" />
                                </SPAAnchor>
                                <SPAAnchor href={LINKS.Pyth}>
                                    <HomeIcon fontSize="9em" className="icon icon--pyth" />
                                </SPAAnchor>
                                <SPAAnchor href={LINKS.Framework}>
                                    <HomeIcon fontSize="11em" className="icon icon--framework" />
                                </SPAAnchor>
                            </Backers>
                        </>
                    )}
                    {isMobile && (
                        <>
                            <FlexDivCentered>
                                <HomeIcon height="90px" fontSize="20em" className="icon icon--synthetix">
                                    <IconLink onClick={() => window.open(LINKS.Synthetix)} />
                                </HomeIcon>
                            </FlexDivCentered>
                            <FlexDivSpaceAround>
                                <HomeIcon fontSize="9em" className="icon icon--chainlink">
                                    <IconLink onClick={() => window.open(LINKS.Chainlink)} />
                                </HomeIcon>
                                <HomeIcon fontSize="9em" className="icon icon--optimism">
                                    <IconLink onClick={() => window.open(LINKS.Optimism)} />
                                </HomeIcon>
                            </FlexDivSpaceAround>
                            <FlexDivSpaceAround>
                                <HomeIcon fontSize="11em" className="icon icon--arbitrum">
                                    <IconLink onClick={() => window.open(LINKS.Arbitrum)} />
                                </HomeIcon>
                                <HomeIcon fontSize="7em" className="icon icon--base">
                                    <IconLink onClick={() => window.open(LINKS.Base)} />
                                </HomeIcon>
                            </FlexDivSpaceAround>
                            <FlexDivSpaceAround>
                                <HomeIcon fontSize="9em" className="icon icon--pyth">
                                    <IconLink onClick={() => window.open(LINKS.Pyth)} />
                                </HomeIcon>
                                <HomeIcon fontSize="9em" className="icon icon--framework">
                                    <IconLink onClick={() => window.open(LINKS.Framework)} />
                                </HomeIcon>
                            </FlexDivSpaceAround>
                        </>
                    )}
                </Section>
                <Section>
                    <SectionTitleLink>
                        <SPAAnchor href={LINKS.Docs}>
                            {t('home.integrations.title-link')} <SectionTitleLinkArrow />
                        </SPAAnchor>
                    </SectionTitleLink>
                    <SectionSlogan>{t('home.integrations.title')}</SectionSlogan>
                    <Description marginBottom={50} marginTop={20}>
                        {t('home.integrations.description')}
                    </Description>
                    <Collapse
                        title={t('home.integrations.thales-sports-markets-api-title')}
                        additionalStyling={{ downwardsArrowAlignRight: true, titleMarginRight: '5px' }}
                    >
                        <Description marginBottom={20}>
                            <span>{t('home.integrations.thales-sports-markets-api-description')}</span>
                            <SPAAnchor href={LINKS.SportsIntegration}>
                                <HomeButton>{t('home.integrations.integrate-with-thales-sports-button')}</HomeButton>
                            </SPAAnchor>
                        </Description>
                    </Collapse>
                    <Collapse
                        title={t('home.integrations.thales-digital-options-api-title')}
                        additionalStyling={{ downwardsArrowAlignRight: true, titleMarginRight: '5px' }}
                    >
                        <Description marginBottom={20}>
                            <span>{t('home.integrations.thales-digital-options-api-description')}</span>
                            <SPAAnchor href={LINKS.DigitalOptionsIntegration}>
                                <HomeButton>{t('home.integrations.integrate-with-thales-markets-button')}</HomeButton>
                            </SPAAnchor>
                        </Description>
                    </Collapse>
                    <Collapse
                        title={t('home.integrations.thales-speed-markets-api-title')}
                        additionalStyling={{ downwardsArrowAlignRight: true, titleMarginRight: '5px' }}
                    >
                        <Description marginBottom={20}>
                            <span>{t('home.integrations.thales-speed-markets-api-description')}</span>
                            <SPAAnchor href={LINKS.SpeedMarketsIntegration}>
                                <HomeButton>{t('home.integrations.integrate-with-thales-speed-button')}</HomeButton>
                            </SPAAnchor>
                        </Description>
                    </Collapse>
                </Section>
                {isMobile && (
                    <Section>
                        <Collapse
                            title={t('home.buying-selling.title')}
                            hideLine={true}
                            additionalStyling={{ downwardsArrowAlignRight: true, titleMarginRight: '5px' }}
                        >
                            <Description>{t('home.buying-selling.description-1')}</Description>
                            <Description>{t('home.buying-selling.description-2')}</Description>
                        </Collapse>
                    </Section>
                )}
                {!isMobile && (
                    <Section>
                        <SectionSlogan>{t('home.buying-selling.title')}</SectionSlogan>
                        <Description>{t('home.buying-selling.description-1')}</Description>
                        <Description>{t('home.buying-selling.description-2')}</Description>
                    </Section>
                )}
                <BuySellSections>
                    <BuySection>
                        <FlexDivCentered>
                            <Highlight>{t('home.buying-selling.buying.title')}</Highlight>
                        </FlexDivCentered>
                        <LottieContainer>
                            <Lottie animationData={buyingAnimation} style={buyingAnimationStyle} />
                        </LottieContainer>
                        <FlexDivCentered>
                            <StepsSection>
                                <Collapse
                                    headerTextAlign="center"
                                    hideLine
                                    title={t('home.buying-selling.buying.steps-title')}
                                >
                                    <Description marginBottom={5}>
                                        <FlexDiv>
                                            <BulletNumberIcon className="icon icon--bullet-one" />
                                            {t('home.buying-selling.buying.step-1')}
                                        </FlexDiv>
                                    </Description>
                                    <Description marginBottom={5}>
                                        <FlexDiv>
                                            <BulletNumberIcon className="icon icon--bullet-two" />
                                            {t('home.buying-selling.buying.step-2')}
                                        </FlexDiv>
                                    </Description>
                                    <Description marginBottom={5}>
                                        <FlexDiv>
                                            <BulletNumberIcon className="icon icon--bullet-three" />
                                            {t('home.buying-selling.buying.step-3')}
                                        </FlexDiv>
                                    </Description>
                                    <Description marginBottom={5}>
                                        <FlexDiv>
                                            <BulletNumberIcon className="icon icon--bullet-four" />
                                            {t('home.buying-selling.buying.step-4')}
                                        </FlexDiv>
                                    </Description>
                                    <Description marginBottom={5}>
                                        <FlexDiv>
                                            <BulletNumberIcon className="icon icon--bullet-five" />
                                            {t('home.buying-selling.buying.step-5')}
                                        </FlexDiv>
                                    </Description>
                                </Collapse>
                            </StepsSection>
                        </FlexDivCentered>
                    </BuySection>
                    <SellSection>
                        <FlexDivCentered>
                            <Highlight>{t('home.buying-selling.selling.title')}</Highlight>
                        </FlexDivCentered>
                        <LottieContainer>
                            <Lottie animationData={sellingAnimation} style={sellingAnimationStyle} />
                        </LottieContainer>
                        <FlexDivCentered>
                            <StepsSection>
                                <Collapse
                                    headerTextAlign="center"
                                    hideLine
                                    title={t('home.buying-selling.selling.steps-title')}
                                >
                                    <Description marginBottom={5}>
                                        <FlexDiv>
                                            <BulletNumberIcon className="icon icon--bullet-one" />
                                            {t('home.buying-selling.selling.step-1')}
                                        </FlexDiv>
                                    </Description>
                                    <Description marginBottom={5}>
                                        <FlexDiv>
                                            <BulletNumberIcon className="icon icon--bullet-two" />
                                            {t('home.buying-selling.selling.step-2')}
                                        </FlexDiv>
                                    </Description>
                                </Collapse>
                            </StepsSection>
                        </FlexDivCentered>
                    </SellSection>
                </BuySellSections>
                <Section>
                    <SectionTitleLink>
                        <SPAAnchor href={buildHref(ROUTES.About.Governance)} scrollTop={true}>
                            {t('home.governance.title-link')} <SectionTitleLinkArrow />
                        </SPAAnchor>
                    </SectionTitleLink>
                    <SectionSlogan>
                        {t('home.governance.title')}
                        <SectionSloganHighlight>{t('home.governance.titleHighlight')}</SectionSloganHighlight>
                    </SectionSlogan>
                    <Description marginBottom={20}>{t('home.governance.description')}</Description>
                    <SPAAnchor href={buildHref(ROUTES.About.Governance)} scrollTop={true}>
                        <HomeButton>{t('home.governance.explore-overtime-dao-button')}</HomeButton>
                    </SPAAnchor>
                </Section>
                <Section marginBottom={80}>
                    <SectionSlogan>{t('home.timeline.title')}</SectionSlogan>
                    <div>
                        <Timeline />
                    </div>
                </Section>
                <FooterLine />
            </Wrapper>
            <Footer />
        </Suspense>
    );
};

export default Home;

const buyingAnimationStyle: CSSProperties = {
    zIndex: '-1',
};

const sellingAnimationStyle: CSSProperties = {
    zIndex: '-1',
};
