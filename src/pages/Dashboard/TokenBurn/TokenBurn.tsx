import {
    InfoSection,
    InfoStats,
    InfoText,
    OneSideFlexDiv,
    WidgetHeader,
    WidgetIcon,
    WidgetTitleLabel,
    WidgetWrapper,
} from '../styled-components';

const TokenBurn: React.FC = () => {
    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--burn" />
                <WidgetTitleLabel>Thales Token burn</WidgetTitleLabel>
            </WidgetHeader>
            <InfoSection side="left">
                <OneSideFlexDiv>
                    <InfoText>Total Thales burned</InfoText>
                    <InfoStats>24,523,564.76 Thales</InfoStats>
                </OneSideFlexDiv>
                <OneSideFlexDiv>
                    <InfoText>% of circulating supply</InfoText>
                    <InfoStats>10%</InfoStats>
                </OneSideFlexDiv>
                <OneSideFlexDiv>
                    <InfoText>% of total supply</InfoText>
                    <InfoStats>5%</InfoStats>
                </OneSideFlexDiv>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default TokenBurn;
