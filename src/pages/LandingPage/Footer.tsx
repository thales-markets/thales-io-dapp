import FooterLinks from 'components/FooterLinks';
import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import { useTranslation } from 'react-i18next';
import { FlexDivColumn } from 'styles/common';
import { buildHref } from 'utils/routes';
import {
    FooterContainer,
    FooterLine,
    FooterLogo,
    LinksContainer,
    ThalesLinks,
    ThalesLinksItem,
    ThalesLinksTitle,
} from './styled-components';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <FooterLine />
            <FooterContainer>
                <LinksContainer>
                    <ThalesLinks>
                        <FooterLogo className="icon icon--thales-logo" />
                        <FlexDivColumn>
                            <ThalesLinksTitle>THALES</ThalesLinksTitle>
                            <SPAAnchor href={buildHref(ROUTES.Home)}>
                                <ThalesLinksItem>{t('home.footer.thales.home')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor href={LINKS.ThalesMarketDocs}>
                                <ThalesLinksItem>{t('home.footer.thales.docs')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor href={LINKS.Medium}>
                                <ThalesLinksItem>{t('home.footer.thales.blog')}</ThalesLinksItem>
                            </SPAAnchor>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <ThalesLinksTitle>DAO DAPP</ThalesLinksTitle>
                            <SPAAnchor href={buildHref(ROUTES.Staking)}>
                                <ThalesLinksItem>{t('home.footer.dao-dapp.staking')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor href={buildHref(ROUTES.DAO.Home)}>
                                <ThalesLinksItem>{t('home.footer.dao-dapp.governance')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor href={buildHref(ROUTES.Dashboard)}>
                                <ThalesLinksItem>{t('home.footer.dao-dapp.stats')}</ThalesLinksItem>
                            </SPAAnchor>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <ThalesLinksTitle>{t('home.footer.about.about')}</ThalesLinksTitle>
                            <SPAAnchor href={LINKS.MarketingAssets}>
                                <ThalesLinksItem>{t('home.footer.about.brand-assets')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor>
                                <ThalesLinksItem>{t('home.footer.about.terms-and-conditions')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor>
                                <ThalesLinksItem>{t('home.footer.about.privacy-policy')}</ThalesLinksItem>
                            </SPAAnchor>
                        </FlexDivColumn>
                    </ThalesLinks>
                    <FooterLinks />
                </LinksContainer>
            </FooterContainer>
        </>
    );
};

export default Footer;
