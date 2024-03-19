import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import { useTranslation } from 'react-i18next';
import { Icon } from 'styles/common';
import { Container, IconContainer, Name } from './styled-components';

type FooterLinksProps = {
    iconSize?: number;
};

const FooterLinks: React.FC<FooterLinksProps> = ({ iconSize }) => {
    const { t } = useTranslation();
    return (
        <Container>
            <SPAAnchor href={LINKS.Discord}>
                <IconContainer>
                    <Icon iconSize={iconSize} className="icon icon--discord" />
                    <Name>{t('footer.discord')}</Name>
                </IconContainer>
            </SPAAnchor>

            <SPAAnchor href={LINKS.Twitter}>
                <IconContainer>
                    <Icon iconSize={iconSize} className="icon icon--twitter" />
                    <Name>{t('footer.twitter')}</Name>
                </IconContainer>
            </SPAAnchor>
            <SPAAnchor href={LINKS.ThalesMarketDocs}>
                <IconContainer>
                    <Icon iconSize={iconSize} className="icon icon--docs" />
                    <Name>{t('footer.docs')}</Name>
                </IconContainer>
            </SPAAnchor>

            <SPAAnchor href={LINKS.Medium}>
                <IconContainer>
                    <Icon iconSize={iconSize} className="icon icon--medium" />
                    <Name>{t('footer.medium')}</Name>
                </IconContainer>
            </SPAAnchor>

            <SPAAnchor href={LINKS.Github}>
                <IconContainer>
                    <Icon iconSize={iconSize} className="icon icon--github" />
                    <Name>{t('footer.github')}</Name>
                </IconContainer>
            </SPAAnchor>
        </Container>
    );
};

export default FooterLinks;
