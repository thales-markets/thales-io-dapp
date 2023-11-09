import Governance from './Governance';
import IntegratorsVolume from './IntegratorsVolume';
import ProtocolVolume from './ProtocolVolume';
import Staking from './Staking';
import TVLInfo from './TVLInfo';
import TokenAddresses from './TokenAddresses';
import TokenBurn from './TokenBurn';
import TokenInfo from './TokenInfo';
import {
    Container,
    ItemBottomCenter,
    ItemBottomLeft,
    ItemBottomRight,
    ItemMiddleLeft,
    ItemMiddleRight,
    ItemTop,
    ItemUpperLeft,
    ItemUpperRight,
} from './styled-components';

const Dashboard: React.FC = () => {
    return (
        <Container>
            <ItemUpperLeft>
                <ProtocolVolume />
            </ItemUpperLeft>
            <ItemTop>
                <Staking />
            </ItemTop>
            <ItemUpperRight>
                <TokenInfo />
            </ItemUpperRight>
            <ItemMiddleLeft>
                <Governance />
            </ItemMiddleLeft>
            <ItemMiddleRight>
                <TokenAddresses />
            </ItemMiddleRight>
            <ItemBottomLeft>
                <TVLInfo />
            </ItemBottomLeft>
            <ItemBottomCenter>
                <TokenBurn />
            </ItemBottomCenter>
            <ItemBottomRight>
                <IntegratorsVolume />
            </ItemBottomRight>
        </Container>
    );
};

export default Dashboard;
