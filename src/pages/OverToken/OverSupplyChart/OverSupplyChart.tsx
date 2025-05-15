import LoadingContainer from 'components/LoadingContainer';
import { OVER_CURRENCY } from 'constants/currency';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Label, Legend, Pie, Tooltip } from 'recharts';
import { Colors } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';
import { OverTokenInfo } from 'types/token';
import {
    StyledPieChart,
    TooltipContainer,
    TooltipInfoContainer,
    TooltipInfoLabel,
    TooltipInfoValue,
} from './styled-components';

type OverSupplyChartProps = {
    overTokenInfo: OverTokenInfo;
    isLoading: boolean;
};

const OverSupplyChart: React.FC<OverSupplyChartProps> = ({ overTokenInfo, isLoading }) => {
    const { t } = useTranslation();

    const pieData = useMemo(() => {
        const data1 = [];
        const circulatingPiece = {
            name: t('over-token.chart.circulating'),
            value: overTokenInfo.circulatingSupply,
            color: Colors.CYAN,
            total: overTokenInfo.totalSupply,
        };
        const burnedPiece = {
            name: t('over-token.chart.burned'),
            value: overTokenInfo.burned,
            color: Colors.RED,
            total: overTokenInfo.totalSupply,
        };
        data1.push(circulatingPiece, burnedPiece);

        return data1;
    }, [overTokenInfo.burned, overTokenInfo.circulatingSupply, overTokenInfo.totalSupply, t]);

    const pieLegendData = useMemo(() => {
        const data1 = [];
        const circulatingPiece = {
            id: '1',
            value: `${t('over-token.chart.circulating')}:`,
            stat: overTokenInfo.circulatingSupply,
            percentage: (overTokenInfo.circulatingSupply / overTokenInfo.totalSupply) * 100,
            color: Colors.CYAN,
            total: overTokenInfo.totalSupply,
        };
        const burnedPiece = {
            id: '2',
            value: `${t('over-token.chart.burned')}:`,
            stat: overTokenInfo.burned,
            percentage: (overTokenInfo.burned / overTokenInfo.totalSupply) * 100,
            color: Colors.RED,
            total: overTokenInfo.totalSupply,
        };
        data1.push(circulatingPiece, burnedPiece);

        return data1;
    }, [overTokenInfo.burned, overTokenInfo.circulatingSupply, overTokenInfo.totalSupply, t]);

    const formatChartLegend = (value: string, entry: any) => {
        const percentage = entry.percentage;

        return (
            <span style={{ color: Colors.LIGHT_GRAY, fontSize: 13 }}>
                {value} <span style={{ color: Colors.WHITE, fontSize: 13 }}>{`${percentage.toFixed(2)}%`}</span>
            </span>
        );
    };

    console.log('OverSupplyChart', pieLegendData);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <TooltipContainer>
                    <TooltipInfoContainer>
                        <TooltipInfoLabel>
                            {t(`over-token.chart.${payload[0].name.toLowerCase()}-supply`)}:
                        </TooltipInfoLabel>
                        <TooltipInfoValue>{formatCurrencyWithKey(OVER_CURRENCY, payload[0].value)}</TooltipInfoValue>
                    </TooltipInfoContainer>
                    <TooltipInfoContainer>
                        <TooltipInfoLabel>{t('over-token.chart.percentage-of-total')}:</TooltipInfoLabel>
                        <TooltipInfoValue>
                            {((payload[0].value / payload[0].payload.total) * 100).toFixed(2)}%
                        </TooltipInfoValue>
                    </TooltipInfoContainer>
                </TooltipContainer>
            );
        }
        return null;
    };

    return (
        <LoadingContainer isLoading={isLoading}>
            <StyledPieChart width={520} height={520}>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    formatter={formatChartLegend}
                    iconType="circle"
                    layout="vertical"
                    align="center"
                    verticalAlign="top"
                    height={20}
                    payload={pieLegendData}
                    wrapperStyle={{ bottom: 0, left: 0 }}
                />
                <Pie
                    isAnimationActive={false}
                    blendStroke={true}
                    data={pieData}
                    dataKey={'value'}
                    innerRadius={120}
                    outerRadius={220}
                    cx="50%"
                    cy="50%"
                >
                    {pieData.map((slice, index) => (
                        <Cell style={{ outline: 'none' }} key={index} fill={slice.color} />
                    ))}
                    <Label className="chartLabel" value={t('over-token.total-supply')} position="center" />
                </Pie>
            </StyledPieChart>
        </LoadingContainer>
    );
};

export default OverSupplyChart;
