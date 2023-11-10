import { Colors, FlexDiv, FlexDivColumnNative, FlexDivSpaceBetween } from 'styles/common';
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

const Staking: React.FC = () => {
    return (
        <WidgetWrapper>
            <WidgetHeader isTwoSided={true}>
                <FlexDiv>
                    <WidgetIcon className="icon icon--staking" />
                    <TitleLabel>Staking</TitleLabel>
                </FlexDiv>
                <FlexDivSpaceBetween>
                    <TitleLabel>Total Stakers</TitleLabel>
                    <TitleLabel isHighlighted={true}>21,432</TitleLabel>
                </FlexDivSpaceBetween>
            </WidgetHeader>
            <InfoSection side="left">
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
            </InfoSection>
            <InfoSection side="right" direction="row" justifyContent="space-between">
                <FlexDivColumnNative>
                    <InfoText>Staked on Optimism</InfoText>
                    <InfoText>Staked on Arbitrum</InfoText>
                    <InfoText>Staked on Base</InfoText>
                </FlexDivColumnNative>
                <FlexDivColumnNative>
                    <InfoStats>51,243,592</InfoStats>
                    <InfoStats>51,243,592</InfoStats>
                    <InfoStats>51,243,592</InfoStats>
                </FlexDivColumnNative>
                <FlexDivColumnNative>
                    <InfoStats color={Colors.CYAN}>APY 100%</InfoStats>
                    <InfoStats color={Colors.CYAN}>APY 100%</InfoStats>
                    <InfoStats color={Colors.CYAN}>APY 100%</InfoStats>
                </FlexDivColumnNative>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default Staking;
