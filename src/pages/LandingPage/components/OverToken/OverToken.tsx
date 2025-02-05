import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import Coins from 'assets/images/coins.png';
import ROUTES from 'constants/routes';
import { t } from 'i18next';
import { LinkButton } from 'pages/LandingPage/styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { navigateTo } from 'utils/routes';
import {
    Container,
    Description,
    LeftContainer,
    OverDescription,
    RightContainer,
    SectionContainer,
    Title,
} from './styled-components';

const OverToken: React.FC = () => {
    return (
        <Container>
            <LeftContainer>
                <SectionContainer>
                    <Title>{t('home.over-token.title')}</Title>
                    <OverDescription>{t('home.over-token.description')}</OverDescription>
                </SectionContainer>
                <SectionContainer>
                    <Title>{t('home.over-token.title-1')}</Title>
                    <Description>{t('home.over-token.description-1')}</Description>
                </SectionContainer>
                <SectionContainer>
                    <Title>{t('home.over-token.title-2')}</Title>
                    <Description>{t('home.over-token.description-2')}</Description>
                </SectionContainer>
                <SectionContainer>
                    <Title>{t('home.over-token.title-3')}</Title>
                    <Description>{t('home.over-token.description-3')}</Description>
                </SectionContainer>
                <LinkButton onClick={() => navigateTo(ROUTES.About.Whitepaper)}>
                    {t('home.whitepaper-button')} <ArrowHyperlinkIcon />
                </LinkButton>
            </LeftContainer>
            <RightContainer>
                <img src={Coins} />
            </RightContainer>
        </Container>
    );
};

export default OverToken;
