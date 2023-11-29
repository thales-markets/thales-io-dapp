import useTokenInfoQuery from 'queries/dashboard/useTokenInfoQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Area, Tooltip, XAxis } from 'recharts';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { Colors } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { TokenInfo } from 'types/token';
import {
    ChartTooltipBox,
    FlexDivFullWidthSpaceBetween,
    InfoSection,
    InfoStats,
    InfoText,
    StyledAreaChart,
    TitleLabel,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

const TokenBurn: React.FC = () => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));

    const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>(undefined);

    const tokenInfoQuery = useTokenInfoQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (tokenInfoQuery.isSuccess && tokenInfoQuery.data) {
            setTokenInfo(tokenInfoQuery.data);
        }
    }, [tokenInfoQuery.isSuccess, tokenInfoQuery.data]);

    const data = [
        { value: 4, date: 11 },
        { value: 17, date: 17 },
        { value: 22, date: 37 },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length && label) {
            return (
                <ChartTooltipBox>
                    <InfoText color={Colors.WHITE}>{payload[0].payload.date}</InfoText>
                    <InfoStats>{payload[0].payload.value}</InfoStats>
                </ChartTooltipBox>
            );
        }

        return null;
    };

    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--burn" />
                <TitleLabel>{t('dashboard.token-burn.title')}</TitleLabel>
            </WidgetHeader>
            <InfoSection side="left">
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.token-burn.total-thales-burned')}</InfoText>
                    <InfoStats>{tokenInfo ? `${formatCurrency(tokenInfo.thalesBurned)} THALES` : 'N/A'}</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.token-burn.of-circulating-supply')}</InfoText>
                    <InfoStats>
                        {tokenInfo
                            ? `${formatCurrency((tokenInfo.thalesBurned / tokenInfo.circulatingSupply) * 100)}%`
                            : 'N/A'}
                    </InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.token-burn.of-total-supply')}</InfoText>
                    <InfoStats>
                        {tokenInfo
                            ? `${formatCurrency((tokenInfo.thalesBurned / tokenInfo.totalSupply) * 100)}%`
                            : 'N/A'}
                    </InfoStats>
                </FlexDivFullWidthSpaceBetween>
            </InfoSection>
            <StyledAreaChart width={320} height={160} data={data}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={Colors.CYAN} opacity={0.8} />
                        <stop offset="95%" stopColor={Colors.CYAN} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis axisLine={false} tickLine={false} dataKey="date" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="step" dataKey="value" stroke={Colors.CYAN} fillOpacity={0.8} fill="url(#colorUv)" />
            </StyledAreaChart>
        </WidgetWrapper>
    );
};

export default TokenBurn;
