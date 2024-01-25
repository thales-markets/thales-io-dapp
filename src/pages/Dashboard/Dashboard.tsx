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
} from './styled-components';

const Dashboard: React.FC = () => {
    return (
        <>
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
        </>
    );
};

export default Dashboard;
