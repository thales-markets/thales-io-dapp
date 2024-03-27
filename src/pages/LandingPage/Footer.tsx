// @ts-ignore
import privacyPolicy from 'assets/docs/thales-privacy-policy.pdf';
// @ts-ignore
import termsOfUse from 'assets/docs/thales-terms-of-use.pdf';
import FooterLinks from 'components/FooterLinks';
import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import ROUTES from 'constants/routes';
import { useTranslation } from 'react-i18next';
import { FlexDivColumn } from 'styles/common';
import { buildHref } from 'utils/routes';
import {
    FooterContainer,
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
            <FooterContainer>
                <LinksContainer>
                    <ThalesLinks>
                        <FooterLogo className="icon icon--thales-logo" />
                        <FlexDivColumn>
                            <ThalesLinksTitle>THALES</ThalesLinksTitle>
                            <SPAAnchor href={LINKS.Docs}>
                                <ThalesLinksItem>{t('home.footer.thales.docs')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor href={LINKS.Medium}>
                                <ThalesLinksItem>{t('home.footer.thales.blog')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor href={LINKS.Audits}>
                                <ThalesLinksItem>{t('home.footer.thales.audits')}</ThalesLinksItem>
                            </SPAAnchor>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <ThalesLinksTitle>DAO DAPP</ThalesLinksTitle>
                            <SPAAnchor href={buildHref(ROUTES.Token.Staking.Home)}>
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
                            <a target="_blank" rel="noreferrer" href={termsOfUse}>
                                <ThalesLinksItem>{t('home.footer.about.terms-and-conditions')}</ThalesLinksItem>
                            </a>
                            <a target="_blank" rel="noreferrer" href={privacyPolicy}>
                                <ThalesLinksItem>{t('home.footer.about.privacy-policy')}</ThalesLinksItem>
                            </a>
                        </FlexDivColumn>
                    </ThalesLinks>
                    <FooterLinks />
                </LinksContainer>
            </FooterContainer>
        </>
    );
};

export default Footer;
