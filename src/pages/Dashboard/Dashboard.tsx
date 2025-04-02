import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import Governance from './Governance';
import ProtocolVolume from './ProtocolVolume';
import {
    Container,
    GridContainer,
    ItemBottomLeft,
    ItemBottomRight,
    ItemUpperLeft,
    ItemUpperRight,
    MobileContainer,
} from './styled-components';
import TokenInfo from './ThalesTokenInfo';
import TVLInfo from './TVLInfo';

const Dashboard: React.FC = () => {
    const isMobile = useSelector((state: RootState) => getIsMobile(state));
    return (
        <>
            {!isMobile && (
                <Container>
                    <GridContainer>
                        <ItemUpperLeft>
                            <ProtocolVolume />
                        </ItemUpperLeft>
                        <ItemUpperRight>
                            <TokenInfo />
                        </ItemUpperRight>
                        <ItemBottomLeft>
                            <TVLInfo />
                        </ItemBottomLeft>
                        <ItemBottomRight>
                            <Governance />
                        </ItemBottomRight>
                    </GridContainer>
                </Container>
            )}
            {isMobile && (
                <MobileContainer>
                    <ProtocolVolume />
                    <TokenInfo />
                    <TVLInfo />
                    <Governance />
                </MobileContainer>
            )}
        </>
    );
};

export default Dashboard;
