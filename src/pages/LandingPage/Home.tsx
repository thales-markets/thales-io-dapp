import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import Collapse from 'components/Collapse';
import Loader from 'components/Loader';
import NumberCountdown from 'components/NumberCountdown';
import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import useStatsQuery from 'queries/dashboard/useStatsQuery';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { FlexDivSpaceAround } from 'styles/common';
import { AllStats } from 'types/statistics';
import { buildHref, navigateTo } from 'utils/routes';
import EcosystemApps from './components/EcosystemApps';
import Timeline from './components/Timeline';
import Footer from './Footer';
import {
    About,
    Backers,
    Description,
    EcosystemSection,
    FooterLine,
    HighlightTitle,
    HomeButton,
    HomeIcon,
    IconLink,
    Logo,
    Partners,
    Section,
    SectionSlogan,
    SectionSloganHighlight,
    SectionTitle,
    SectionTitleLink,
    SectionTitleLinkArrow,
    Stat,
    StatsSection,
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
                        <HighlightTitle>{t('home.fully-onchain')} </HighlightTitle>
                        {t('home.sportsbook-ecosystem')}
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
                    <SectionSlogan align="center">
                        {t('home.infrastructure.title')}{' '}
                        <SectionSloganHighlight>{t('home.infrastructure.titleHighlight')}</SectionSloganHighlight>
                    </SectionSlogan>
                    {!isMobile && (
                        <>
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
                        </>
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
                <Section>
                    <SectionTitleLink>
                        <SPAAnchor href={buildHref(ROUTES.About.Governance)} scrollTop={true}>
                            {t('home.governance.title-link')} <SectionTitleLinkArrow />
                        </SPAAnchor>
                    </SectionTitleLink>
                    <SectionSlogan>
                        {t('home.governance.title')}{' '}
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
