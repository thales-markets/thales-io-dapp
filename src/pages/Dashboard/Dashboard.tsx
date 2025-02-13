import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import Governance from './Governance';
import ProtocolVolume from './ProtocolVolume';
import { Container, ItemCenter, ItemUpperLeft, ItemUpperRight, MobileContainer } from './styled-components';
import TokenInfo from './ThalesTokenInfo';

const Dashboard: React.FC = () => {
    const isMobile = useSelector((state: RootState) => getIsMobile(state));
    return (
        <>
            {!isMobile && (
                <Container>
                    <ItemUpperLeft>
                        <ProtocolVolume />
                    </ItemUpperLeft>
                    <ItemCenter>
                        <TokenInfo />
                    </ItemCenter>
                    <ItemUpperRight>
                        <Governance />
                    </ItemUpperRight>
                </Container>
            )}
            {isMobile && (
                <MobileContainer>
                    <ProtocolVolume />
                    <TokenInfo />
                    <Governance />
                </MobileContainer>
            )}
        </>
    );
};

export default Dashboard;
