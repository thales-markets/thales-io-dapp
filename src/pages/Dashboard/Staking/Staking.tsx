import { FlexDiv } from 'styles/common';
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

const Staking: React.FC = () => {
    return (
        <WidgetWrapper>
            <WidgetHeader isTwoSided={true}>
                <FlexDiv>
                    <WidgetIcon className="icon icon--staking" />
                    <WidgetTitleLabel>Staking</WidgetTitleLabel>
                </FlexDiv>
                <WidgetTitleLabel>Total Stakers: 21,432</WidgetTitleLabel>
            </WidgetHeader>
            <InfoSection side="left">
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
            </InfoSection>
            <InfoSection side="right">
                <OneSideFlexDiv>
                    <InfoText>Staked on Optimism</InfoText>
                    <InfoStats>51,243,592</InfoStats>
                    <InfoStats>APY 100%</InfoStats>
                </OneSideFlexDiv>
                <OneSideFlexDiv>
                    <InfoText>Staked on Arbitrum</InfoText>
                    <InfoStats>51,243,592</InfoStats>
                    <InfoStats>APY 100%</InfoStats>
                </OneSideFlexDiv>
                <OneSideFlexDiv>
                    <InfoText>Staked on Base</InfoText>
                    <InfoStats>51,243,592</InfoStats>
                    <InfoStats>APY 100%</InfoStats>
                </OneSideFlexDiv>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default Staking;
