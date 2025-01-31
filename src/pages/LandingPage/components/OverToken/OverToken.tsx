import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import { ReactComponent as Overdrop } from 'assets/images/overdrop.svg';
import ROUTES from 'constants/routes';
import { t } from 'i18next';
import { HomeButton } from 'pages/LandingPage/styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { navigateTo } from 'utils/routes';
import {
    Container,
    Label,
    LeftContainer,
    OverValue,
    RightContainer,
    SectionContainer,
    Value,
} from './styled-components';

const OverToken: React.FC = () => {
    return (
        <Container>
            <LeftContainer>
                <SectionContainer>
                    <Label>The heart of Overtime</Label>
                    <OverValue>$OVER token</OverValue>
                </SectionContainer>
                <SectionContainer>
                    <Label>{t('home.total-unique-users')}</Label>
                    <Value>$OVER is the core betting collateral, providing the best odds and user experience.</Value>
                </SectionContainer>
                <SectionContainer>
                    <Label>{t('home.markets-created')}</Label>
                    <Value>All Overtime fees and revenue fuel a Buyback & Burn program for $OVER.</Value>
                </SectionContainer>
                <SectionContainer>
                    <Label>{t('home.total-value-locked')}</Label>
                    <Value>$OVER is the core betting collateral, providing the best odds and user experience.</Value>
                </SectionContainer>
                <HomeButton onClick={() => navigateTo(ROUTES.Dashboard)}>
                    {t('home.see-all-Values-button')} <ArrowHyperlinkIcon />
                </HomeButton>
            </LeftContainer>
            <RightContainer>
                <Overdrop />
            </RightContainer>
        </Container>
    );
};

export default OverToken;
