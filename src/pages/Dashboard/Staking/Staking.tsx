import LoadingContainer from 'components/LoadingContainer';
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
import { Bar, BarChart, Cell, Tooltip as ChartTooltip, Label, ResponsiveContainer, XAxis } from 'recharts';
import { getIsAppReady } from 'redux/modules/app';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import { Colors, FlexDiv, FlexDivStart } from 'styles/common';
import { formatCurrency, roundNumberToDecimals } from 'thales-utils';
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
    const isMobile = useSelector(getIsMobile);

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
        let data: any[] = [];
        if (weeklyData) {
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
                        month: month,
                        amount: Number(revShareData.amount.toFixed(2)),
                        color: Colors.CYAN,
                    };
                });
            if (revShareChartData.length >= 16) {
                data = [...revShareChartData].slice(-16);
            } else {
                data = [...revShareChartData];
                for (let i = 0; i < 16 - revShareChartData.length; i++) {
                    data.push({ name: 'RevShare', date: '', month: ``, amount: 0, color: Colors.CYAN });
                }
            }
        }

        return data;
    }, [weeklyData]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            if (payload[0].payload.amount == 0) {
                return <></>;
            }
            return (
                <ChartTooltipBox>
                    <InfoText color={Colors.WHITE}>
                        {payload[0].payload.name.toLowerCase() == 'revshare' ? 'Fees distributed' : 'Safebox fees'}
                    </InfoText>
                    <InfoStats>$ {formatCurrency(payload[0].payload.amount)}</InfoStats>
                    <InfoStats>{payload[0].payload.date}</InfoStats>
                </ChartTooltipBox>
            );
        }

        return null;
    };

    return (
        <LoadingContainer
            isLoading={globalStakingDataQuery.isLoading || tokenInfoQuery.isLoading || weeklyStatsQuery.isLoading}
        >
            {isMobile ? (
                <WidgetWrapper isStakingWidget={true}>
                    <WidgetHeader notFlex={true}>
                        <FlexDiv>
                            <WidgetIcon marginLeft="-5px" className="icon icon--staking" />
                            <TitleLabel>{t('dashboard.staking.title')}</TitleLabel>
                        </FlexDiv>
                        <FlexDivStart>
                            <TitleLabel>{t('dashboard.staking.total-apy')}</TitleLabel>
                            <TitleLabel isHighlighted={true}>
                                {globalStakingData
                                    ? `${roundNumberToDecimals(
                                          globalStakingData.thalesApy + globalStakingData.feeApy,
                                          2
                                      )} %`
                                    : '-'}
                            </TitleLabel>
                        </FlexDivStart>
                    </WidgetHeader>
                    <StakingInfo>
                        <InfoSection isStakingWidget={true} side="left">
                            <InfoText>{t('dashboard.staking.thales-token-rewards')}</InfoText>
                            <InfoText>{t('dashboard.staking.stablecoin-rewards')}</InfoText>
                            <InfoText>{t('dashboard.staking.total-stakers')}</InfoText>
                            <InfoText>{t('dashboard.staking.total-thales-staked')}</InfoText>
                            <InfoText>{t('dashboard.staking.of-circulating-supply')}</InfoText>
                        </InfoSection>
                        <InfoSection isStakingWidget={true} side="right">
                            <InfoStats>{globalStakingData ? `${globalStakingData.thalesApy}% APY` : '-'}</InfoStats>
                            <InfoStats>{globalStakingData ? `${globalStakingData.feeApy}% APY` : '-'}</InfoStats>
                            <InfoStats>
                                {stakersQuery.isLoading ? '-' : formatCurrency(stakers.length, 0, true)}
                            </InfoStats>
                            <InfoStats>
                                {globalStakingData ? formatCurrency(globalStakingData.totalStakedAmount) : '-'}
                            </InfoStats>
                            <InfoStats>{roundNumberToDecimals(stakedOfCirculatingSupplyPercentage, 2)}%</InfoStats>
                        </InfoSection>
                    </StakingInfo>
                    <ChartWrapper>
                        <ResponsiveContainer width="100%" height={140}>
                            <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                <XAxis
                                    axisLine={false}
                                    dataKey="month"
                                    tickLine={false}
                                    padding={{ left: 12, right: 12 }}
                                    interval={4}
                                    tick={{ fontSize: 13 }}
                                >
                                    <Label
                                        value="Fees distributed per round"
                                        position="insideBottom"
                                        dy={-115}
                                        fill={Colors.WHITE}
                                        fontSize={13}
                                    />
                                </XAxis>
                                <ChartTooltip content={<CustomTooltip />} cursor={false} />
                                <Bar dataKey="amount" radius={[25, 25, 25, 25]}>
                                    {chartData.map((slice, index) => (
                                        <Cell key={index} fill={slice.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartWrapper>
                </WidgetWrapper>
            ) : (
                <SPAAnchor href={buildHref(ROUTES.Token.Staking.Home)}>
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
                                        ? `${roundNumberToDecimals(
                                              globalStakingData.thalesApy + globalStakingData.feeApy,
                                              2
                                          )}%`
                                        : '-'}
                                </TitleLabel>
                            </FlexDivAlignStartSpaceBetween>
                        </WidgetHeader>
                        <StakingInfo>
                            <InfoSection side="left" justifyContent="start">
                                <FlexDivFullWidthSpaceBetween>
                                    <InfoText>{t('dashboard.staking.thales-token-rewards')}</InfoText>
                                    <InfoStats>
                                        {globalStakingData ? `${globalStakingData.thalesApy}% APY` : '-'}
                                    </InfoStats>
                                </FlexDivFullWidthSpaceBetween>
                                <FlexDivFullWidthSpaceBetween>
                                    <InfoText>{t('dashboard.staking.stablecoin-rewards')}</InfoText>
                                    <InfoStats>
                                        {globalStakingData ? `${globalStakingData.feeApy}% APY` : '-'}
                                    </InfoStats>
                                </FlexDivFullWidthSpaceBetween>
                                <FlexDivFullWidthSpaceBetween>
                                    <InfoText>{t('dashboard.staking.total-stakers')}</InfoText>
                                    <InfoStats>{formatCurrency(stakers.length, 0, true)}</InfoStats>
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
                                    <InfoStats>
                                        {roundNumberToDecimals(stakedOfCirculatingSupplyPercentage, 2)}%
                                    </InfoStats>
                                </FlexDivFullWidthSpaceBetween>
                            </InfoSection>
                        </StakingInfo>
                        <ChartWrapper>
                            <BarChart
                                width={630}
                                height={200}
                                data={chartData}
                                margin={{ top: 25, right: 0, left: 0, bottom: 0 }}
                            >
                                <XAxis
                                    axisLine={false}
                                    dataKey="month"
                                    tickLine={false}
                                    padding={{ left: 15, right: 15 }}
                                    interval={4}
                                >
                                    <Label
                                        value="Fees distributed per round"
                                        position="insideBottom"
                                        dy={-175}
                                        fill={Colors.WHITE}
                                        fontSize={18}
                                    />
                                </XAxis>
                                <ChartTooltip content={<CustomTooltip />} cursor={false} />
                                <Bar dataKey="amount" radius={[25, 25, 25, 25]}>
                                    {chartData.map((slice, index) => (
                                        <Cell key={index} fill={slice.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ChartWrapper>
                    </WidgetWrapper>
                </SPAAnchor>
            )}
        </LoadingContainer>
    );
};

export default Staking;
