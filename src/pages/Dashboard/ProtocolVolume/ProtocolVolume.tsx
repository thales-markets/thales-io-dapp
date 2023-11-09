import { InfoSection, InfoStats, InfoText, WidgetTitleLabel } from '../styled-components';
import { Header, NumericStats, Wrapper } from './styled-components';

const ProtocolVolume: React.FC = () => {
    return (
        <Wrapper>
            <Header>
                <WidgetTitleLabel>TOTAL PROTOCOL VOLUME</WidgetTitleLabel>
                <NumericStats>$ 999,999,999</NumericStats>
                <WidgetTitleLabel>SAFEBOX FEES</WidgetTitleLabel>
                <NumericStats>$ 9,999,999</NumericStats>
            </Header>
            <InfoSection side="left">
                <InfoText>Thales AMM</InfoText>
                <InfoText>Overtime AMM</InfoText>
                <InfoText>Parlay AMM</InfoText>
                <InfoText>AVRG Unique Users</InfoText>
                <InfoText>AVRG Monthly Users</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <InfoStats>$ 24,523,564.76</InfoStats>
                <InfoStats>$ 4,536,745.54</InfoStats>
                <InfoStats>$ 564,652.43</InfoStats>
                <InfoStats>100,929</InfoStats>
                <InfoStats>3493</InfoStats>
            </InfoSection>
        </Wrapper>
    );
};

export default ProtocolVolume;
