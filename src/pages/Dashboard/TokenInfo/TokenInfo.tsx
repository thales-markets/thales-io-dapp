import {
    InfoStats,
    InfoText,
    FlexDivFullWidthSpaceBetween,
    UpperInfoSection,
    WidgetHeader,
    WidgetIcon,
    TitleLabel,
    WidgetWrapper,
} from '../styled-components';

const TokenInfo: React.FC = () => {
    return (
        <WidgetWrapper isDoubleHeight={true}>
            <WidgetHeader>
                <WidgetIcon className="icon icon--thales-round-logo" />
                <TitleLabel>Thales token info</TitleLabel>
            </WidgetHeader>
            <UpperInfoSection>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>Total Thales Staked</InfoText>
                    <InfoStats>24,523,564</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>Of circulating supply</InfoText>
                    <InfoStats>10%</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>Of total supply</InfoText>
                    <InfoStats>5%</InfoStats>
                </FlexDivFullWidthSpaceBetween>
            </UpperInfoSection>
        </WidgetWrapper>
    );
};

export default TokenInfo;
