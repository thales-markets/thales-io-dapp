import styled from 'styled-components';
import { FlexDivColumnCentered, FlexDivSpaceBetween } from 'styles/common';

type FooterLinksProps = {
    iconSize?: number;
};

const FooterLinks: React.FC<FooterLinksProps> = () => {
    return (
        <FlexDivSpaceBetween>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <Icon className="icon icon--discord" />
                <Name>Discord</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <Icon className="icon icon--twitter" />
                <Name>X</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <Icon className="icon icon--docs" />
                <Name>Docs</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <Icon className="icon icon--github" />
                <Name>Github</Name>
            </FlexDivColumnCentered>
            <FlexDivColumnCentered style={{ alignItems: 'center' }}>
                <Icon className="icon icon--medium" />
                <Name>Medium</Name>
            </FlexDivColumnCentered>
        </FlexDivSpaceBetween>
    );
};

export default FooterLinks;

const Icon = styled.i<{ iconSize?: number }>`
    font-size: ${(props) => (props.iconSize ? props.iconSize : '35')}px;
    color: white;
`;

const Name = styled.div`
    color: #a9abbb;
    font-family: MontserratLight;
    font-size: 13px;
    font-style: normal;
    text-transform: capitalize;
    margin-top: 3px;
`;
