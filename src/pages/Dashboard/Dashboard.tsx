import { useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import Governance from './Governance';
import IntegratorsVolume from './IntegratorsVolume';
import ProtocolVolume from './ProtocolVolume';
import Staking from './Staking';
import TVLInfo from './TVLInfo';
import TokenInfo from './ThalesTokenInfo';
import {
    Container,
    ItemBottomCenterLeft,
    ItemBottomLeft,
    ItemBottomRight,
    ItemCenter,
    ItemUpperLeft,
    ItemUpperRight,
    MobileContainer,
} from './styled-components';

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
                        <Staking />
                    </ItemCenter>
                    <ItemUpperRight>
                        <TokenInfo />
                    </ItemUpperRight>
                    <ItemBottomCenterLeft>
                        <Governance />
                    </ItemBottomCenterLeft>
                    <ItemBottomRight>
                        <IntegratorsVolume />
                    </ItemBottomRight>
                    <ItemBottomLeft>
                        <TVLInfo />
                    </ItemBottomLeft>
                </Container>
            )}
            {isMobile && (
                <MobileContainer>
                    <ProtocolVolume />
                    <Staking />
                    <TokenInfo />
                    <Governance />
                    <IntegratorsVolume />
                    <TVLInfo />
                </MobileContainer>
            )}
        </>
    );
};

export default Dashboard;
