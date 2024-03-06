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
            <SPAAnchor href={LINKS.Discord} style={{ cursor: 'pointer' }}>
                <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                    <Icon iconSize={iconSize} className="icon icon--discord" />
                    <Name>{t('footer.discord')}</Name>
                </FlexDivColumnCentered>
            </SPAAnchor>

            <SPAAnchor href={LINKS.Twitter} style={{ cursor: 'pointer' }}>
                <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                    <Icon iconSize={iconSize} className="icon icon--twitter" />
                    <Name>{t('footer.twitter')}</Name>
                </FlexDivColumnCentered>
            </SPAAnchor>
            <SPAAnchor href={LINKS.ThalesMarketDocs} style={{ cursor: 'pointer' }}>
                <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                    <Icon iconSize={iconSize} className="icon icon--docs" />
                    <Name>{t('footer.docs')}</Name>
                </FlexDivColumnCentered>
            </SPAAnchor>

            <SPAAnchor href={LINKS.Medium} style={{ cursor: 'pointer' }}>
                <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                    <Icon iconSize={iconSize} className="icon icon--medium" />
                    <Name>{t('footer.medium')}</Name>
                </FlexDivColumnCentered>
            </SPAAnchor>

            <SPAAnchor href={LINKS.Github} style={{ cursor: 'pointer' }}>
                <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                    <Icon iconSize={iconSize} className="icon icon--github" />
                    <Name>{t('footer.github')}</Name>
                </FlexDivColumnCentered>
            </SPAAnchor>
        </Container>
    );
};

export default FooterLinks;

const Container = styled(FlexDivSpaceBetween)`
    width: 100%;
`;

const Name = styled.div`
    color: #c6c8da;
    font-family: MontserratLight;
    font-size: 10px;
    font-style: normal;
    text-transform: capitalize;
    margin-top: 3px;
`;
