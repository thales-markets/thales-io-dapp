import SPAAnchor from 'components/SPAAnchor';
import { InfoSection, InfoStats, InfoText, WidgetTitleLabel } from '../styled-components';
import { Header, Wrapper } from './styled-components';
import { truncateAddress } from 'thales-utils';

const TokenAddresses: React.FC = () => {
    return (
        <Wrapper>
            <Header>
                <WidgetTitleLabel>Thales Token</WidgetTitleLabel>
                <SPAAnchor href={''}>
                    <WidgetTitleLabel isLink={true}>Bridge</WidgetTitleLabel>
                </SPAAnchor>
            </Header>
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
        </Wrapper>
    );
};

export default TokenAddresses;
