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
import Footer from './Footer';
import EcosystemApps from './components/EcosystemApps';
import Timeline from './components/Timeline';
import {
    About,
    Backers,
    BulletNumber,
    BuySection,
    BuySellSections,
    Description,
    EcosystemSection,
    EcosystemTitle,
    FooterLine,
    Highlight,
    HomeButton,
    HomeIcon,
    LottieContainer,
    Partners,
    Section,
    SectionSlogan,
    SectionTitle,
    SectionTitleLink,
    SectionTitleLinkArrow,
    SellSection,
    SocialIcon,
    Stat,
    StatsSection,
    StepsSection,
    Subtitle,
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
                    <Title gap="10px">
                        {t('home.thales')}
                        <span>{t('home.protocol')}</span>
                    </Title>
                    <EcosystemTitle>
                        <SPAAnchor href="https://synthetix.io/">
                            <HomeIcon fontSize="10em" className="icon icon--synthetix" />
                        </SPAAnchor>
                        Ecosystem
                    </EcosystemTitle>
                    <Subtitle>{t('home.protocol-description-1')}.</Subtitle>
                    <Subtitle>{t('home.protocol-description-2')}</Subtitle>
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
                <EcosystemSection>
                    <SectionTitle>{t('home.ecosystem-apps.title')}</SectionTitle>
                    <EcosystemApps />
                </EcosystemSection>
                <Section>
                    <SectionSlogan align="center">{t('home.infrastructure.title')}</SectionSlogan>
                    {!isMobile && (
                        <>
                            <Partners>
                                <SPAAnchor href="https://synthetix.io/">
                                    <HomeIcon mobileFontSize="20em" fontSize="17em" className="icon icon--synthetix" />
                                </SPAAnchor>

                                <SPAAnchor href="https://chain.link/">
                                    <HomeIcon mobileFontSize="8em" fontSize="10em" className="icon icon--chainlink" />
                                </SPAAnchor>
                                <SPAAnchor href="https://www.optimism.io/">
                                    <HomeIcon mobileFontSize="8em" fontSize="11em" className="icon icon--optimism" />
                                </SPAAnchor>
                                <SPAAnchor href="https://arbitrum.io/">
                                    <HomeIcon fontSize="11em" className="icon icon--arbitrum" />
                                </SPAAnchor>
                            </Partners>
                            <Backers>
                                <SPAAnchor href="https://base.org/">
                                    <HomeIcon fontSize="9em" className="icon icon--base" />
                                </SPAAnchor>
                                <SPAAnchor href="https://pyth.network/">
                                    <HomeIcon fontSize="9em" className="icon icon--pyth" />
                                </SPAAnchor>
                                <SPAAnchor href="https://framework.ventures/">
                                    <HomeIcon fontSize="11em" className="icon icon--framework" />
                                </SPAAnchor>
                            </Backers>
                        </>
                    )}
                    {isMobile && (
                        <>
                            <FlexDivCentered>
                                <SPAAnchor href="https://synthetix.io/">
                                    <HomeIcon margin="-35px 0" fontSize="20em" className="icon icon--synthetix" />
                                </SPAAnchor>
                            </FlexDivCentered>
                            <FlexDivSpaceAround>
                                <SPAAnchor href="https://chain.link/">
                                    <HomeIcon fontSize="9em" className="icon icon--chainlink" />
                                </SPAAnchor>
                                <SPAAnchor href="https://www.optimism.io/">
                                    <HomeIcon fontSize="9em" className="icon icon--optimism" />
                                </SPAAnchor>
                            </FlexDivSpaceAround>
                            <FlexDivSpaceAround>
                                <SPAAnchor href="https://arbitrum.io/">
                                    <HomeIcon fontSize="11em" className="icon icon--arbitrum" />
                                </SPAAnchor>
                                <SPAAnchor href="https://base.org/">
                                    <HomeIcon fontSize="7em" className="icon icon--base" />
                                </SPAAnchor>
                            </FlexDivSpaceAround>
                            <FlexDivSpaceAround>
                                <SPAAnchor href="https://pyth.network/">
                                    <HomeIcon fontSize="9em" className="icon icon--pyth" />
                                </SPAAnchor>
                                <SPAAnchor href="https://framework.ventures/">
                                    <HomeIcon fontSize="9em" className="icon icon--framework" />
                                </SPAAnchor>
                            </FlexDivSpaceAround>
                        </>
                    )}
                </Section>
                <Section>
                    <SectionTitleLink>
                        {t('home.integrations.title-link')} <SectionTitleLinkArrow />
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
                            <HomeButton>{t('home.integrations.integrate-with-thales-sports-button')}</HomeButton>
                        </Description>
                    </Collapse>
                    <Collapse
                        title={t('home.integrations.thales-digital-options-api-title')}
                        additionalStyling={{ downwardsArrowAlignRight: true, titleMarginRight: '5px' }}
                    >
                        <Description marginBottom={20}>
                            <span>{t('home.integrations.thales-digital-options-api-description')}</span>
                            <HomeButton>{t('home.integrations.integrate-with-thales-markets-button')}</HomeButton>
                        </Description>
                    </Collapse>
                    <Collapse
                        title={t('home.integrations.thales-speed-markets-api-title')}
                        additionalStyling={{ downwardsArrowAlignRight: true, titleMarginRight: '5px' }}
                    >
                        <Description marginBottom={20}>
                            <span>{t('home.integrations.thales-speed-markets-api-description')}</span>
                            <HomeButton>{t('home.integrations.integrate-with-thales-speed-button')}</HomeButton>
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
                                    <Description>
                                        <FlexDiv>
                                            <BulletNumber>{'\u2776'}</BulletNumber>
                                            {t('home.buying-selling.buying.step-1')}
                                        </FlexDiv>
                                    </Description>
                                    <Description>
                                        <FlexDiv>
                                            <BulletNumber>{'\u2777'}</BulletNumber>
                                            {t('home.buying-selling.buying.step-2')}
                                        </FlexDiv>
                                    </Description>
                                    <Description>
                                        <FlexDiv>
                                            <BulletNumber>{'\u2778'}</BulletNumber>
                                            {t('home.buying-selling.buying.step-3')}
                                        </FlexDiv>
                                    </Description>
                                    <Description>
                                        <FlexDiv>
                                            <BulletNumber>{'\u2779'}</BulletNumber>
                                            {t('home.buying-selling.buying.step-4')}
                                        </FlexDiv>
                                    </Description>
                                    <Description>
                                        <FlexDiv>
                                            <BulletNumber>{'\u277A'}</BulletNumber>
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
                                    <Description>
                                        <FlexDiv>
                                            <BulletNumber>{'\u2776'}</BulletNumber>
                                            {t('home.buying-selling.selling.step-1')}
                                        </FlexDiv>
                                    </Description>
                                    <Description>
                                        <FlexDiv>
                                            <BulletNumber>{'\u2777'}</BulletNumber>
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
                        <SPAAnchor href={buildHref(ROUTES.About.Governance)}>
                            {t('home.governance.title-link')} <SectionTitleLinkArrow />
                        </SPAAnchor>
                    </SectionTitleLink>
                    <SectionSlogan>{t('home.governance.title')}</SectionSlogan>
                    <Description marginBottom={20}>{t('home.governance.description')}</Description>
                    <SPAAnchor href={buildHref(ROUTES.About.Governance)}>
                        <HomeButton>{t('home.governance.explore-thales-dao-button')}</HomeButton>
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
