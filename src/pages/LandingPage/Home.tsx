import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import buyingAnimation from 'assets/lotties/homepage-buying.json';
import sellingAnimation from 'assets/lotties/homepage-selling.json';
import Loader from 'components/Loader';
import NumberCountdown from 'components/NumberCountdown';
import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import Lottie from 'lottie-react';
import useStatsQuery from 'queries/dashboard/useStatsQuery';
import React, { CSSProperties, Suspense, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { FlexDiv, FlexDivCentered, FlexDivColumn, FlexDivSpaceAround, FlexDivSpaceBetween } from 'styles/common';
import { AllStats } from 'types/statistics';
import { buildHref, navigateTo } from 'utils/routes';
import Footer from './Footer';
import Collapse from './components/Collapse';
import MILESTONES from './milestones';
import {
    About,
    BulletNumber,
    BuySellSection,
    Description,
    EcosystemApps,
    EcosystemSection,
    Highlight,
    HomeButton,
    HomeIcon,
    LottieContainer,
    Milestone,
    MilestoneDate,
    MilestoneDescription,
    MilestonesContainer,
    Section,
    SectionSlogan,
    SectionTitle,
    SectionTitleLink,
    SectionTitleLinkArrow,
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
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const [stats, setStats] = useState<AllStats | undefined>();

    const statsQuery = useStatsQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (statsQuery.isSuccess && statsQuery.data) {
            setStats(statsQuery.data);
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
                    <Subtitle>{t('home.protocol-description-1')},</Subtitle>
                    <Subtitle>{t('home.protocol-description-2')}</Subtitle>
                    <Subtitle>{t('home.protocol-description-3')}</Subtitle>
                    <Subtitle>{t('home.protocol-description-4')}</Subtitle>
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
                        $ <NumberCountdown number={stats?.volumeStats.totalProtocolVolume || 0} />
                    </Stat>
                </StatsSection>
                <StatsSection>
                    <SectionTitle>{t('home.total-value-locked')}</SectionTitle>
                    <Stat>
                        $ <NumberCountdown number={145548562} />
                    </Stat>
                </StatsSection>
                <StatsSection>
                    <SectionTitle>{t('home.total-unique-users')}</SectionTitle>
                    <Stat>
                        <NumberCountdown number={stats?.usersStats.totalUniqueUsers || 0} />
                    </Stat>
                </StatsSection>
                <StatsSection>
                    <SectionTitle>{t('home.markets-created')}</SectionTitle>
                    <Stat>
                        <NumberCountdown number={stats?.marketsStats.totalUniqueMarkets || 0} />
                    </Stat>
                </StatsSection>
                <HomeButton onClick={() => navigateTo(ROUTES.Dashboard)}>
                    {t('home.see-all-stats-button')} <ArrowHyperlinkIcon />
                </HomeButton>
                <EcosystemSection>
                    <SectionTitle>{t('home.ecosystem-apps.title')}</SectionTitle>
                    <EcosystemApps>
                        <FlexDivColumn>
                            <SPAAnchor href={LINKS.ThalesMarkets}>
                                <HomeIcon fontSize="10em" className="icon icon--thales-markets" />
                            </SPAAnchor>
                            <Description>{t('home.ecosystem-apps.thales-markets')}</Description>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <SPAAnchor href={LINKS.Overtime}>
                                <HomeIcon fontSize="10em" className="icon icon--overtime" />
                            </SPAAnchor>
                            <Description>{t('home.ecosystem-apps.overtime')}</Description>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <HomeIcon
                                style={{ height: '80px' }}
                                paddingBottom="10px"
                                fontSize="6em"
                                className="icon icon--telegram"
                            />
                            <Description>{t('home.ecosystem-apps.telegram')}</Description>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <SPAAnchor href={LINKS.TaleOfThales}>
                                <HomeIcon fontSize="10em" className="icon icon--tale-of-thales" />
                            </SPAAnchor>
                            <Description>{t('home.ecosystem-apps.tale-of-thales')}</Description>
                        </FlexDivColumn>
                    </EcosystemApps>
                </EcosystemSection>
                <Section>
                    <SectionTitleLink>
                        {t('home.integrations.title-link')} <SectionTitleLinkArrow />
                    </SectionTitleLink>
                    <SectionSlogan>{t('home.integrations.title')}</SectionSlogan>
                    <Description marginBottom={50} marginTop={20}>
                        {t('home.integrations.description')}
                    </Description>
                    <Collapse title={t('home.integrations.thales-sports-markets-api-title')}>
                        <Description marginBottom={20}>
                            <span>{t('home.integrations.thales-sports-markets-api-description')}</span>
                            <HomeButton>{t('home.integrations.integrate-with-thales-sports-button')}</HomeButton>
                        </Description>
                    </Collapse>
                    <Collapse title={t('home.integrations.thales-digital-options-api-title')}>
                        <Description marginBottom={20}>
                            <span>{t('home.integrations.thales-digital-options-api-description')}</span>
                            <HomeButton>{t('home.integrations.integrate-with-thales-markets-button')}</HomeButton>
                        </Description>
                    </Collapse>
                    <Collapse title={t('home.integrations.thales-speed-markets-api-title')}>
                        <Description marginBottom={20}>
                            <span>{t('home.integrations.thales-speed-markets-api-description')}</span>
                            <HomeButton>{t('home.integrations.integrate-with-thales-speed-button')}</HomeButton>
                        </Description>
                    </Collapse>
                </Section>
                <Section>
                    <SectionSlogan>{t('home.buying-selling.title')}</SectionSlogan>
                    <Description>{t('home.buying-selling.description-1')}</Description>
                    <Description>{t('home.buying-selling.description-2')}</Description>
                </Section>
                <div>
                    <BuySellSection>
                        <FlexDivCentered>
                            <Highlight>{t('home.buying-selling.buying.title')}</Highlight>
                        </FlexDivCentered>
                        <LottieContainer>
                            <Lottie animationData={buyingAnimation} style={buyingAnimationStyle} />
                        </LottieContainer>
                        <FlexDivCentered>
                            <StepsSection>
                                <Collapse hideLine title={t('home.buying-selling.buying.steps-title')}>
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
                    </BuySellSection>
                    <BuySellSection>
                        <FlexDivCentered>
                            <Highlight>{t('home.buying-selling.selling.title')}</Highlight>
                        </FlexDivCentered>
                        <LottieContainer>
                            <Lottie animationData={sellingAnimation} style={sellingAnimationStyle} />
                        </LottieContainer>
                        <FlexDivCentered>
                            <StepsSection>
                                <Collapse hideLine title={t('home.buying-selling.selling.steps-title')}>
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
                    </BuySellSection>
                </div>
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
                <Section>
                    <SectionSlogan>{t('home.timeline.title')}</SectionSlogan>
                    <MilestonesContainer>
                        {MILESTONES.map((milestone, index) => (
                            <Milestone
                                key={index}
                                isLastRow={index + 1 > Math.floor((MILESTONES.length - 1) / 4) * 4}
                                isLast={MILESTONES.length - 1 === index}
                                index={index + 1}
                            >
                                <MilestoneDate>{`${t(`common.${milestone.month.toLowerCase()}`)} ${
                                    milestone.year
                                }`}</MilestoneDate>
                                <MilestoneDescription>
                                    <Trans
                                        i18nKey={`milestones.${milestone.descriptionKey}`}
                                        components={{ bold: <span /> }}
                                    />
                                </MilestoneDescription>
                            </Milestone>
                        ))}
                    </MilestonesContainer>
                </Section>
                <Section marginBottom={80}>
                    <SectionSlogan>{t('home.infrastructure.title')}</SectionSlogan>
                    <FlexDivSpaceBetween>
                        <SPAAnchor href="https://synthetix.io/">
                            <HomeIcon fontSize="17em" className="icon icon--synthetix" />
                        </SPAAnchor>

                        <SPAAnchor href="https://chain.link/">
                            <HomeIcon fontSize="10em" className="icon icon--chainlink" />
                        </SPAAnchor>
                        <SPAAnchor href="https://www.optimism.io/">
                            <HomeIcon fontSize="11em" className="icon icon--optimism" />
                        </SPAAnchor>
                        <SPAAnchor href="https://arbitrum.io/">
                            <HomeIcon fontSize="11em" className="icon icon--arbitrum" />
                        </SPAAnchor>
                    </FlexDivSpaceBetween>
                    <FlexDivSpaceAround>
                        <SPAAnchor href="https://base.org/">
                            <HomeIcon fontSize="9em" className="icon icon--base" />
                        </SPAAnchor>
                        <SPAAnchor href="https://pyth.network/">
                            <HomeIcon fontSize="9em" className="icon icon--pyth" />
                        </SPAAnchor>
                        <SPAAnchor href="https://framework.ventures/">
                            <HomeIcon fontSize="11em" className="icon icon--framework" />
                        </SPAAnchor>
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
    zIndex: '-1',
};

const sellingAnimationStyle: CSSProperties = {
    width: '29.7%',
    zIndex: '-1',
};
