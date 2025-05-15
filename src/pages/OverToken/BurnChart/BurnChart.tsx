import { OVER_CURRENCY } from 'constants/currency';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled, { useTheme } from 'styled-components';
import { FlexDivCentered, FlexDivColumn, FlexDivColumnCentered, FlexDivRow, FlexDivSpaceBetween } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { BuybackByDate } from 'types/token';
import { ThemeInterface } from 'types/ui';

type BurnChartProps = {
    buybackByDates: BuybackByDate[];
};

const BurnChart: React.FC<BurnChartProps> = ({ buybackByDates }) => {
    const { t } = useTranslation();
    const theme: ThemeInterface = useTheme();

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            console.log(payload, payload[0].payload, payload[0].payload.date);
            return (
                <TooltipContainer>
                    <TooltipLabel>{payload[0].payload.date}</TooltipLabel>
                    <TooltipInfoContainer>
                        <TooltipInfoLabel>Cumulative burn:</TooltipInfoLabel>
                        <TooltipInfoValue>{formatCurrencyWithKey(OVER_CURRENCY, payload[0].value)}</TooltipInfoValue>
                    </TooltipInfoContainer>
                    <TooltipInfoContainer>
                        <TooltipInfoLabel>Daily burn:</TooltipInfoLabel>
                        <TooltipInfoValue>
                            {formatCurrencyWithKey(OVER_CURRENCY, payload[0].payload.amountOut)}
                        </TooltipInfoValue>
                    </TooltipInfoContainer>
                </TooltipContainer>
            );
        }
        return null;
    };

    const CustomizedDot: React.FC = (props: any) => {
        const { cx, cy } = props;

        return (
            <svg height="8" width="8" overflow="visible">
                <circle cx={cx} cy={cy} r="4" fill={theme.textColor.primary} />
            </svg>
        );
    };

    const noData = buybackByDates.length === 0;

    return (
        <Container>
            <Header noData={noData}></Header>
            {!noData ? (
                <ChartContainer>
                    <Title>$OVER TOKEN BUYBACK AND BURN </Title>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={buybackByDates}>
                            {/* <CartesianGrid strokeDasharray="2 2" strokeWidth={0.5} stroke={theme.textColor.primary} /> */}
                            <XAxis
                                dataKey="date"
                                tickLine={true}
                                axisLine={true}
                                tick={{ fill: theme.textColor.primary }}
                                style={{
                                    fontSize: '12px',
                                }}
                                minTickGap={20}
                                tickMargin={10}
                            />
                            <YAxis
                                tickFormatter={(number) => {
                                    if (number > 1000000000) {
                                        return (number / 1000000000).toString() + 'B';
                                    } else if (number > 1000000) {
                                        return (number / 1000000).toString() + 'M';
                                    } else if (number > 1000) {
                                        return (number / 1000).toString() + 'K';
                                    } else {
                                        return number.toString();
                                    }
                                }}
                                tickLine={true}
                                axisLine={true}
                                tick={{ fill: theme.textColor.primary }}
                                style={{
                                    fontSize: '12px',
                                }}
                                width={50}
                                tickMargin={10}
                                orientation={'right'}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: theme.textColor.secondary, fillOpacity: '0.3' }}
                                wrapperStyle={{ outline: 'none' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="cumulativeAmountOut"
                                stroke={theme.error.textColor.tertiary}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            ) : (
                <NoData>{t(`liquidity-pool.pnl.no-data`)}</NoData>
            )}
        </Container>
    );
};

const Container = styled(FlexDivColumn)`
    width: 100%;
`;

const ChartContainer = styled.div`
    position: relative;
    background: ${(props) => props.theme.background.primary};
    padding: 30px 30px;
    border-radius: 22px;
    height: 400px;
    width: 100%;
    @media (max-width: 767px) {
        height: 200px;
        padding: 10px 10px;
    }
`;

const TooltipContainer = styled(FlexDivColumnCentered)`
    min-width: 200px;
    padding: 10px;
    border-radius: 5px;
    z-index: 999;
    padding: 15px 15px;
    background: ${(props) => props.theme.background.primary};
    border: 1px solid ${(props) => props.theme.borderColor.secondary};
    color: ${(props) => props.theme.textColor.primary};
    text-align: left;
`;

const TooltipLabel = styled(FlexDivColumn)`
    border-bottom: 1px solid ${(props) => props.theme.borderColor.tertiary};
    padding-bottom: 5px;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 12px;
    text-align: left;
`;

const TooltipInfoContainer = styled(FlexDivSpaceBetween)`
    font-weight: 500;
    font-size: 13px;
    text-align: left;
    line-height: 18px;
    gap: 30px;
`;

const TooltipInfoLabel = styled.span`
    color: ${(props) => props.theme.textColor.tertiary};
`;

const TooltipInfoValue = styled.span`
    font-weight: 600;
`;

const Header = styled(FlexDivRow)<{ noData?: boolean }>`
    margin: ${(props) => (props.noData ? '20px 0px 5px 0px' : '20px 6px 5px 58px')};
`;

const Title = styled.span`
    position: absolute;
    color: ${(props) => props.theme.textColor.primary};
    font-weight: 600;
    font-size: 25px;
    line-height: 100%;
    letter-spacing: 0%;
    text-transform: uppercase;
`;

const NoData = styled(FlexDivCentered)`
    border: 2px dotted ${(props) => props.theme.textColor.secondary};
    margin-bottom: 10px;
    height: 200px;
    color: ${(props) => props.theme.textColor.secondary};
    padding: 10px;
    text-align: center;
`;

export default BurnChart;
