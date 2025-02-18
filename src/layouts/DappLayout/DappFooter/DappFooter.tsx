import FooterLinks from 'components/FooterLinks';
import ROUTES from 'constants/routes';
import { ScreenSizeBreakpoint } from 'enums/ui';
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
    margin-bottom: 50px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 80%;
    }
`;
