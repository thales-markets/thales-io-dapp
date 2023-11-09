import Governance from './Governance';
import IntegratorsVolume from './IntegratorsVolume';
import ProtocolVolume from './ProtocolVolume';
import TVLInfo from './TVLInfo';
import TokenAddresses from './TokenAddresses';
import {
    Container,
    ItemBottom,
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
            <ItemTop></ItemTop>
            <ItemUpperRight></ItemUpperRight>
            <ItemMiddleLeft>
                <Governance />
            </ItemMiddleLeft>
            <ItemMiddleRight>
                <TokenAddresses />
            </ItemMiddleRight>
            <ItemBottomLeft>
                <TVLInfo />
            </ItemBottomLeft>
            <ItemBottom></ItemBottom>
            <ItemBottomRight>
                <IntegratorsVolume />
            </ItemBottomRight>
        </Container>
    );
};

export default Dashboard;
