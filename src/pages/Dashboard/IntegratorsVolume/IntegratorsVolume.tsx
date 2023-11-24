import useIntegratorsQuery from 'queries/dashboard/useIntegratorsQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { Integrator } from 'types/integrator';
import {
    FullWidthInfoSection,
    InfoStats,
    InfoText,
    TitleLabel,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

const IntegratorsVolume: React.FC = () => {
    const { t } = useTranslation();

    const [integratorsData, setIntegratorsData] = useState<Integrator[]>([]);
    const integratorsQuery = useIntegratorsQuery({
        enabled: true,
    });

    useEffect(() => {
        if (integratorsQuery.isSuccess && integratorsQuery.data) {
            setIntegratorsData(integratorsQuery.data);
        }
    }, [integratorsQuery.isSuccess, integratorsQuery.data]);

    const allIntegratorsTotalVolume =
        integratorsData.length > 0
            ? integratorsData
                  .map((integrator: Integrator) => integrator.totalVolume)
                  .reduce((prevVolume, currVolume) => prevVolume + currVolume)
            : 0;

    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--integrators" />
                <TitleLabel>{t('dashboard.integrators.title')}</TitleLabel>
            </WidgetHeader>
            <FullWidthInfoSection>
                <InfoText color={Colors.WHITE}>{t('dashboard.integrators.total-volume')}</InfoText>
                <InfoStats color={Colors.CYAN}>$ {formatCurrency(allIntegratorsTotalVolume)}</InfoStats>
                {integratorsData.map((integrator) => (
                    <>
                        <InfoText>{integrator.id}</InfoText>
                        <InfoStats>$ {formatCurrency(integrator.totalVolume)}</InfoStats>
                    </>
                ))}
            </FullWidthInfoSection>
        </WidgetWrapper>
    );
};

export default IntegratorsVolume;
