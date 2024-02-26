import LoadingContainer from 'components/LoadingContainer';
import useStatsQuery from 'queries/dashboard/useStatsQuery';
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

    const statsQuery = useStatsQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (statsQuery.isSuccess && statsQuery.data) {
            setUsersStats(statsQuery.data.usersStats);
            setVolumeStats(statsQuery.data.volumeStats);
        }
    }, [statsQuery.isSuccess, statsQuery.data]);

    return (
        <LoadingContainer isLoading={statsQuery.isLoading}>
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
                    <NumericStats>
                        $ {volumeStats ? formatCurrency(volumeStats.safeboxFees, 2, true) : '-'}
                    </NumericStats>
                </WidgetHeader>
                <InfoSection side="left">
                    <InfoText>{t('dashboard.protocol-volume.thales-amm')}</InfoText>
                    <InfoText>{t('dashboard.protocol-volume.overtime-amm')}</InfoText>
                    <InfoText>{t('dashboard.protocol-volume.speed-amm')}</InfoText>
                    <InfoText>{t('dashboard.protocol-volume.total-unique-users')}</InfoText>
                </InfoSection>
                <InfoSection side="right">
                    <InfoStats>$ {volumeStats ? formatCurrency(volumeStats.thalesAmmVolume) : '-'}</InfoStats>
                    <InfoStats>
                        ${' '}
                        {volumeStats
                            ? formatCurrency(volumeStats.overtimeAmmVolume + volumeStats.parlayAmmVolume)
                            : '-'}
                    </InfoStats>
                    <InfoStats>$ {volumeStats ? formatCurrency(volumeStats.speedAmmVolume) : '-'}</InfoStats>
                    <InfoStats>{usersStats ? formatCurrency(usersStats.totalUniqueUsers, 2, true) : '-'}</InfoStats>
                </InfoSection>
            </WidgetWrapper>
        </LoadingContainer>
    );
};

export default ProtocolVolume;
