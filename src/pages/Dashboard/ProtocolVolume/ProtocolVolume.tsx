import { FlexDiv } from 'styles/common';
import {
    InfoSection,
    InfoStats,
    InfoText,
    NumericStats,
    WidgetHeader,
    WidgetIcon,
    TitleLabel,
    WidgetWrapper,
} from '../styled-components';
import { useTranslation } from 'react-i18next';

const ProtocolVolume: React.FC = () => {
    const { t } = useTranslation();
    return (
        <WidgetWrapper isDoubleHeight={true}>
            <WidgetHeader notFlex={true}>
                <FlexDiv>
                    <WidgetIcon className="icon icon--protocol-volume" />
                    <TitleLabel>{t('dashboard.protocol-volume.total-protocol-volume')}</TitleLabel>
                </FlexDiv>
                <NumericStats>$ 999,999,999</NumericStats>
                <FlexDiv>
                    <WidgetIcon className="icon icon--safebox" />
                    <TitleLabel>{t('dashboard.protocol-volume.safebox-fees')}</TitleLabel>
                </FlexDiv>
                <NumericStats>$ 9,999,999</NumericStats>
            </WidgetHeader>
            <InfoSection side="left">
                <InfoText>{t('dashboard.protocol-volume.thales-amm')}</InfoText>
                <InfoText>{t('dashboard.protocol-volume.overtime-amm')}</InfoText>
                <InfoText>{t('dashboard.protocol-volume.parlay-amm')}</InfoText>
                <InfoText>{t('dashboard.protocol-volume.average-unique-users')}</InfoText>
                <InfoText>{t('dashboard.protocol-volume.average-monthly-users')}</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <InfoStats>$ 24,523,564.76</InfoStats>
                <InfoStats>$ 4,536,745.54</InfoStats>
                <InfoStats>$ 564,652.43</InfoStats>
                <InfoStats>100,929</InfoStats>
                <InfoStats>3493</InfoStats>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default ProtocolVolume;
