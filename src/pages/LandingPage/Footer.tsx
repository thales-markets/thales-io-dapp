import FooterLinks from 'components/FooterLinks';
import styled from 'styled-components';
import { FlexDivSpaceBetween } from 'styles/common';

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterLine />
            <FlexDivSpaceBetween>
                <FooterLinks />
            </FlexDivSpaceBetween>
        </FooterContainer>
    );
};

const FooterLine = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    background-image: linear-gradient(to right, white 17%, rgba(255, 255, 255, 0) 0%);
    background-position: bottom;
    background-size: 13px 1px;
    background-repeat: repeat-x;
    height: 1px;
`;

const FooterContainer = styled.div`
    height: 500px;
`;

export default Footer;
