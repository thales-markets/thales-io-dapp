import SPAAnchor from 'components/SPAAnchor';
import {
    DoubleSideSectionSpan,
    InfoSection,
    InfoStats,
    InfoText,
    WidgetHeader,
    WidgetIcon,
    TitleLabel,
    WidgetWrapper,
} from '../styled-components';
import { useTranslation } from 'react-i18next';

const Governance: React.FC = () => {
    const { t } = useTranslation();
    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--governance" />
                <TitleLabel>{t('dashboard.governance.title')}</TitleLabel>
            </WidgetHeader>

            <InfoSection side="left">
                <DoubleSideSectionSpan>
                    <SPAAnchor href={''}>TIP-XXX: Placeholder for current TIP link</SPAAnchor>
                </DoubleSideSectionSpan>
                <InfoText>{t('dashboard.governance.start-date')}</InfoText>
                <InfoText>{t('dashboard.governance.end-date')}</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <InfoStats>some date</InfoStats>
                <InfoStats>some date</InfoStats>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default Governance;
