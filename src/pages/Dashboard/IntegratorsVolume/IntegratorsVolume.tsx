import SPAAnchor from 'components/SPAAnchor';
import LINKS from 'constants/links';
import useIntegratorsQuery from 'queries/dashboard/useIntegratorsQuery';
import useStatsQuery from 'queries/dashboard/useStatsQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import { Colors } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { Integrator } from 'types/integrator';
import { VolumeStats } from 'types/statistics';
import {
    FlexDivIntegrators,
    FullWidthInfoSection,
    InfoSection,
    InfoStats,
    InfoText,
    LinkArrow,
    TitleLabel,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

const IntegratorsVolume: React.FC = () => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isMobile = useSelector(getIsMobile);

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

    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--integrators" />
                <TitleLabel>{t('dashboard.integrators.title')}</TitleLabel>
            </WidgetHeader>
            {isMobile ? (
                <>
                    <InfoSection side="left">
                        <SPAAnchor href={LINKS.ThalesMarkets} style={{ cursor: 'pointer' }}>
                            <InfoText>
                                {t('dashboard.integrators.thales-volume')} <LinkArrow color={Colors.GRAY} />
                            </InfoText>
                        </SPAAnchor>
                        <SPAAnchor href={LINKS.Overtime} style={{ cursor: 'pointer' }}>
                            <InfoText>
                                {t('dashboard.integrators.overtime-volume')} <LinkArrow color={Colors.GRAY} />
                            </InfoText>
                        </SPAAnchor>
                        <SPAAnchor href={LINKS.SpeedMarkets} style={{ cursor: 'pointer' }}>
                            {' '}
                            <InfoText>
                                {t('dashboard.integrators.speed-volume')} <LinkArrow color={Colors.GRAY} />
                            </InfoText>{' '}
                        </SPAAnchor>
                        {integratorsData.map((integrator, index) => (
                            <SPAAnchor key={index} href={integrator.url} style={{ cursor: 'pointer' }}>
                                <InfoText>
                                    {integrator.id} <LinkArrow color={Colors.GRAY} />
                                </InfoText>
                            </SPAAnchor>
                        ))}
                    </InfoSection>
                    <InfoSection side="right">
                        <InfoStats>$ {volumeStats ? formatCurrency(volumeStats?.thalesAmmVolume) : 0}</InfoStats>
                        <InfoStats>
                            ${' '}
                            {volumeStats
                                ? formatCurrency(volumeStats?.overtimeAmmVolume + volumeStats.parlayAmmVolume)
                                : 0}
                        </InfoStats>
                        <InfoStats>$ {volumeStats ? formatCurrency(volumeStats?.speedAmmVolume) : 0}</InfoStats>
                        {integratorsData.map((integrator, index) => (
                            <InfoStats key={index}>$ {formatCurrency(integrator.totalVolume)}</InfoStats>
                        ))}
                    </InfoSection>
                </>
            ) : (
                <FullWidthInfoSection>
                    <FlexDivIntegrators>
                        <SPAAnchor href={LINKS.ThalesMarkets} style={{ cursor: 'pointer' }}>
                            <InfoText>
                                {t('dashboard.integrators.thales-volume')} <LinkArrow color={Colors.GRAY} />
                            </InfoText>
                            <InfoStats>$ {volumeStats ? formatCurrency(volumeStats?.thalesAmmVolume) : 0}</InfoStats>
                        </SPAAnchor>
                    </FlexDivIntegrators>
                    <FlexDivIntegrators>
                        <SPAAnchor href={LINKS.Overtime} style={{ cursor: 'pointer' }}>
                            <InfoText>
                                {t('dashboard.integrators.overtime-volume')} <LinkArrow color={Colors.GRAY} />
                            </InfoText>
                            <InfoStats>
                                ${' '}
                                {volumeStats
                                    ? formatCurrency(volumeStats?.overtimeAmmVolume + volumeStats.parlayAmmVolume)
                                    : 0}
                            </InfoStats>
                        </SPAAnchor>
                    </FlexDivIntegrators>
                    <FlexDivIntegrators>
                        <SPAAnchor href={LINKS.SpeedMarkets} style={{ cursor: 'pointer' }}>
                            <InfoText>
                                {t('dashboard.integrators.speed-volume')} <LinkArrow color={Colors.GRAY} />
                            </InfoText>
                            <InfoStats>$ {volumeStats ? formatCurrency(volumeStats?.speedAmmVolume) : 0}</InfoStats>
                        </SPAAnchor>
                    </FlexDivIntegrators>
                    {integratorsData.map((integrator, index) => (
                        <FlexDivIntegrators key={index}>
                            <SPAAnchor href={integrator.url} style={{ cursor: 'pointer' }}>
                                <InfoText>
                                    {integrator.id} <LinkArrow color={Colors.GRAY} />
                                </InfoText>
                                <InfoStats>$ {formatCurrency(integrator.totalVolume)}</InfoStats>
                            </SPAAnchor>
                        </FlexDivIntegrators>
                    ))}
                </FullWidthInfoSection>
            )}
        </WidgetWrapper>
    );
};

export default IntegratorsVolume;
