import useIntegratorsQuery from 'queries/dashboard/useIntegratorsQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { Colors } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { Integrator } from 'types/integrator';
import {
    FlexDivFullWidthSpaceBetween,
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
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));

    const [integratorsData, setIntegratorsData] = useState<Integrator[]>([]);
    const integratorsQuery = useIntegratorsQuery({
        enabled: isAppReady,
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
                {integratorsData.map((integrator, index) => (
                    <FlexDivFullWidthSpaceBetween marginRight={5} key={index}>
                        <InfoText>{integrator.id}</InfoText>
                        <InfoStats>$ {formatCurrency(integrator.totalVolume)}</InfoStats>
                    </FlexDivFullWidthSpaceBetween>
                ))}
            </FullWidthInfoSection>
        </WidgetWrapper>
    );
};

export default IntegratorsVolume;
