import {
    InfoSection,
    InfoStats,
    InfoText,
    FlexDivFullWidthSpaceBetween,
    WidgetHeader,
    WidgetIcon,
    TitleLabel,
    WidgetWrapper,
} from '../styled-components';

const TokenBurn: React.FC = () => {
    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--burn" />
                <TitleLabel>Thales Token burn</TitleLabel>
            </WidgetHeader>
            <InfoSection side="left">
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>Total Thales burned</InfoText>
                    <InfoStats>24,523,564.76 Thales</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>% of circulating supply</InfoText>
                    <InfoStats>10%</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>% of total supply</InfoText>
                    <InfoStats>5%</InfoStats>
                </FlexDivFullWidthSpaceBetween>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default TokenBurn;
