import LoadingContainer from 'components/LoadingContainer';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Label, Legend, Pie } from 'recharts';
import { Colors } from 'styles/common';
import { OverTokenInfo } from 'types/token';
import { StyledPieChart } from './styled-components';

type OverSupplyChartProps = {
    overTokenInfo: OverTokenInfo;
    isLoading: boolean;
};

const OverSupplyChart: React.FC<OverSupplyChartProps> = ({ overTokenInfo, isLoading }) => {
    const { t } = useTranslation();

    const pieData = useMemo(() => {
        const data1 = [];
        const circulatingPiece = { name: 'Circulating', value: overTokenInfo?.circulatingSupply, color: Colors.CYAN };
        const burnedPiece = { name: 'Burned', value: overTokenInfo?.burned, color: Colors.RED };
        data1.push(circulatingPiece, burnedPiece);

        return data1;
    }, [overTokenInfo]);

    const pieLegendData = useMemo(() => {
        const data1 = [];
        const circulatingPiece = {
            id: '1',
            value: 'Circulating: ',
            stat: overTokenInfo?.circulatingSupply,
            percentage: (overTokenInfo?.circulatingSupply / overTokenInfo.totalSupply) * 100,
            color: Colors.CYAN,
        };
        const burnedPiece = {
            id: '2',
            value: 'Burned: ',
            stat: overTokenInfo?.burned,
            percentage: (overTokenInfo?.burned / overTokenInfo.totalSupply) * 100,
            color: Colors.RED,
        };
        data1.push(circulatingPiece, burnedPiece);

        return data1;
    }, [overTokenInfo]);

    const formatChartLegend = (value: string, entry: any) => {
        const percentage = entry.percentage;

        return (
            <span style={{ color: Colors.LIGHT_GRAY, fontSize: 13 }}>
                {value} <span style={{ color: Colors.WHITE, fontSize: 13 }}>{`${percentage.toFixed(2)}%`}</span>
            </span>
        );
    };

    return (
        <LoadingContainer isLoading={isLoading}>
            <StyledPieChart width={520} height={520}>
                <Legend
                    formatter={formatChartLegend}
                    iconType="circle"
                    layout="horizontal"
                    align="center"
                    verticalAlign="top"
                    height={20}
                    payload={pieLegendData}
                    wrapperStyle={{ bottom: -5, left: 0 }}
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
