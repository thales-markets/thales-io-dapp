import { ReactComponent as LogoTransparent } from 'assets/images/logo-transparent.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Description, Section, SectionTitle } from '../LandingPage/styled-components';
import AssetCards from './AssetCards';
import { Container, Content, Header, HeaderHighlight, LogoBackgroundContainer } from './styled-components';

const BrandAssets: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Content>
                <Section>
                    <SectionTitle>{t('brand-assets.title')}</SectionTitle>
                    <Header>{t('brand-assets.header')} </Header>
                    <HeaderHighlight>{t('brand-assets.headerHighlight')} </HeaderHighlight>
                </Section>
                <LogoBackgroundContainer>
                    <LogoTransparent />
                </LogoBackgroundContainer>
                <Description>{t('brand-assets.description')}</Description>
                <AssetCards />
            </Content>
        </Container>
    );
};

export default BrandAssets;
