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
import { useTranslation } from 'react-i18next';

const Staking: React.FC = () => {
    const { t } = useTranslation();
    return (
        <WidgetWrapper>
            <WidgetHeader isTwoSided={true}>
                <FlexDiv>
                    <WidgetIcon className="icon icon--staking" />
                    <TitleLabel>{t('dashboard.staking.title')}</TitleLabel>
                </FlexDiv>
                <FlexDivSpaceBetween>
                    <TitleLabel>{t('dashboard.staking.total-stakers')}</TitleLabel>
                    <TitleLabel isHighlighted={true}>21,432</TitleLabel>
                </FlexDivSpaceBetween>
            </WidgetHeader>
            <InfoSection side="left">
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.staking.total-thales-staked')}</InfoText>
                    <InfoStats>24,523,564</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.staking.of-circulating-supply')}</InfoText>
                    <InfoStats>10%</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.staking.of-total-supply')}</InfoText>
                    <InfoStats>5%</InfoStats>
                </FlexDivFullWidthSpaceBetween>
            </InfoSection>
            <InfoSection side="right" direction="row" justifyContent="space-between">
                <FlexDivColumnNative>
                    <InfoText>{t('dashboard.staking.staked-on-optimism')}</InfoText>
                    <InfoText>{t('dashboard.staking.staked-on-arbitrum')}</InfoText>
                    <InfoText>{t('dashboard.staking.staked-on-base')}</InfoText>
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
