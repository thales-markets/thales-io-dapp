import useTokenInfoQuery from 'queries/useTokenInfoQuery';
import { useEffect, useState } from 'react';
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

    console.log(tokenInfo);

    return (
        <WidgetWrapper>
            <WidgetHeader>
                <WidgetIcon className="icon icon--burn" />
                <TitleLabel>Thales Token burn</TitleLabel>
            </WidgetHeader>
            <InfoSection side="left">
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>Total Thales burned</InfoText>
                    <InfoStats>24,523,564.76 Thales</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>% of circulating supply</InfoText>
                    <InfoStats>10%</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>% of total supply</InfoText>
                    <InfoStats>5%</InfoStats>
                </FlexDivFullWidthSpaceBetween>
            </InfoSection>
        </WidgetWrapper>
    );
};

export default TokenBurn;
