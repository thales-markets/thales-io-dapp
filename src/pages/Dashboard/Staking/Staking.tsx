import SPAAnchor from 'components/SPAAnchor';
import { MONTH_NAMES } from 'constants/date';
import ROUTES from 'constants/routes';
import { StakersFilterEnum } from 'enums/governance';
import useTokenInfoQuery from 'queries/dashboard/useTokenInfoQuery';
import useWeeklyStatsQuery from 'queries/dashboard/useWeeklyStatsQuery';
import useGlobalStakingDataQuery from 'queries/token/useGlobalStakingDataQuery';
import useThalesStakersQuery from 'queries/useThalesStakersQuery';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Bar, BarChart, Cell, Tooltip as ChartTooltip, XAxis } from 'recharts';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { Colors, FlexDiv } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { Staker } from 'types/governance';
import { Fee, WeeklyStats } from 'types/statistics';
import { GlobalStakingData, TokenInfo } from 'types/token';
import { buildHref } from 'utils/routes';
import {
    ChartTooltipBox,
    ChartWrapper,
    FlexDivAlignStartSpaceBetween,
    FlexDivFullWidthSpaceBetween,
    InfoSection,
    InfoStats,
    InfoText,
    StakingInfo,
    TitleLabel,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

const Staking: React.FC = () => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));

    const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>();
    const [globalStakingData, setGlobalStakingData] = useState<GlobalStakingData | undefined>();
    const [weeklyData, setWeeklyData] = useState<WeeklyStats | undefined>();

    const globalStakingDataQuery = useGlobalStakingDataQuery({
        enabled: isAppReady,
    });

    const stakersQuery = useThalesStakersQuery(StakersFilterEnum.All, {
        enabled: isAppReady,
    });

    const weeklyStatsQuery = useWeeklyStatsQuery({
        enabled: isAppReady,
    });

    const stakers: Staker[] = useMemo(() => (stakersQuery.isSuccess && stakersQuery.data ? stakersQuery.data : []), [
        stakersQuery.isSuccess,
        stakersQuery.data,
    ]);

    const tokenInfoQuery = useTokenInfoQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (globalStakingDataQuery.isSuccess && globalStakingDataQuery.data) {
            setGlobalStakingData(globalStakingDataQuery.data);
        }
    }, [globalStakingDataQuery.isSuccess, globalStakingDataQuery.data]);

    useEffect(() => {
        if (tokenInfoQuery.isSuccess && tokenInfoQuery.data) {
            setTokenInfo(tokenInfoQuery.data);
        }
    }, [tokenInfoQuery.isSuccess, tokenInfoQuery.data]);

    useEffect(() => {
        if (weeklyStatsQuery.isSuccess && weeklyStatsQuery.data) {
            setWeeklyData(weeklyStatsQuery.data);
        }
    }, [weeklyStatsQuery.isSuccess, weeklyStatsQuery.data]);

    const stakedOfCirculatingSupplyPercentage =
        globalStakingData && tokenInfo
            ? (globalStakingData?.totalStakedAmount / tokenInfo?.circulatingSupply) * 100
            : 0;

    const chartData = useMemo(() => {
        let data = [];
        if (weeklyData) {
            const safeboxChartData = weeklyData.safeboxFees
                .sort((a, b) => {
                    const dateOfA = new Date(a.day);
                    const dateOfB = new Date(b.day);

                    return dateOfA.getTime() - dateOfB.getTime();
                })
                .map((safeboxData: Fee) => {
                    const dateOfSafebox = new Date(safeboxData.day);
                    const month = MONTH_NAMES[dateOfSafebox.getMonth()];
                    return {
                        name: 'Safebox',
                        date: safeboxData.day,
                        month: `${month}-${dateOfSafebox.getFullYear()}`,
                        amount: Number(safeboxData.amount.toFixed(2)),
                        color: Colors.METALLIC_BLUE,
                    };
                });

            const revShareChartData = weeklyData.revShare
                .sort((a, b) => {
                    const dateOfA = new Date(a.day);
                    const dateOfB = new Date(b.day);

                    return dateOfA.getTime() - dateOfB.getTime();
                })
                .slice(3)
                .map((revShareData: Fee) => {
                    const dateOfRevShare = new Date(revShareData.day);
                    const month = MONTH_NAMES[dateOfRevShare.getMonth()];
                    return {
                        name: 'RevShare',
                        date: revShareData.day,
                        month: `${month}-${dateOfRevShare.getFullYear()}`,
                        amount: Number(revShareData.amount.toFixed(2)),
                        color: Colors.CYAN,
                    };
                });

            data = [...safeboxChartData, ...revShareChartData].slice(-16);
        }

        return data;
    }, [weeklyData]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <ChartTooltipBox>
                    <InfoText color={Colors.WHITE}>
                        {payload[0].payload.name.toLowerCase() == 'revshare' ? 'Fees distributed' : 'Safebox fees'}
                    </InfoText>
                    <InfoStats>$ {payload[0].payload.amount}</InfoStats>
                    <InfoStats>{payload[0].payload.date}</InfoStats>
                </ChartTooltipBox>
            );
        }

        return null;
    };

    return (
        <SPAAnchor href={buildHref(ROUTES.Staking)}>
            <WidgetWrapper>
                <WidgetHeader isTwoSided={true}>
                    <FlexDiv>
                        <WidgetIcon className="icon icon--staking" />
                        <TitleLabel>{t('dashboard.staking.title')}</TitleLabel>
                    </FlexDiv>
                    <FlexDivAlignStartSpaceBetween>
                        <TitleLabel>{t('dashboard.staking.total-apy')}</TitleLabel>
                        <TitleLabel isHighlighted={true}>
                            {globalStakingData
                                ? `${(globalStakingData.thalesApy + globalStakingData.feeApy).toFixed(2)} %`
                                : '-'}
                        </TitleLabel>
                    </FlexDivAlignStartSpaceBetween>
                </WidgetHeader>
                <StakingInfo>
                    <InfoSection side="left" justifyContent="start">
                        <FlexDivFullWidthSpaceBetween>
                            <InfoText>{t('dashboard.staking.thales-token-rewards')}</InfoText>
                            <InfoStats>{globalStakingData ? `${globalStakingData.thalesApy} % APY` : '-'}</InfoStats>
                        </FlexDivFullWidthSpaceBetween>
                        <FlexDivFullWidthSpaceBetween>
                            <InfoText>{t('dashboard.staking.stablecoin-rewards')}</InfoText>
                            <InfoStats>{globalStakingData ? `${globalStakingData.feeApy} % APY` : '-'}</InfoStats>
                        </FlexDivFullWidthSpaceBetween>
                        <FlexDivFullWidthSpaceBetween>
                            <InfoText>{t('dashboard.staking.total-stakers')}</InfoText>
                            <InfoStats>{stakers.length}</InfoStats>
                        </FlexDivFullWidthSpaceBetween>
                    </InfoSection>
                    <InfoSection side="right" justifyContent="start">
                        <FlexDivFullWidthSpaceBetween>
                            <InfoText>{t('dashboard.staking.total-thales-staked')}</InfoText>
                            <InfoStats>
                                {globalStakingData ? formatCurrency(globalStakingData.totalStakedAmount) : '-'}
                            </InfoStats>
                        </FlexDivFullWidthSpaceBetween>
                        <FlexDivFullWidthSpaceBetween>
                            <InfoText>{t('dashboard.staking.of-circulating-supply')}</InfoText>
                            <InfoStats>{stakedOfCirculatingSupplyPercentage.toFixed(2)} %</InfoStats>
                        </FlexDivFullWidthSpaceBetween>
                    </InfoSection>
                </StakingInfo>
                <ChartWrapper>
                    <BarChart width={650} height={200} data={chartData}>
                        <XAxis
                            axisLine={false}
                            dataKey="month"
                            tickLine={false}
                            padding={{ left: 15, right: 15 }}
                            interval={4}
                        />
                        <ChartTooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: Colors.INDEPENDENCE,
                                strokeWidth: 2,
                                fill: 'transparent',
                            }}
                        />
                        <Bar dataKey="amount" radius={[25, 25, 25, 25]}>
                            {chartData.map((slice, index) => (
                                <Cell key={index} fill={slice.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartWrapper>
            </WidgetWrapper>
        </SPAAnchor>
    );
};

export default Staking;
