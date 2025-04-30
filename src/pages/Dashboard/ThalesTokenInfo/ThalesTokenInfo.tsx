import LoadingContainer from 'components/LoadingContainer';
import useOverTokenInfoQuery from 'queries/dashboard/useOverTokenInfoQuery';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Cell, Label, Legend, Pie } from 'recharts';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { Colors } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { OverTokenInfo } from 'types/token';
import {
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
    const [overTokenInfo, setOverTokenInfo] = useState<OverTokenInfo | undefined>(undefined);

    const overTokenInfoQuery = useOverTokenInfoQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (overTokenInfoQuery.isSuccess && overTokenInfoQuery.data) {
            setOverTokenInfo(overTokenInfoQuery.data);
        }
    }, [overTokenInfoQuery.isSuccess, overTokenInfoQuery.data]);

    const pieData = useMemo(() => {
        const data1 = [];
        if (overTokenInfo) {
            const circulatingPiece = {
                name: 'Circulating',
                value: overTokenInfo?.circulatingSupply,
                color: Colors.CYAN,
            };
            const burnedPiece = { name: 'Burned', value: overTokenInfo?.burned, color: Colors.RED };
            data1.push(circulatingPiece, burnedPiece);
        }

        return data1;
    }, [overTokenInfo]);

    const pieLegendData = useMemo(() => {
        const data1 = [];
        if (overTokenInfo) {
            const circulatingPiece = {
                id: '1',
                value: 'Circulating',
                stat: overTokenInfo?.circulatingSupply,
                percentage: (overTokenInfo?.circulatingSupply / overTokenInfo.totalSupply) * 100,
                color: Colors.CYAN,
            };
            const burnedPiece = {
                id: '2',
                value: 'Burned',
                stat: overTokenInfo?.burned,
                percentage: (overTokenInfo?.burned / overTokenInfo.totalSupply) * 100,
                color: Colors.RED,
            };
            data1.push(circulatingPiece, burnedPiece);
        }

        return data1;
    }, [overTokenInfo]);

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
        <LoadingContainer isLoading={overTokenInfoQuery.isLoading || overTokenInfoQuery.isLoading}>
            <WidgetWrapper isDoubleHeight={true}>
                <WidgetHeader>
                    <WidgetIcon className="overtime-icon overtime-icon--overtime-logo" />
                    <TitleLabel>{t('dashboard.token-info.title')}</TitleLabel>
                </WidgetHeader>
                <UpperInfoSection>
                    <FlexDivFullWidthSpaceBetween>
                        <InfoText>{t('dashboard.token-info.total-supply')}</InfoText>
                        <InfoStats>
                            {' '}
                            {overTokenInfo ? `${formatCurrency(overTokenInfo.totalSupply)} $OVER` : 'N/A'}
                        </InfoStats>
                    </FlexDivFullWidthSpaceBetween>
                    <FlexDivFullWidthSpaceBetween>
                        <InfoText>{t('dashboard.token-info.circulating-supply')}</InfoText>
                        <InfoStats>
                            {overTokenInfo ? `${formatCurrency(overTokenInfo.circulatingSupply)} $OVER` : 'N/A'}
                        </InfoStats>
                    </FlexDivFullWidthSpaceBetween>
                    <FlexDivFullWidthSpaceBetween>
                        <InfoText>{t('dashboard.token-info.burned-supply')}</InfoText>
                        <InfoStats>{overTokenInfo ? `${formatCurrency(overTokenInfo.burned)} $OVER` : 'N/A'}</InfoStats>
                    </FlexDivFullWidthSpaceBetween>
                    <FlexDivFullWidthSpaceBetween>
                        <InfoText>{t('dashboard.token-burn.of-total-supply')}</InfoText>
                        <InfoStats>
                            {overTokenInfo
                                ? `${formatCurrency((overTokenInfo.burned / overTokenInfo.totalSupply) * 100)}%`
                                : 'N/A'}
                        </InfoStats>
                    </FlexDivFullWidthSpaceBetween>
                </UpperInfoSection>
                <DoubleSideInfoSection>
                    <StyledPieChart width={380} height={185}>
                        <Legend
                            formatter={formatChartLegend}
                            iconType="circle"
                            layout="vertical"
                            align="left"
                            verticalAlign="top"
                            height={80}
                            payload={pieLegendData}
                            wrapperStyle={{ top: 70, left: 20 }}
                        />
                        <Pie
                            isAnimationActive={false}
                            blendStroke={true}
                            data={pieData}
                            dataKey={'value'}
                            innerRadius={55}
                            outerRadius={85}
                            cx="50%"
                            cy="50%"
                        >
                            {pieData.map((slice, index) => (
                                <Cell style={{ outline: 'none' }} key={index} fill={slice.color} />
                            ))}
                            <Label
                                className="chartLabelSmall"
                                value={t('dashboard.token-info.total-69m')}
                                position="center"
                            />
                        </Pie>
                    </StyledPieChart>
                </DoubleSideInfoSection>
            </WidgetWrapper>
        </LoadingContainer>
    );
};

export default ThalesTokenInfo;
