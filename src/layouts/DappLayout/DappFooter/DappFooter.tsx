import FooterLinks from 'components/FooterLinks';
import ROUTES from 'constants/routes';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

const DappFooter: React.FC = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname !== ROUTES.Home && (
                <Container>
                    <FooterLinks iconSize={25} />
                </Container>
            )}
        </>
    );
};

export default DappFooter;

const Container = styled(FlexDiv)`
    width: 40%;
`;
