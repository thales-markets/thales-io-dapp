import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import styled from 'styled-components';
import { FlexDivColumnCentered, FlexDivSpaceBetween, Icon } from 'styles/common';

type FooterLinksProps = {
    iconSize?: number;
};

const FooterLinks: React.FC<FooterLinksProps> = () => {
    return (
        <FlexDivSpaceBetween>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <SPAAnchor href={LINKS.Discord}>
                    <Icon className="icon icon--discord" />
                </SPAAnchor>
                <Name>Discord</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <SPAAnchor href={LINKS.Twitter}>
                    <Icon className="icon icon--twitter" />
                </SPAAnchor>

                <Name>X</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <SPAAnchor href={LINKS.Docs}>
                    <Icon className="icon icon--docs" />
                </SPAAnchor>

                <Name>Docs</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <SPAAnchor href={LINKS.Github}>
                    <Icon className="icon icon--github" />
                </SPAAnchor>

                <Name>Github</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <SPAAnchor href={LINKS.Medium}>
                    <Icon className="icon icon--medium" />
                </SPAAnchor>

                <Name>Medium</Name>
            </FlexDivColumnCentered>
        </FlexDivSpaceBetween>
    );
};

export default FooterLinks;

const Name = styled.div`
    color: #a9abbb;
    font-family: MontserratLight;
    font-size: 13px;
    font-style: normal;
    text-transform: capitalize;
    margin-top: 3px;
`;
