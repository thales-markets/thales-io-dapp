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
import { AMMsTVLData } from 'types/liquidity';
import useOvertimeAMMsTVLDataQuery from 'queries/dashboard/useOvertimeAMMsTVLDataQuery';
import useParlayAMMsTVLDataQuery from 'queries/dashboard/useParlayAMMsTVLDataQuery';
import useThalesAMMsTVLDataQuery from 'queries/dashboard/useThalesAMMsTVLDataQuery';
import { useState, useEffect } from 'react';
import { formatCurrency } from 'thales-utils';

const TVLInfo: React.FC = () => {
    const { t } = useTranslation();

    //TODO: ADD VAULTS TVL INFO
    const [overtimeAmmTvlData, setOvertimeAmmTvlData] = useState<AMMsTVLData>();
    const overtimeAMMsTVLDataQuery = useOvertimeAMMsTVLDataQuery({
        enabled: true,
    });

    const [parlayAmmTvlData, setParlayAmmTvlData] = useState<AMMsTVLData>();
    const parlayAMMsTVLDataQuery = useParlayAMMsTVLDataQuery({
        enabled: true,
    });

    const [thalesAmmTvlData, setThalesAmmTvlData] = useState<AMMsTVLData>();
    const thalesAMMsTVLDataQuery = useThalesAMMsTVLDataQuery({
        enabled: true,
    });

    useEffect(() => {
        if (overtimeAMMsTVLDataQuery.isSuccess && overtimeAMMsTVLDataQuery.data) {
            setOvertimeAmmTvlData(overtimeAMMsTVLDataQuery.data);
        }
    }, [overtimeAMMsTVLDataQuery.isSuccess, overtimeAMMsTVLDataQuery.data]);

    useEffect(() => {
        if (parlayAMMsTVLDataQuery.isSuccess && parlayAMMsTVLDataQuery.data) {
            setParlayAmmTvlData(parlayAMMsTVLDataQuery.data);
        }
    }, [parlayAMMsTVLDataQuery.isSuccess, parlayAMMsTVLDataQuery.data]);

    useEffect(() => {
        if (thalesAMMsTVLDataQuery.isSuccess && thalesAMMsTVLDataQuery.data) {
            setThalesAmmTvlData(thalesAMMsTVLDataQuery.data);
        }
    }, [thalesAMMsTVLDataQuery.isSuccess, thalesAMMsTVLDataQuery.data]);

    const overtimeAmmAggregatedTvl = overtimeAmmTvlData
        ? overtimeAmmTvlData?.opTVL + overtimeAmmTvlData?.arbTVL + overtimeAmmTvlData?.baseTVL
        : 0;

    const parlayAmmAggregatedTvl = parlayAmmTvlData
        ? parlayAmmTvlData?.opTVL + parlayAmmTvlData?.arbTVL + parlayAmmTvlData?.baseTVL
        : 0;

    const thalesAmmAggregatedTvl = thalesAmmTvlData
        ? thalesAmmTvlData?.opTVL + thalesAmmTvlData?.arbTVL + thalesAmmTvlData?.baseTVL
        : 0;

    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--lock" />
                <TitleLabel>{t('dashboard.tvl.title')}</TitleLabel>
            </WidgetHeader>
            <InfoSection side="left">
                <InfoText>{t('dashboard.tvl.overtime-amm-tvl')}</InfoText>
                <InfoText>{t('dashboard.tvl.thales-amm-tvl')}</InfoText>
                <InfoText>{t('dashboard.tvl.parlay-amm-tvl')}</InfoText>
                <InfoText>{t('dashboard.tvl.vaults-tvl')}</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <InfoStats>$ {formatCurrency(overtimeAmmAggregatedTvl)}</InfoStats>
                <InfoStats>$ {formatCurrency(parlayAmmAggregatedTvl)}</InfoStats>
                <InfoStats>$ {formatCurrency(thalesAmmAggregatedTvl)}</InfoStats>
                <InfoStats>$ 100,929</InfoStats>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default TVLInfo;
