import LoadingContainer from 'components/LoadingContainer';
import useStakingDataQuery from 'queries/dashboard/useStakingDataQuery';
import useTokenInfoQuery from 'queries/dashboard/useTokenInfoQuery';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Cell, Label, Legend, Pie } from 'recharts';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { Colors } from 'styles/common';
import { StakingData, TokenInfo } from 'types/token';
import { DoubleSideInfoSection, StyledPieChart } from './styled-components';

const ThalesTokenInfo: React.FC = () => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>(undefined);
    const [stakingData, setStakingData] = useState<StakingData | undefined>(undefined);

    const tokenInfoQuery = useTokenInfoQuery({
        enabled: isAppReady,
    });

    const stakingDataQuery = useStakingDataQuery({ enabled: isAppReady });

    useEffect(() => {
        if (tokenInfoQuery.isSuccess && tokenInfoQuery.data) {
            setTokenInfo(tokenInfoQuery.data);
        }
    }, [tokenInfoQuery.isSuccess, tokenInfoQuery.data]);

    useEffect(() => {
        if (stakingDataQuery.isSuccess && stakingDataQuery.data) {
            setStakingData(stakingDataQuery.data);
        }
    }, [stakingDataQuery.isSuccess, stakingDataQuery.data]);

    const pieData = useMemo(() => {
        const data1 = [];
        if (tokenInfo) {
            const burnedPiece = { name: 'Burned', value: tokenInfo?.thalesBurned, color: Colors.VIOLET };
            const circulatingPiece = { name: 'Circulating', value: tokenInfo?.circulatingSupply, color: Colors.CYAN };
            data1.push(burnedPiece, circulatingPiece);
        }

        return data1;
    }, [tokenInfo]);

    const pieLegendData = useMemo(() => {
        const data1 = [];
        if (tokenInfo && stakingData) {
            const burnedPiece = {
                id: '1',
                value: 'Burned',
                stat: tokenInfo?.thalesBurned,
                percentage: (tokenInfo?.thalesBurned / tokenInfo.totalSupply) * 100,
                color: Colors.VIOLET,
            };
            const circulatingPiece = {
                id: '2',
                value: 'Circulating',
                stat: tokenInfo?.circulatingSupply,
                percentage: (tokenInfo?.circulatingSupply / tokenInfo.totalSupply) * 100,
                color: Colors.CYAN,
            };
            data1.push(burnedPiece, circulatingPiece);
        }

        return data1;
    }, [tokenInfo, stakingData]);

    const formatChartLegend = (value: string, entry: any) => {
        const percentage = entry.percentage;

        return (
            <span style={{ color: Colors.LIGHT_GRAY, fontSize: 13 }}>
                {value}{' '}
                <span style={{ color: Colors.WHITE, fontSize: 13 }}>
                    {value.toLowerCase() == 'non-circulating' ? '' : `${percentage.toFixed(2)}%`}
                </span>
            </span>
        );
    };

    return (
        <LoadingContainer isLoading={tokenInfoQuery.isLoading || stakingDataQuery.isLoading}>
            <DoubleSideInfoSection>
                <StyledPieChart width={500} height={500}>
                    <Legend
                        formatter={formatChartLegend}
                        iconType="circle"
                        layout="horizontal"
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
                        innerRadius={100}
                        outerRadius={200}
                        cx="50%"
                        cy="50%"
                    >
                        {pieData.map((slice, index) => (
                            <Cell style={{ outline: 'none' }} key={index} fill={slice.color} />
                        ))}
                        <Label className="chartLabel" value={t('dashboard.token-info.total-100m')} position="center" />
                    </Pie>
                </StyledPieChart>
            </DoubleSideInfoSection>
        </LoadingContainer>
    );
};

export default ThalesTokenInfo;
