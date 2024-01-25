import SPAAnchor from 'components/SPAAnchor';
import ROUTES from 'constants/routes';
import { Network } from 'enums/network';
import { useTranslation } from 'react-i18next';
import { Colors, FlexDiv } from 'styles/common';
import { getEtherscanTokenLink, truncateAddress } from 'thales-utils';
import thalesContract from 'utils/contracts/thalesContract';
import {
    InfoSection,
    InfoStats,
    InfoText,
    LinkArrow,
    TitleLabel,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

const TokenAddresses: React.FC = () => {
    const { t } = useTranslation();
    // ADD NETWORK READING
    return (
        <WidgetWrapper>
            <WidgetHeader isTwoSided={true}>
                <FlexDiv>
                    <WidgetIcon className="icon icon--token-widget" />
                    <TitleLabel>{t('dashboard.token-addresses.title')}</TitleLabel>
                </FlexDiv>
                <SPAAnchor href={ROUTES.Bridge}>
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
                        {truncateAddress(thalesContract.addresses[Network.OptimismMainnet].toLowerCase())}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
                <SPAAnchor href={getEtherscanTokenLink(Network.Arbitrum, thalesContract.addresses[Network.Arbitrum])}>
                    <InfoStats>
                        {truncateAddress(thalesContract.addresses[Network.Arbitrum].toLowerCase())}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
                <SPAAnchor href={getEtherscanTokenLink(Network.Base, thalesContract.addresses[Network.Base])}>
                    <InfoStats>
                        {truncateAddress(thalesContract.addresses[Network.Base].toLowerCase())}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
                <SPAAnchor href={getEtherscanTokenLink(Network.Mainnet, thalesContract.addresses[Network.Mainnet])}>
                    <InfoStats>
                        {truncateAddress(thalesContract.addresses[Network.Mainnet].toLowerCase())}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default TokenAddresses;
