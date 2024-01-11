import useUsersStatsQuery from 'queries/dashboard/useUsersStatsQuery';
import useVolumeStatsQuery from 'queries/dashboard/useVolumeStatsQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { FlexDiv } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { UsersStats, VolumeStats } from 'types/statistics';
import {
    InfoSection,
    InfoStats,
    InfoText,
    NumericStats,
    TitleLabel,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

const ProtocolVolume: React.FC = () => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));

    const [usersStats, setUsersStats] = useState<UsersStats | undefined>();
    const [volumeStats, setVolumeStats] = useState<VolumeStats | undefined>();

    const usersStatsQuery = useUsersStatsQuery({
        enabled: isAppReady,
    });

    const volumeStatsQuery = useVolumeStatsQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (usersStatsQuery.isSuccess && usersStatsQuery.data) {
            setUsersStats(usersStatsQuery.data);
        }
    }, [usersStatsQuery.isSuccess, usersStatsQuery.data]);

    useEffect(() => {
        if (volumeStatsQuery.isSuccess && volumeStatsQuery.data) {
            setVolumeStats(volumeStatsQuery.data);
        }
    }, [volumeStatsQuery.isSuccess, volumeStatsQuery.data]);

    return (
        <WidgetWrapper isDoubleHeight={true}>
            <WidgetHeader notFlex={true}>
                <FlexDiv>
                    <WidgetIcon className="icon icon--protocol-volume" />
                    <TitleLabel>{t('dashboard.protocol-volume.total-protocol-volume')}</TitleLabel>
                </FlexDiv>
                <NumericStats>
                    $ {volumeStats ? formatCurrency(volumeStats.totalProtocolVolume, 2, true) : '-'}
                </NumericStats>
                <FlexDiv>
                    <WidgetIcon className="icon icon--safebox" />
                    <TitleLabel>{t('dashboard.protocol-volume.safebox-fees')}</TitleLabel>
                </FlexDiv>
                <NumericStats>$ {volumeStats ? formatCurrency(volumeStats.safeboxFees, 2, true) : '-'}</NumericStats>
            </WidgetHeader>
            <InfoSection side="left">
                <InfoText>{t('dashboard.protocol-volume.thales-amm')}</InfoText>
                <InfoText>{t('dashboard.protocol-volume.overtime-amm')}</InfoText>
                <InfoText>{t('dashboard.protocol-volume.parlay-amm')}</InfoText>
                <InfoText>{t('dashboard.protocol-volume.total-unique-users')}</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <InfoStats>$ {volumeStats ? formatCurrency(volumeStats.thalesAmmVolume) : '-'}</InfoStats>
                <InfoStats>$ {volumeStats ? formatCurrency(volumeStats.overtimeAmmVolume) : '-'}</InfoStats>
                <InfoStats>$ {volumeStats ? formatCurrency(volumeStats.parlayAmmVolume) : '-'}</InfoStats>
                <InfoStats>{usersStats ? formatCurrency(usersStats.averageUniqueUsers, 2, true) : '-'}</InfoStats>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default ProtocolVolume;
