import { useTranslation } from 'react-i18next';
import {
    InfoStats,
    InfoText,
    FlexDivFullWidthSpaceBetween,
    UpperInfoSection,
    WidgetHeader,
    WidgetIcon,
    TitleLabel,
    WidgetWrapper,
} from '../styled-components';
import useTokenInfoQuery from 'queries/useTokenInfoQuery';
import { useState, useEffect } from 'react';
import { TokenInfo } from 'types/token';
import { formatCurrency } from 'thales-utils';

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
        </WidgetWrapper>
    );
};

export default ThalesTokenInfo;
