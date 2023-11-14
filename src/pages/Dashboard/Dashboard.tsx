import { useTranslation } from 'react-i18next';
import Governance from './Governance';
import IntegratorsVolume from './IntegratorsVolume';
import ProtocolVolume from './ProtocolVolume';
import Staking from './Staking';
import TVLInfo from './TVLInfo';
import TokenAddresses from './TokenAddresses';
import TokenBurn from './TokenBurn';
import TokenInfo from './ThalesTokenInfo';
import {
    Container,
    EcosystemIcon,
    FlexDivColumnNativeFullWidth,
    FlexDivSpaceAroundFullWidth,
    ItemBottomCenter,
    ItemBottomLeft,
    ItemBottomRight,
    ItemMiddleLeft,
    ItemMiddleRight,
    ItemTop,
    ItemUpperLeft,
    ItemUpperRight,
    TitleLabel,
} from './styled-components';

const Dashboard: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <FlexDivColumnNativeFullWidth>
                <TitleLabel>{t('dashboard.ecosystem')}</TitleLabel>
                <FlexDivSpaceAroundFullWidth>
                    <EcosystemIcon className="icon icon--thales-markets" />
                    <EcosystemIcon className="icon icon--tale-of-thales" />
                    <EcosystemIcon className="icon icon--overtime" />
                    <EcosystemIcon className="icon icon--spongly" />
                </FlexDivSpaceAroundFullWidth>
            </FlexDivColumnNativeFullWidth>
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
            <FlexDivColumnNativeFullWidth>
                <TitleLabel>{t('dashboard.networks')}</TitleLabel>
                <FlexDivSpaceAroundFullWidth>
                    <EcosystemIcon className="icon icon--optimism" />
                    <EcosystemIcon className="icon icon--arbitrum" />
                    <EcosystemIcon className="icon icon--base" />
                </FlexDivSpaceAroundFullWidth>
            </FlexDivColumnNativeFullWidth>
        </>
    );
};

export default Dashboard;
