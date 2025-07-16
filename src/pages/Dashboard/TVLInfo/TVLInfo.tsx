import LoadingContainer from 'components/LoadingContainer';
import { USD_SIGN } from 'constants/currency';
import useStatsQuery from 'queries/dashboard/useStatsQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { formatCurrencyWithSign } from 'thales-utils';
import { TVLStats } from 'types/statistics';
import {
    InfoSection,
    InfoStats,
    InfoText,
    TitleLabel,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

const TVLInfo: React.FC = () => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));

    const [tvlStats, setTvlStats] = useState<TVLStats | undefined>();

    const statsQuery = useStatsQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (statsQuery.isSuccess && statsQuery.data) {
            setTvlStats(statsQuery.data.TVLStats);
        }
    }, [statsQuery.isSuccess, statsQuery.data]);

    return (
        <LoadingContainer isLoading={statsQuery.isLoading}>
            <WidgetWrapper>
                <WidgetHeader>
                    <WidgetIcon className="icon icon--lock" />
                    <TitleLabel>{t('dashboard.tvl.title')}</TitleLabel>
                </WidgetHeader>
                <InfoSection side="left">
                    <InfoText>{t('dashboard.tvl.overtime-amm-tvl')}</InfoText>
                    <InfoText>{t('dashboard.tvl.speed-tvl')}</InfoText>
                </InfoSection>
                <InfoSection side="right">
                    <InfoStats>
                        {tvlStats
                            ? `${formatCurrencyWithSign(
                                  USD_SIGN,
                                  tvlStats.overtimeSingleTVL + tvlStats.overtimeParlayTVL + tvlStats.overtimeV2TVL
                              )}`
                            : '-'}
                    </InfoStats>
                    <InfoStats>
                        {tvlStats ? `${formatCurrencyWithSign(USD_SIGN, tvlStats.speedMarketsTVL)}` : '-'}
                    </InfoStats>
                </InfoSection>
            </WidgetWrapper>
        </LoadingContainer>
    );
};

export default TVLInfo;
