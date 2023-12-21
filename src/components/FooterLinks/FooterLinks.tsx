import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FlexDivColumnCentered, FlexDivSpaceBetween, Icon } from 'styles/common';

type FooterLinksProps = {
    iconSize?: number;
};

const FooterLinks: React.FC<FooterLinksProps> = ({ iconSize }) => {
    const { t } = useTranslation();
    return (
        <Container>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <SPAAnchor href={LINKS.Discord}>
                    <Icon iconSize={iconSize} className="icon icon--discord" />
                </SPAAnchor>
                <Name>{t('footer.discord')}</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <SPAAnchor href={LINKS.Twitter}>
                    <Icon iconSize={iconSize} className="icon icon--twitter" />
                </SPAAnchor>

                <Name>{t('footer.twitter')}</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <SPAAnchor href={LINKS.Docs}>
                    <Icon iconSize={iconSize} className="icon icon--docs" />
                </SPAAnchor>

                <Name>{t('footer.docs')}</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <SPAAnchor href={LINKS.Github}>
                    <Icon iconSize={iconSize} className="icon icon--github" />
                </SPAAnchor>

                <Name>{t('footer.github')}</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <SPAAnchor href={LINKS.Medium}>
                    <Icon iconSize={iconSize} className="icon icon--medium" />
                </SPAAnchor>

                <Name>{t('footer.medium')}</Name>
            </FlexDivColumnCentered>
        </Container>
    );
};

export default FooterLinks;

const Container = styled(FlexDivSpaceBetween)`
    width: 100%;
`;

const Name = styled.div`
    color: #a9abbb;
    font-family: MontserratLight;
    font-size: 10px;
    font-style: normal;
    text-transform: capitalize;
    margin-top: 3px;
`;
