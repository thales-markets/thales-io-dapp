import {
    InfoSection,
    InfoStats,
    InfoText,
    OneSideFlexDiv,
    WidgetHeader,
    WidgetTitleLabel,
    WidgetWrapper,
} from '../styled-components';

const TokenBurn: React.FC = () => {
    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetTitleLabel>Thales Token burn</WidgetTitleLabel>
                <WidgetTitleLabel>Total Stakers</WidgetTitleLabel>
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
