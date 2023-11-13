import { useTranslation } from 'react-i18next';
import {
    InfoSection,
    InfoStats,
    InfoText,
    WidgetHeader,
    WidgetIcon,
    TitleLabel,
    WidgetWrapper,
} from '../styled-components';

const TVLInfo: React.FC = () => {
    const { t } = useTranslation();
    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--lock" />
                <TitleLabel>{t('dashboard.tvl.title')}</TitleLabel>
            </WidgetHeader>
            <InfoSection side="left">
                <InfoText>{t('dashboard.tvl.overtime-amm-tvl')}</InfoText>
                <InfoText>{t('dashboard.tvl.thales-amm-tvl')}</InfoText>
                <InfoText>{t('dashboard.tvl.parlay-amm-tvl')}</InfoText>
                <InfoText>{t('dashboard.tvl.vaults-tvl')}</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <InfoStats>$ 24,523,564.76</InfoStats>
                <InfoStats>$ 4,536,745.54</InfoStats>
                <InfoStats>$ 564,652.43</InfoStats>
                <InfoStats>$ 100,929</InfoStats>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default TVLInfo;
