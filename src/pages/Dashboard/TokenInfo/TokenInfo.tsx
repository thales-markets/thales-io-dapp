import {
    InfoStats,
    InfoText,
    OneSideFlexDiv,
    UpperInfoSection,
    WidgetHeader,
    WidgetIcon,
    WidgetTitleLabel,
    WidgetWrapper,
} from '../styled-components';

const TokenInfo: React.FC = () => {
    return (
        <WidgetWrapper isDoubleHeight={true}>
            <WidgetHeader>
                <WidgetIcon className="icon icon--thales-round-logo" />
                <WidgetTitleLabel>Thales token info</WidgetTitleLabel>
            </WidgetHeader>
            <UpperInfoSection>
                <OneSideFlexDiv>
                    <InfoText>Total Thales Staked</InfoText>
                    <InfoStats>24,523,564</InfoStats>
                </OneSideFlexDiv>
                <OneSideFlexDiv>
                    <InfoText>Of circulating supply</InfoText>
                    <InfoStats>10%</InfoStats>
                </OneSideFlexDiv>
                <OneSideFlexDiv>
                    <InfoText>Of total supply</InfoText>
                    <InfoStats>5%</InfoStats>
                </OneSideFlexDiv>
            </UpperInfoSection>
        </WidgetWrapper>
    );
};

export default TokenInfo;
