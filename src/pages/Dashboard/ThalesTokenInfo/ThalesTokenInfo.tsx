import useTokenInfoQuery from 'queries/useTokenInfoQuery';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Legend, Pie } from 'recharts';
import { Colors } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { TokenInfo } from 'types/token';
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
    // TODO: ADDING NETWORK CONFIG
    const isAppReady = true;
    const networkId = 10;
    const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>(undefined);

    const tokenInfoQuery = useTokenInfoQuery(networkId, {
        enabled: isAppReady,
    });

    useEffect(() => {
        if (tokenInfoQuery.isSuccess && tokenInfoQuery.data) {
            setTokenInfo(tokenInfoQuery.data);
        }
    }, [tokenInfoQuery.isSuccess, tokenInfoQuery.data]);

    const pieData = useMemo(() => {
        const data1 = [];
        // const data2 = []
        if (tokenInfo) {
            const burnedPiece = { name: 'Burned', value: tokenInfo?.thalesBurned, color: Colors.CHINA_PINK };
            const circulatingPiece = { name: 'Circulating', value: tokenInfo?.circulatingSupply, color: Colors.VIOLET };
            const leftOverPiece = {
                name: 'Rest',
                value: tokenInfo.totalSupply - tokenInfo?.thalesBurned - tokenInfo?.circulatingSupply,
                color: Colors.CYAN,
            };
            // const staking = {name: 'staking', value: tokenInfo?, color: Colors.VIOLET}
            // const leftOverPiece = {name: '', value: 100000000 - tokenInfo?.thalesBurned - tokenInfo?.circulatingSupply, color: Colors.CHINA_PINK}

            data1.push(burnedPiece, circulatingPiece, leftOverPiece);
            // data2.push()
        }

        return data1;
    }, [tokenInfo]);

    const pieLegendData = useMemo(() => {
        const data1 = [];
        // const data2 = []
        if (tokenInfo) {
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
                stat: tokenInfo.totalSupply - tokenInfo?.thalesBurned - tokenInfo?.circulatingSupply,
                percentage:
                    ((tokenInfo.totalSupply - tokenInfo?.thalesBurned - tokenInfo?.circulatingSupply) /
                        tokenInfo.totalSupply) *
                    100,
                color: Colors.BLUEBERRY,
            };
            data1.push(burnedPiece, circulatingPiece, leftOverPiece);
        }

        return data1;
    }, [tokenInfo]);

    const formatChartLegend = (value: string, entry: any) => {
        console.log(entry);
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

    console.log(tokenInfo);
    console.log(pieData);
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
                        // content={renderChartLegend}
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
                        data={[
                            { name: 'Staking', value: 70, color: Colors.BLUEBERRY },
                            { name: 'Rest', value: 25, color: Colors.WHITE },
                        ]}
                        dataKey={'value'}
                        innerRadius={65}
                        outerRadius={75}
                        cx="50%"
                        cy="50%"
                    >
                        {[
                            { name: 'Staking', value: 25, color: Colors.BLUEBERRY },
                            { name: 'Rest', value: 25, color: 'transparent' },
                        ].map((slice, index) => (
                            <Cell key={index} fill={slice.color} />
                        ))}
                    </Pie>
                </StyledPieChart>
            </DoubleSideInfoSection>
        </WidgetWrapper>
    );
};

export default ThalesTokenInfo;
