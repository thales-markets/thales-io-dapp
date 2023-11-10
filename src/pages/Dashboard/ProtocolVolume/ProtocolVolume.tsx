import { FlexDiv } from 'styles/common';
import {
    InfoSection,
    InfoStats,
    InfoText,
    NumericStats,
    WidgetHeader,
    WidgetIcon,
    WidgetTitleLabel,
    WidgetWrapper,
} from '../styled-components';

const ProtocolVolume: React.FC = () => {
    return (
        <WidgetWrapper isDoubleHeight={true}>
            <WidgetHeader notFlex={true}>
                <FlexDiv>
                    <WidgetIcon className="icon icon--protocol-volume" />
                    <WidgetTitleLabel>TOTAL PROTOCOL VOLUME</WidgetTitleLabel>
                </FlexDiv>
                <NumericStats>$ 999,999,999</NumericStats>
                <FlexDiv>
                    <WidgetIcon className="icon icon--safebox" />
                    <WidgetTitleLabel>SAFEBOX FEES</WidgetTitleLabel>
                </FlexDiv>
                <NumericStats>$ 9,999,999</NumericStats>
            </WidgetHeader>
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
        </WidgetWrapper>
    );
};

export default ProtocolVolume;
