import { useTranslation } from 'react-i18next';
import Governance from './Governance';
import IntegratorsVolume from './IntegratorsVolume';
import ProtocolVolume from './ProtocolVolume';
import Staking from './Staking';
import TVLInfo from './TVLInfo';
import TokenInfo from './ThalesTokenInfo';
import TokenAddresses from './TokenAddresses';
import {
    Container,
    EcosystemIcon,
    FlexDivColumnNativeFullWidth,
    FlexDivSpaceAroundFullWidth,
    ItemBottomCenterLeft,
    ItemBottomCenterRight,
    ItemBottomLeft,
    ItemBottomRight,
    ItemCenter,
    ItemUpperLeft,
    ItemUpperRight,
    TitleLabel,
} from './styled-components';

const Dashboard: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <FlexDivColumnNativeFullWidth>
                <TitleLabel>{t('dashboard.networks')}</TitleLabel>
                <FlexDivSpaceAroundFullWidth>
                    <EcosystemIcon className="icon icon--optimism" />
                    <EcosystemIcon className="icon icon--arbitrum" />
                    <EcosystemIcon className="icon icon--base" />
                </FlexDivSpaceAroundFullWidth>
            </FlexDivColumnNativeFullWidth>
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
                <ItemBottomCenterRight>
                    <TokenAddresses />
                </ItemBottomCenterRight>
                <ItemBottomLeft>
                    <TVLInfo />
                </ItemBottomLeft>
                <ItemBottomRight>
                    <IntegratorsVolume />
                </ItemBottomRight>
            </Container>
        </>
    );
};

export default Dashboard;
