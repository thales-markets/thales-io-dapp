import ProtocolVolume from './ProtocolVolume';
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
            <ItemMiddleLeft></ItemMiddleLeft>
            <ItemMiddleRight></ItemMiddleRight>
            <ItemBottomLeft></ItemBottomLeft>
            <ItemBottom></ItemBottom>
            <ItemBottomRight></ItemBottomRight>
        </Container>
    );
};

export default Dashboard;
