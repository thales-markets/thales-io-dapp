import useTokenInfoQuery from 'queries/dashboard/useTokenInfoQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from 'thales-utils';
import { TokenInfo } from 'types/token';
import {
    FlexDivFullWidthSpaceBetween,
    InfoSection,
    InfoStats,
    InfoText,
    TitleLabel,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

const TokenBurn: React.FC = () => {
    const { t } = useTranslation();
    // TODO: ADD CHART ON THE RIGHT SIDE OF WIDGET
    const isAppReady = true;
    const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>(undefined);

    const tokenInfoQuery = useTokenInfoQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (tokenInfoQuery.isSuccess && tokenInfoQuery.data) {
            setTokenInfo(tokenInfoQuery.data);
        }
    }, [tokenInfoQuery.isSuccess, tokenInfoQuery.data]);

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
        </WidgetWrapper>
    );
};

export default TokenBurn;
