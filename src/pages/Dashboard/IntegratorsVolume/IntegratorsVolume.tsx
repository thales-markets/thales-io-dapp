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

const IntegratorsVolume: React.FC = () => {
    const { t } = useTranslation();
    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--integrators" />
                <TitleLabel>{t('dashboard.integrators.title')}</TitleLabel>
            </WidgetHeader>
            <InfoSection side="left">
                <InfoText>Purebet</InfoText>
                <InfoText>BookieBot</InfoText>
                <InfoText>VegasBot</InfoText>
                <InfoText>{t('dashboard.integrators.total-volume')}</InfoText>
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

export default IntegratorsVolume;
