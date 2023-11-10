import SPAAnchor from 'components/SPAAnchor';
import { truncateAddress } from 'thales-utils';
import {
    InfoSection,
    InfoStats,
    InfoText,
    WidgetHeader,
    WidgetIcon,
    WidgetTitleLabel,
    WidgetWrapper,
} from '../styled-components';
import { FlexDiv } from 'styles/common';

const TokenAddresses: React.FC = () => {
    return (
        <WidgetWrapper>
            <WidgetHeader isTwoSided={true}>
                <FlexDiv>
                    <WidgetIcon className="icon icon--token-widget" />
                    <WidgetTitleLabel>Thales Token</WidgetTitleLabel>
                </FlexDiv>
                <SPAAnchor href={''}>
                    <WidgetTitleLabel isLink={true}>Bridge</WidgetTitleLabel>
                </SPAAnchor>
            </WidgetHeader>
            <InfoSection side="left">
                <InfoText>Optimism</InfoText>
                <InfoText>Arbitrum</InfoText>
                <InfoText>Base</InfoText>
                <InfoText>Mainnet</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <SPAAnchor href={''}>
                    <InfoStats>{truncateAddress('0x49Ae63864988Ee94791a8aeb0AA05A465699A5dB')}</InfoStats>
                </SPAAnchor>
                <SPAAnchor href={''}>
                    <InfoStats>{truncateAddress('0x49Ae63864988Ee94791a8aeb0AA05A465699A5dB')}</InfoStats>
                </SPAAnchor>
                <SPAAnchor href={''}>
                    <InfoStats>{truncateAddress('0x49Ae63864988Ee94791a8aeb0AA05A465699A5dB')}</InfoStats>
                </SPAAnchor>
                <SPAAnchor href={''}>
                    <InfoStats>{truncateAddress('0x49Ae63864988Ee94791a8aeb0AA05A465699A5dB')}</InfoStats>
                </SPAAnchor>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default TokenAddresses;
