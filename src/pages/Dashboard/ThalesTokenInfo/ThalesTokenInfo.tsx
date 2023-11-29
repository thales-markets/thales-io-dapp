import useStakingDataQuery from 'queries/dashboard/useStakingDataQuery';
import useTokenInfoQuery from 'queries/dashboard/useTokenInfoQuery';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Cell, Legend, Pie } from 'recharts';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { Colors } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { StakingData, TokenInfo } from 'types/token';
import {
    ChartInnerText,
    DoubleSideInfoSection,
    FlexDivFullWidthSpaceBetween,
    InfoStats,
    InfoText,
    StyledPieChart,
    TitleLabel,
    UpperInfoSection,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

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
            const burnedPiece = { name: 'Burned', value: tokenInfo?.thalesBurned, color: Colors.CHINA_PINK };
            const circulatingPiece = { name: 'Circulating', value: tokenInfo?.circulatingSupply, color: Colors.VIOLET };
            const leftOverPiece = {
                name: 'Rest',
                value: tokenInfo.totalSupply - tokenInfo?.thalesBurned - tokenInfo?.circulatingSupply,
                color: Colors.CYAN,
            };
            data1.push(burnedPiece, circulatingPiece, leftOverPiece);
        }

        return data1;
    }, [tokenInfo]);

    const pie2Data = useMemo(() => {
        const data1 = [];
        if (stakingData && tokenInfo) {
            const stakingPiece = { name: 'Staked', value: stakingData?.totalStakedAmount, color: Colors.BLUEBERRY };
            const leftOverPiece = {
                name: 'Rest',
                value: tokenInfo.totalSupply - stakingData.totalStakedAmount,
                color: 'transparent',
            };
            data1.push(stakingPiece, leftOverPiece);
        }

        return data1;
    }, [stakingData, tokenInfo]);

    const pieLegendData = useMemo(() => {
        const data1 = [];
        if (tokenInfo && stakingData) {
            const burnedPiece = {
                id: '1',
                value: 'Burned',
                stat: tokenInfo?.thalesBurned,
                percentage: (tokenInfo?.thalesBurned / tokenInfo.totalSupply) * 100,
                color: Colors.CHINA_PINK,
            };
            const circulatingPiece = {
                id: '2',
                value: 'Circulating',
                stat: tokenInfo?.circulatingSupply,
                percentage: (tokenInfo?.circulatingSupply / tokenInfo.totalSupply) * 100,
                color: Colors.VIOLET,
            };
            const leftOverPiece = {
                id: '3',
                value: 'Staking',
                stat: stakingData?.totalStakedAmount,
                percentage: (stakingData?.totalStakedAmount / tokenInfo.totalSupply) * 100,
                color: Colors.BLUEBERRY,
            };
            data1.push(burnedPiece, circulatingPiece, leftOverPiece);
        }

        return data1;
    }, [tokenInfo, stakingData]);

    const formatChartLegend = (value: string, entry: any) => {
        const percentage = entry.percentage;

        return (
            <span style={{ color: Colors.GRAY, fontSize: 13, fontFamily: 'Nunito' }}>
                {value}{' '}
                <span style={{ color: Colors.WHITE, fontSize: 13, fontFamily: 'Nunito' }}>
                    {percentage.toFixed(2)}%
                </span>
            </span>
        );
    };

    return (
        <WidgetWrapper isDoubleHeight={true}>
            <WidgetHeader>
                <WidgetIcon className="icon icon--thales-round-logo" />
                <TitleLabel>{t('dashboard.token-info.title')}</TitleLabel>
            </WidgetHeader>
            <UpperInfoSection>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.token-info.total-supply')}</InfoText>
                    <InfoStats> {tokenInfo ? `${formatCurrency(tokenInfo.totalSupply)} THALES` : 'N/A'}</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.token-info.circulating-supply')}</InfoText>
                    <InfoStats>{tokenInfo ? `${formatCurrency(tokenInfo.circulatingSupply)} THALES` : 'N/A'}</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.token-info.burned-supply')}</InfoText>
                    <InfoStats>{tokenInfo ? `${formatCurrency(tokenInfo.thalesBurned)} THALES` : 'N/A'}</InfoStats>
                </FlexDivFullWidthSpaceBetween>
            </UpperInfoSection>
            <DoubleSideInfoSection>
                <ChartInnerText>Total 100M</ChartInnerText>
                <StyledPieChart width={330} height={165}>
                    <Legend
                        formatter={formatChartLegend}
                        iconType="circle"
                        layout="vertical"
                        align="left"
                        verticalAlign="top"
                        height={40}
                        payload={pieLegendData}
                        wrapperStyle={{ top: 57, left: 20 }}
                    />
                    <Pie
                        isAnimationActive={false}
                        blendStroke={true}
                        data={pieData}
                        dataKey={'value'}
                        innerRadius={35}
                        outerRadius={55}
                        cx="50%"
                        cy="50%"
                    >
                        {pieData.map((slice, index) => (
                            <Cell key={index} fill={slice.color} />
                        ))}
                    </Pie>
                    <Pie
                        isAnimationActive={false}
                        blendStroke={true}
                        data={pie2Data}
                        dataKey={'value'}
                        innerRadius={65}
                        outerRadius={75}
                        cx="50%"
                        cy="50%"
                    >
                        {pie2Data.map((slice, index) => (
                            <Cell key={index} fill={slice.color} />
                        ))}
                    </Pie>
                </StyledPieChart>
            </DoubleSideInfoSection>
        </WidgetWrapper>
    );
};

export default ThalesTokenInfo;
