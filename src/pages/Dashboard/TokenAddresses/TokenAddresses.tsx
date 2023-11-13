import SPAAnchor from 'components/SPAAnchor';
import { getEtherscanTokenLink, truncateAddress } from 'thales-utils';
import {
    InfoSection,
    InfoStats,
    InfoText,
    LinkArrow,
    WidgetHeader,
    WidgetIcon,
    TitleLabel,
    WidgetWrapper,
} from '../styled-components';
import { Colors, FlexDiv } from 'styles/common';
import { getCelerBridgeUrl } from 'utils/temp-bridge';
import { useTranslation } from 'react-i18next';
import { Network } from 'enums/network';
import thalesContract from 'utils/contracts/thalesContract';

const TokenAddresses: React.FC = () => {
    const { t } = useTranslation();
    return (
        <WidgetWrapper>
            <WidgetHeader isTwoSided={true}>
                <FlexDiv>
                    <WidgetIcon className="icon icon--token-widget" />
                    <TitleLabel>{t('dashboard.token-addresses.title')}</TitleLabel>
                </FlexDiv>
                <SPAAnchor href={getCelerBridgeUrl(Network.OptimismMainnet)}>
                    <TitleLabel isLink={true}>
                        {t('dashboard.token-addresses.bridge')}
                        <LinkArrow color={Colors.CYAN} />
                    </TitleLabel>
                </SPAAnchor>
            </WidgetHeader>
            <InfoSection side="left">
                <InfoText>{t('dashboard.token-addresses.optimism')}</InfoText>
                <InfoText>{t('dashboard.token-addresses.arbitrum')}</InfoText>
                <InfoText>{t('dashboard.token-addresses.base')}</InfoText>
                <InfoText>{t('dashboard.token-addresses.mainnet')}</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <SPAAnchor
                    href={getEtherscanTokenLink(
                        Network.OptimismMainnet,
                        thalesContract.addresses[Network.OptimismMainnet]
                    )}
                >
                    <InfoStats>
                        {truncateAddress(thalesContract.addresses[Network.OptimismMainnet])}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
                <SPAAnchor href={getEtherscanTokenLink(Network.Arbitrum, thalesContract.addresses[Network.Arbitrum])}>
                    <InfoStats>
                        {truncateAddress(thalesContract.addresses[Network.Arbitrum])}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
                <SPAAnchor href={getEtherscanTokenLink(Network.Base, thalesContract.addresses[Network.Base])}>
                    <InfoStats>
                        {truncateAddress(thalesContract.addresses[Network.Base])}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
                <SPAAnchor href={getEtherscanTokenLink(Network.Mainnet, thalesContract.addresses[Network.Mainnet])}>
                    <InfoStats>
                        {truncateAddress(thalesContract.addresses[Network.Mainnet])}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default TokenAddresses;
