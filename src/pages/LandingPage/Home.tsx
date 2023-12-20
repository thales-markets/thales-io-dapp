import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import buyingAnimation from 'assets/lotties/homepage-buying.json';
import sellingAnimation from 'assets/lotties/homepage-selling.json';
import Loader from 'components/Loader';
import NumberCountdown from 'components/NumberCountdown';
import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import Lottie from 'lottie-react';
import React, { CSSProperties, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { FlexDivCentered, FlexDivColumn, FlexDivSpaceAround, FlexDivSpaceBetween } from 'styles/common';
import Footer from './Footer';
import MILESTONES from './milestones';
import {
    About,
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
    return (
        <Suspense fallback={<Loader />}>
            <Wrapper>
                <About>
                    <Title>
                        {t('home.thales')}
                        <span>{t('home.protocol')}</span>
                    </Title>
                    <Subtitle>{t('home.protocol-description-1')},</Subtitle>
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
                        $ <NumberCountdown number={944459682} />
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
                        <NumberCountdown number={548562} />
                    </Stat>
                </StatsSection>
                <HomeButton>
                    {t('home.see-all-stats-button')} <ArrowHyperlinkIcon />
                </HomeButton>
                <EcosystemSection>
                    <SectionTitle>{t('home.ecosystem-apps.title')}</SectionTitle>
                    <EcosystemApps>
                        <FlexDivColumn>
                            <HomeIcon fontSize="10em" className="icon icon--thales-markets" />
                            <Description>{t('home.ecosystem-apps.thales-markets')}</Description>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <HomeIcon fontSize="10em" className="icon icon--overtime" />
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
                            <HomeIcon fontSize="10em" className="icon icon--tale-of-thales" />
                            <Description>{t('home.ecosystem-apps.tale-of-thales')}</Description>
                        </FlexDivColumn>
                    </EcosystemApps>
                </EcosystemSection>
                <Section>
                    <SectionSlogan>{t('home.investors.title')}</SectionSlogan>
                    <FlexDivSpaceBetween>
                        <HomeIcon fontSize="19em" className="icon icon--framework" />
                        <HomeIcon className="icon icon--zee-prime" />
                        <HomeIcon fontSize="12em" className="icon icon--daedalus" />
                    </FlexDivSpaceBetween>
                </Section>
                <Section>
                    <SectionTitleLink>
                        {t('home.integrations.title-link')} <SectionTitleLinkArrow />
                    </SectionTitleLink>
                    <SectionSlogan>{t('home.integrations.title')}</SectionSlogan>
                    <Description marginBottom={20} marginTop={20}>
                        {t('home.integrations.description')}
                    </Description>
                    <Highlight>{t('home.integrations.thales-sports-markets-api-title')}</Highlight>
                    <Description marginBottom={20} marginTop={20}>
                        {t('home.integrations.thales-sports-markets-api-description')}
                    </Description>
                    <Highlight>{t('home.integrations.thales-digital-options-api-title')}</Highlight>
                    <Description marginBottom={20} marginTop={20}>
                        {t('home.integrations.thales-digital-options-api-description')}
                    </Description>
                    <Highlight>{t('home.integrations.thales-speed-markets-api-title')}</Highlight>
                    <Description marginBottom={20} marginTop={20}>
                        {t('home.integrations.thales-speed-markets-api-description')}
                    </Description>
                    <HomeButton>{t('home.integrations.integrate-with-thales-button')}</HomeButton>
                </Section>
                <Section>
                    <SectionSlogan>{t('home.buying-selling.title')}</SectionSlogan>
                    <Description>{t('home.buying-selling.description-1')}</Description>
                    <Description>{t('home.buying-selling.description-2')}</Description>
                </Section>
                <div>
                    <Section>
                        <FlexDivCentered>
                            <Highlight>{t('home.buying-selling.buying.title')}</Highlight>
                        </FlexDivCentered>
                        <LottieContainer>
                            <Lottie animationData={buyingAnimation} style={buyingAnimationStyle} />
                        </LottieContainer>
                        <FlexDivCentered>
                            <StepsSection>
                                <Description>1. {t('home.buying-selling.buying.step-1')}</Description>
                                <Description>2. {t('home.buying-selling.buying.step-2')}</Description>
                                <Description>3. {t('home.buying-selling.buying.step-3')}</Description>
                                <Description>4. {t('home.buying-selling.buying.step-4')}</Description>
                                <Description>5. {t('home.buying-selling.buying.step-5')}</Description>
                            </StepsSection>
                        </FlexDivCentered>
                    </Section>
                    <Section>
                        <FlexDivCentered>
                            <Highlight>{t('home.buying-selling.selling.title')}</Highlight>
                        </FlexDivCentered>
                        <LottieContainer>
                            <Lottie animationData={sellingAnimation} style={sellingAnimationStyle} />
                        </LottieContainer>
                        <FlexDivCentered>
                            <StepsSection>
                                <Description>1. {t('home.buying-selling.selling.step-1')}</Description>
                                <Description>2. {t('home.buying-selling.selling.step-2')}</Description>
                            </StepsSection>
                        </FlexDivCentered>
                    </Section>
                </div>
                <Section>
                    <SectionTitleLink>
                        {t('home.governance.title-link')} <SectionTitleLinkArrow />
                    </SectionTitleLink>
                    <SectionSlogan>{t('home.governance.title')}</SectionSlogan>
                    <Description marginBottom={20}>{t('home.governance.description')}</Description>
                    <HomeButton>{t('home.governance.explore-thales-dao-button')}</HomeButton>
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
                                <MilestoneDate>{milestone.date}</MilestoneDate>
                                <MilestoneDescription>{milestone.description}</MilestoneDescription>
                            </Milestone>
                        ))}
                    </MilestonesContainer>
                </Section>
                <Section marginBottom={80}>
                    <SectionTitleLink>
                        {t('home.infrastructure.title')} <SectionTitleLinkArrow />
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
