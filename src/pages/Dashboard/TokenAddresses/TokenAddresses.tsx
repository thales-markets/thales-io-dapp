import SPAAnchor from 'components/SPAAnchor';
import { NetworkId, getEtherscanTokenLink, truncateAddress } from 'thales-utils';
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
import { ThalesContractAddress } from 'enums/thales-token-addresses';
import { getCelerBridgeUrl } from 'utils/temp-bridge';

const TokenAddresses: React.FC = () => {
    return (
        <WidgetWrapper>
            <WidgetHeader isTwoSided={true}>
                <FlexDiv>
                    <WidgetIcon className="icon icon--token-widget" />
                    <TitleLabel>Thales Token</TitleLabel>
                </FlexDiv>
                <SPAAnchor href={getCelerBridgeUrl(NetworkId.OptimismMainnet)}>
                    <TitleLabel isLink={true}>
                        Bridge
                        <LinkArrow color={Colors.CYAN} />
                    </TitleLabel>
                </SPAAnchor>
            </WidgetHeader>
            <InfoSection side="left">
                <InfoText>Optimism</InfoText>
                <InfoText>Arbitrum</InfoText>
                <InfoText>Base</InfoText>
                <InfoText>Mainnet</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <SPAAnchor
                    href={getEtherscanTokenLink(NetworkId.OptimismMainnet, ThalesContractAddress.OptimismMainnet)}
                >
                    <InfoStats>
                        {truncateAddress(ThalesContractAddress.OptimismMainnet)}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
                <SPAAnchor href={getEtherscanTokenLink(NetworkId.Arbitrum, ThalesContractAddress.Arbitrum)}>
                    <InfoStats>
                        {truncateAddress(ThalesContractAddress.Arbitrum)}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
                <SPAAnchor href={getEtherscanTokenLink(NetworkId.Base, ThalesContractAddress.Base)}>
                    <InfoStats>
                        {truncateAddress(ThalesContractAddress.Base)}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
                <SPAAnchor href={getEtherscanTokenLink(NetworkId.Mainnet, ThalesContractAddress.Mainnet)}>
                    <InfoStats>
                        {truncateAddress(ThalesContractAddress.Mainnet)}
                        <LinkArrow />
                    </InfoStats>
                </SPAAnchor>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default TokenAddresses;
