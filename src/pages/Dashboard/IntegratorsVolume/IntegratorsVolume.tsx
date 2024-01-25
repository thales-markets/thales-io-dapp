import useIntegratorsQuery from 'queries/dashboard/useIntegratorsQuery';
import useStatsQuery from 'queries/dashboard/useStatsQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { Colors } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { Integrator } from 'types/integrator';
import { VolumeStats } from 'types/statistics';
import {
    FlexDivIntegrators,
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
    const [volumeStats, setVolumeStats] = useState<VolumeStats | undefined>();

    const integratorsQuery = useIntegratorsQuery({
        enabled: isAppReady,
    });

    const statsQuery = useStatsQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (statsQuery.isSuccess && statsQuery.data) {
            setVolumeStats(statsQuery.data.volumeStats);
        }
    }, [statsQuery.isSuccess, statsQuery.data]);

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
                <FlexDivIntegrators>
                    <InfoText color={Colors.WHITE}>{t('dashboard.integrators.total-volume')}</InfoText>
                    <InfoStats color={Colors.CYAN}>
                        ${' '}
                        {volumeStats
                            ? formatCurrency(
                                  allIntegratorsTotalVolume +
                                      volumeStats?.thalesAmmVolume +
                                      volumeStats?.overtimeAmmVolume +
                                      +volumeStats.parlayAmmVolume
                              )
                            : 0}
                    </InfoStats>
                </FlexDivIntegrators>
                <FlexDivIntegrators>
                    <InfoText>{t('dashboard.integrators.thales-volume')}</InfoText>
                    <InfoStats>$ {volumeStats ? formatCurrency(volumeStats?.thalesAmmVolume) : 0}</InfoStats>
                </FlexDivIntegrators>
                <FlexDivIntegrators>
                    <InfoText>{t('dashboard.integrators.overtime-volume')}</InfoText>
                    <InfoStats>
                        ${' '}
                        {volumeStats ? formatCurrency(volumeStats?.overtimeAmmVolume + volumeStats.parlayAmmVolume) : 0}
                    </InfoStats>
                </FlexDivIntegrators>
                {integratorsData.map((integrator, index) => (
                    <FlexDivIntegrators key={index}>
                        <InfoText>{integrator.id}</InfoText>
                        <InfoStats>$ {formatCurrency(integrator.totalVolume)}</InfoStats>
                    </FlexDivIntegrators>
                ))}
            </FullWidthInfoSection>
        </WidgetWrapper>
    );
};

export default IntegratorsVolume;
