import FooterLinks from 'components/FooterLinks';
import { FlexDivColumn } from 'styles/common';
import {
    FooterLine,
    FooterContainer,
    LinksContainer,
    ThalesLinks,
    FooterLogo,
    ThalesLinksTitle,
    ThalesLinksItem,
} from './styled-components';

const Footer: React.FC = () => {
    return (
        <>
            <FooterLine />
            <FooterContainer>
                <LinksContainer>
                    <ThalesLinks>
                        <FooterLogo className="icon icon--thales-logo" />
                        <FlexDivColumn>
                            <ThalesLinksTitle>THALES</ThalesLinksTitle>
                            <ThalesLinksItem>Home</ThalesLinksItem>
                            <ThalesLinksItem>Docs</ThalesLinksItem>
                            <ThalesLinksItem>Blog</ThalesLinksItem>
                            <ThalesLinksItem>Stats</ThalesLinksItem>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <ThalesLinksTitle>DAO DAPP</ThalesLinksTitle>
                            <ThalesLinksItem>Staking</ThalesLinksItem>
                            <ThalesLinksItem>Governance</ThalesLinksItem>
                            <ThalesLinksItem>Stats</ThalesLinksItem>
                            <ThalesLinksItem>ETHScan</ThalesLinksItem>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <ThalesLinksTitle>ABOUT</ThalesLinksTitle>
                            <ThalesLinksItem>Brand Assets</ThalesLinksItem>
                            <ThalesLinksItem>Terms and Conditions</ThalesLinksItem>
                            <ThalesLinksItem>Community Support</ThalesLinksItem>
                            <ThalesLinksItem>Privacy policy</ThalesLinksItem>
                        </FlexDivColumn>
                    </ThalesLinks>
                    <FooterLinks />
                </LinksContainer>
            </FooterContainer>
        </>
    );
};

export default Footer;
