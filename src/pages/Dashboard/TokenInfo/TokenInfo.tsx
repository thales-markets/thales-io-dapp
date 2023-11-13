import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    return (
        <WidgetWrapper isDoubleHeight={true}>
            <WidgetHeader>
                <WidgetIcon className="icon icon--thales-round-logo" />
                <TitleLabel>{t('dashboard.token-info.title')}</TitleLabel>
            </WidgetHeader>
            <UpperInfoSection>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.token-info.total-supply')}</InfoText>
                    <InfoStats>24,523,564</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.token-info.circulating-supply')}</InfoText>
                    <InfoStats>10%</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.token-info.burned-supply')}</InfoText>
                    <InfoStats>5%</InfoStats>
                </FlexDivFullWidthSpaceBetween>
            </UpperInfoSection>
        </WidgetWrapper>
    );
};

export default TokenInfo;
