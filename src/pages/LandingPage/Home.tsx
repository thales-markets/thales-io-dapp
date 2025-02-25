import { ReactComponent as LogoTransparent } from 'assets/images/logo-transparent.svg';
import overflow from 'assets/lotties/overflow.json';
import Collapse from 'components/Collapse';
import Loader from 'components/Loader';
import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import Lottie from 'lottie-react';
import useStatsQuery from 'queries/dashboard/useStatsQuery';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { FlexDivSpaceAround } from 'styles/common';
import { AllStats } from 'types/statistics';
import { buildHref } from 'utils/routes';
import EcosystemApps from './components/EcosystemApps';
import OverToken from './components/OverToken';
import SportBetting from './components/SportBetting';
import Stats from './components/Stats';
import Timeline from './components/Timeline';
import Footer from './Footer';
import {
    Backers,
    Description,
    FooterLine,
    Header,
    HighlightTitle,
    HomeIcon,
    IconLink,
    LinkButton,
    Logo,
    LogoBackgroundContainer,
    LottieContainer,
    Partners,
    PartnersContainer,
    Section,
    SectionSlogan,
    SectionSloganHighlight,
    SectionTitle,
    SectionTitleLink,
    SectionTitleLinkArrow,
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
                <Header>
                    <LogoBackgroundContainer>
                        <LogoTransparent />
                    </LogoBackgroundContainer>
                    <Logo className="overtime-icon overtime-icon--overtime" />
                    <Title>
                        <HighlightTitle>{t('home.fully-onchain')} </HighlightTitle>
                        {t('home.sportsbook-ecosystem')}
                    </Title>
                </Header>
                <Section>
                    <SectionTitle>{t('home.ecosystem-apps.title')}</SectionTitle>
                    <EcosystemApps />
                </Section>
                <Section>
                    <SectionSlogan>
                        <SectionSloganHighlight>{t('home.sport-betting.titleHighlight')}</SectionSloganHighlight>{' '}
                        {t('home.sport-betting.title')}
                    </SectionSlogan>
                    <SportBetting />
                </Section>
                <Stats duneStats={duneStats} tvl={TVL} />
                <OverToken />
                <Section>
                    <SectionSlogan>
                        <SectionSloganHighlight>{t('home.over-deflationary.titleHighlight')}</SectionSloganHighlight>{' '}
                        {t('home.over-deflationary.title')}
                    </SectionSlogan>
                    <Description>{t('home.over-deflationary.description')}</Description>

                    <LottieContainer>
                        <Lottie animationData={overflow} />
                    </LottieContainer>
                </Section>
                <Section>
                    <SectionSlogan align="center">
                        {t('home.infrastructure.title')}{' '}
                        <SectionSloganHighlight>{t('home.infrastructure.titleHighlight')}</SectionSloganHighlight>
                    </SectionSlogan>
                    {!isMobile && (
                        <PartnersContainer>
                            <Partners>
                                <SPAAnchor href={LINKS.Chainlink}>
                                    <HomeIcon fontSize="10em" className="overtime-icon overtime-icon--chainlink" />
                                </SPAAnchor>
                                <SPAAnchor href={LINKS.Optimism}>
                                    <HomeIcon fontSize="11em" className="overtime-icon overtime-icon--optimism" />
                                </SPAAnchor>
                                <SPAAnchor href={LINKS.Arbitrum}>
                                    <HomeIcon fontSize="11em" className="overtime-icon overtime-icon--arbitrum" />
                                </SPAAnchor>
                                <SPAAnchor href={LINKS.Base}>
                                    <HomeIcon fontSize="9em" className="overtime-icon overtime-icon--base" />
                                </SPAAnchor>
                            </Partners>
                            <Backers>
                                <SPAAnchor href={LINKS.Pyth}>
                                    <HomeIcon fontSize="9em" className="overtime-icon overtime-icon--pyth" />
                                </SPAAnchor>
                                <SPAAnchor href={LINKS.Framework}>
                                    <HomeIcon fontSize="11em" className="overtime-icon overtime-icon--framework" />
                                </SPAAnchor>
                                <SPAAnchor href={LINKS.Particle}>
                                    <HomeIcon fontSize="13em" className="overtime-icon overtime-icon--particle" />
                                </SPAAnchor>
                                <SPAAnchor href={LINKS.Biconomy}>
                                    <HomeIcon fontSize="11em" className="overtime-icon overtime-icon--biconomy" />
                                </SPAAnchor>
                            </Backers>
                        </PartnersContainer>
                    )}
                    {isMobile && (
                        <>
                            <FlexDivSpaceAround>
                                <HomeIcon fontSize="9em" className="overtime-icon overtime-icon--chainlink">
                                    <IconLink onClick={() => window.open(LINKS.Chainlink)} />
                                </HomeIcon>
                                <HomeIcon fontSize="9em" className="overtime-icon overtime-icon--optimism">
                                    <IconLink onClick={() => window.open(LINKS.Optimism)} />
                                </HomeIcon>
                            </FlexDivSpaceAround>
                            <FlexDivSpaceAround>
                                <HomeIcon fontSize="10em" className="overtime-icon overtime-icon--arbitrum">
                                    <IconLink onClick={() => window.open(LINKS.Arbitrum)} />
                                </HomeIcon>
                                <HomeIcon fontSize="7em" className="overtime-icon overtime-icon--base">
                                    <IconLink onClick={() => window.open(LINKS.Base)} />
                                </HomeIcon>
                            </FlexDivSpaceAround>
                            <FlexDivSpaceAround>
                                <HomeIcon fontSize="7em" className="overtime-icon overtime-icon--pyth">
                                    <IconLink onClick={() => window.open(LINKS.Pyth)} />
                                </HomeIcon>
                                <HomeIcon fontSize="9em" className="overtime-icon overtime-icon--framework">
                                    <IconLink onClick={() => window.open(LINKS.Framework)} />
                                </HomeIcon>
                            </FlexDivSpaceAround>
                            <FlexDivSpaceAround>
                                <HomeIcon fontSize="10em" className="overtime-icon overtime-icon--particle">
                                    <IconLink onClick={() => window.open(LINKS.Particle)} />
                                </HomeIcon>
                                <HomeIcon fontSize="9em" className="overtime-icon overtime-icon--biconomy">
                                    <IconLink onClick={() => window.open(LINKS.Biconomy)} />
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
                    <SectionSlogan>
                        <SectionSloganHighlight>{t('home.integrations.titleHighlight')}</SectionSloganHighlight>{' '}
                        {t('home.integrations.title')}
                    </SectionSlogan>
                    <Description marginBottom={50}>{t('home.integrations.description')}</Description>
                    <Collapse
                        title={t('home.integrations.sports-markets-api-title')}
                        additionalStyling={{ downwardsArrowAlignRight: true, titleMarginRight: '5px' }}
                    >
                        <Description marginBottom={20}>
                            <span>{t('home.integrations.sports-markets-api-description')}</span>
                            <SPAAnchor href={LINKS.SportsIntegration}>
                                <LinkButton>{t('home.integrations.integrate-with-overtime-button')}</LinkButton>
                            </SPAAnchor>
                        </Description>
                    </Collapse>
                    <Collapse
                        title={t('home.integrations.speed-markets-api-title')}
                        additionalStyling={{ downwardsArrowAlignRight: true, titleMarginRight: '5px' }}
                    >
                        <Description marginBottom={20}>
                            <span>{t('home.integrations.speed-markets-api-description')}</span>
                            <SPAAnchor href={LINKS.SpeedMarketsIntegration}>
                                <LinkButton>{t('home.integrations.integrate-with-speed-markets-button')}</LinkButton>
                            </SPAAnchor>
                        </Description>
                    </Collapse>
                </Section>
                <Section>
                    <SectionTitleLink>
                        <SPAAnchor href={buildHref(ROUTES.DAO.Home)} scrollTop={true}>
                            {t('home.governance.title-link')} <SectionTitleLinkArrow />
                        </SPAAnchor>
                    </SectionTitleLink>
                    <SectionSlogan>
                        {t('home.governance.title')}{' '}
                        <SectionSloganHighlight>{t('home.governance.titleHighlight')}</SectionSloganHighlight>
                    </SectionSlogan>
                    <Description marginBottom={20}>{t('home.governance.description')}</Description>
                    <SPAAnchor href={buildHref(ROUTES.DAO.Home)} scrollTop={true}>
                        <LinkButton>{t('home.governance.explore-overtime-dao-button')}</LinkButton>
                    </SPAAnchor>
                </Section>
                <Section marginBottom={80}>
                    <SectionSlogan>{t('home.timeline.title')}</SectionSlogan>
                    <Timeline />
                </Section>
                <FooterLine />
            </Wrapper>
            <Footer />
        </Suspense>
    );
};

export default Home;
