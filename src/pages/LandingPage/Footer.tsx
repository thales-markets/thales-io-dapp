// @ts-ignore
import privacyPolicy from 'assets/docs/overtime-privacy-policy.pdf';
// @ts-ignore
import termsOfUse from 'assets/docs/overtime-terms-of-use.pdf';
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
    OvertimeLinksTitle,
    ThalesLinks,
    ThalesLinksItem,
} from './styled-components';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <FooterContainer>
                <LinksContainer>
                    <ThalesLinks>
                        <FooterLogo className="overtime-icon overtime-icon--overtime" />
                        <FlexDivColumn>
                            <OvertimeLinksTitle>{t('home.footer.overtime.overtime')}</OvertimeLinksTitle>
                            <SPAAnchor href={LINKS.Docs}>
                                <ThalesLinksItem>{t('home.footer.overtime.docs')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor href={LINKS.Medium}>
                                <ThalesLinksItem>{t('home.footer.overtime.blog')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor href={LINKS.Discord}>
                                <ThalesLinksItem>{t('home.footer.overtime.community')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor href={LINKS.Audits}>
                                <ThalesLinksItem>{t('home.footer.overtime.audits')}</ThalesLinksItem>
                            </SPAAnchor>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <OvertimeLinksTitle>{t('home.footer.products.products')}</OvertimeLinksTitle>
                            <SPAAnchor href={LINKS.Overtime}>
                                <ThalesLinksItem>{t('home.footer.products.overtime')}</ThalesLinksItem>
                            </SPAAnchor>
                            <SPAAnchor href={LINKS.SpeedMarkets}>
                                <ThalesLinksItem>{t('home.footer.products.speed-markets')}</ThalesLinksItem>
                            </SPAAnchor>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <OvertimeLinksTitle>{t('home.footer.about.about')}</OvertimeLinksTitle>
                            <SPAAnchor href={buildHref(ROUTES.BrandAssets)}>
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
