import useParlayAMMsTVLDataQuery from 'queries/dashboard/useParlayAMMsTVLDataQuery';
import useSportAMMsTVLDataQuery from 'queries/dashboard/useSportAMMsTVLDataQuery';
import useSportVaultsDataQuery from 'queries/dashboard/useSportVaultsDataQuery';
import useThalesAMMsTVLDataQuery from 'queries/dashboard/useThalesAMMsTVLDataQuery';
import useThalesVaultsDataQuery from 'queries/dashboard/useThalesVaultsDataQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { formatCurrency } from 'thales-utils';
import { AMMsTVLData, VaultsTVLData } from 'types/liquidity';
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

    const [sportAmmTvlData, setSportAmmTvlData] = useState<AMMsTVLData>();
    const overtimeAMMsTVLDataQuery = useSportAMMsTVLDataQuery({
        enabled: isAppReady,
    });

    const [parlayAmmTvlData, setParlayAmmTvlData] = useState<AMMsTVLData>();
    const parlayAMMsTVLDataQuery = useParlayAMMsTVLDataQuery({
        enabled: isAppReady,
    });

    const [thalesAmmTvlData, setThalesAmmTvlData] = useState<AMMsTVLData>();
    const thalesAMMsTVLDataQuery = useThalesAMMsTVLDataQuery({
        enabled: isAppReady,
    });

    const [sportVaultsTvlData, setSportVaultsTvlData] = useState<VaultsTVLData>();
    const sportVaultsDataQuery = useSportVaultsDataQuery({
        enabled: isAppReady,
    });

    const [thalesVaultsTvlData, setThalesVaultsTvlData] = useState<VaultsTVLData>();
    const thalesVaultsDataQuery = useThalesVaultsDataQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (overtimeAMMsTVLDataQuery.isSuccess && overtimeAMMsTVLDataQuery.data) {
            setSportAmmTvlData(overtimeAMMsTVLDataQuery.data);
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

    useEffect(() => {
        if (sportVaultsDataQuery.isSuccess && sportVaultsDataQuery.data) {
            setSportVaultsTvlData(sportVaultsDataQuery.data);
        }
    }, [sportVaultsDataQuery.isSuccess, sportVaultsDataQuery.data]);

    useEffect(() => {
        if (thalesVaultsDataQuery.isSuccess && thalesVaultsDataQuery.data) {
            setThalesVaultsTvlData(thalesVaultsDataQuery.data);
        }
    }, [thalesVaultsDataQuery.isSuccess, thalesVaultsDataQuery.data]);

    const sportAmmAggregatedTvl = sportAmmTvlData
        ? sportAmmTvlData?.opTVL + sportAmmTvlData?.arbTVL + sportAmmTvlData?.baseTVL
        : 0;

    const parlayAmmAggregatedTvl = parlayAmmTvlData
        ? parlayAmmTvlData?.opTVL + parlayAmmTvlData?.arbTVL + parlayAmmTvlData?.baseTVL
        : 0;

    const thalesAmmAggregatedTvl = thalesAmmTvlData
        ? thalesAmmTvlData?.opTVL + thalesAmmTvlData?.arbTVL + thalesAmmTvlData?.baseTVL
        : 0;

    const sportVaultsAggregatedTvl = sportVaultsTvlData
        ? sportVaultsTvlData?.opDiscountVaultTVL +
          sportVaultsTvlData?.opDegenDiscountVaultTVL +
          sportVaultsTvlData?.opSafuDiscountVaultTVL +
          sportVaultsTvlData?.opUpsettoorVaultTVL +
          sportVaultsTvlData?.arbDiscountVaultTVL +
          sportVaultsTvlData?.arbDegenDiscountVaultTVL +
          sportVaultsTvlData?.arbSafuDiscountVaultTVL +
          sportVaultsTvlData?.arbUpsettoorVaultTVL
        : 0;

    const thalesVaultsAggregatedTvl = thalesVaultsTvlData
        ? thalesVaultsTvlData?.opDiscountVaultTVL +
          thalesVaultsTvlData?.opDegenDiscountVaultTVL +
          thalesVaultsTvlData?.opSafuDiscountVaultTVL +
          thalesVaultsTvlData?.opUpsettoorVaultTVL +
          thalesVaultsTvlData?.arbDiscountVaultTVL +
          thalesVaultsTvlData?.arbDegenDiscountVaultTVL +
          thalesVaultsTvlData?.arbSafuDiscountVaultTVL +
          thalesVaultsTvlData?.arbUpsettoorVaultTVL
        : 0;

    const vaultsAggregatedTvl = sportVaultsAggregatedTvl + thalesVaultsAggregatedTvl;

    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--lock" />
                <TitleLabel>{t('dashboard.tvl.title')}</TitleLabel>
            </WidgetHeader>
            <InfoSection side="left">
                <InfoText>{t('dashboard.tvl.overtime-amm-tvl')}</InfoText>
                <InfoText>{t('dashboard.tvl.thales-amm-tvl')}</InfoText>
                <InfoText>{t('dashboard.tvl.vaults-tvl')}</InfoText>
            </InfoSection>
            <InfoSection side="right">
                <InfoStats>$ {formatCurrency(sportAmmAggregatedTvl + parlayAmmAggregatedTvl)}</InfoStats>
                <InfoStats>$ {formatCurrency(thalesAmmAggregatedTvl)}</InfoStats>
                <InfoStats>$ {formatCurrency(vaultsAggregatedTvl)}</InfoStats>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default TVLInfo;
