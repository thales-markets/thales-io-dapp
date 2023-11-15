import FooterLinks from 'components/FooterLinks';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

const DappFooter: React.FC = () => {
    return (
        <>
            <Container>
                <FooterLinks />
            </Container>
        </>
    );
};

export default DappFooter;

const Container = styled(FlexDiv)`
    width: 50%;
`;
