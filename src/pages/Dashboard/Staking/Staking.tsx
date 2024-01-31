import SPAAnchor from 'components/SPAAnchor';
import ROUTES from 'constants/routes';
import { StakersFilterEnum } from 'enums/governance';
import useTokenInfoQuery from 'queries/dashboard/useTokenInfoQuery';
import useGlobalStakingDataQuery from 'queries/token/useGlobalStakingDataQuery';
import useThalesStakersQuery from 'queries/useThalesStakersQuery';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { RootState } from 'redux/rootReducer';
import { FlexDiv } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { Staker } from 'types/governance';
import { GlobalStakingData, TokenInfo } from 'types/token';
import { buildHref } from 'utils/routes';
import {
    FlexDivAlignStartSpaceBetween,
    FlexDivFullWidthSpaceBetween,
    InfoSection,
    InfoStats,
    InfoText,
    StakingInfo,
    TitleLabel,
    WidgetHeader,
    WidgetIcon,
    WidgetWrapper,
} from '../styled-components';

const Staking: React.FC = () => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));

    const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>();
    const [globalStakingData, setGlobalStakingData] = useState<GlobalStakingData | undefined>();

    const globalStakingDataQuery = useGlobalStakingDataQuery({
        enabled: isAppReady,
    });

    const stakersQuery = useThalesStakersQuery(StakersFilterEnum.All, {
        enabled: isAppReady,
    });

    const stakers: Staker[] = useMemo(() => (stakersQuery.isSuccess && stakersQuery.data ? stakersQuery.data : []), [
        stakersQuery.isSuccess,
        stakersQuery.data,
    ]);

    const tokenInfoQuery = useTokenInfoQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (globalStakingDataQuery.isSuccess && globalStakingDataQuery.data) {
            setGlobalStakingData(globalStakingDataQuery.data);
        }
    }, [globalStakingDataQuery.isSuccess, globalStakingDataQuery.data]);

    useEffect(() => {
        if (tokenInfoQuery.isSuccess && tokenInfoQuery.data) {
            setTokenInfo(tokenInfoQuery.data);
        }
    }, [tokenInfoQuery.isSuccess, tokenInfoQuery.data]);

    const stakedOfCirculatingSupplyPercentage =
        globalStakingData && tokenInfo
            ? (globalStakingData?.totalStakedAmount / tokenInfo?.circulatingSupply) * 100
            : 0;

    console.log(globalStakingData);
    return (
        <SPAAnchor href={buildHref(ROUTES.Staking)}>
            <WidgetWrapper>
                <WidgetHeader isTwoSided={true}>
                    <FlexDiv>
                        <WidgetIcon className="icon icon--staking" />
                        <TitleLabel>{t('dashboard.staking.title')}</TitleLabel>
                    </FlexDiv>
                    <FlexDivAlignStartSpaceBetween>
                        <TitleLabel>{t('dashboard.staking.total-apy')}</TitleLabel>
                        <TitleLabel isHighlighted={true}>
                            {globalStakingData
                                ? `${(globalStakingData.thalesApy + globalStakingData.feeApy).toFixed(2)} %`
                                : '-'}
                        </TitleLabel>
                    </FlexDivAlignStartSpaceBetween>
                </WidgetHeader>
                <StakingInfo>
                    <InfoSection side="left" justifyContent="start">
                        <FlexDivFullWidthSpaceBetween>
                            <InfoText>{t('dashboard.staking.thales-token-rewards')}</InfoText>
                            <InfoStats>{globalStakingData ? `${globalStakingData.thalesApy} % APY` : '-'}</InfoStats>
                        </FlexDivFullWidthSpaceBetween>
                        <FlexDivFullWidthSpaceBetween>
                            <InfoText>{t('dashboard.staking.stablecoin-rewards')}</InfoText>
                            <InfoStats>{globalStakingData ? `${globalStakingData.feeApy} % APY` : '-'}</InfoStats>
                        </FlexDivFullWidthSpaceBetween>
                        <FlexDivFullWidthSpaceBetween>
                            <InfoText>{t('dashboard.staking.total-stakers')}</InfoText>
                            <InfoStats>{stakers.length}</InfoStats>
                        </FlexDivFullWidthSpaceBetween>
                    </InfoSection>
                    <InfoSection side="right" justifyContent="start">
                        <FlexDivFullWidthSpaceBetween>
                            <InfoText>{t('dashboard.staking.total-thales-staked')}</InfoText>
                            <InfoStats>
                                {globalStakingData ? formatCurrency(globalStakingData.totalStakedAmount) : '-'}
                            </InfoStats>
                        </FlexDivFullWidthSpaceBetween>
                        <FlexDivFullWidthSpaceBetween>
                            <InfoText>{t('dashboard.staking.of-circulating-supply')}</InfoText>
                            <InfoStats>{stakedOfCirculatingSupplyPercentage.toFixed(2)} %</InfoStats>
                        </FlexDivFullWidthSpaceBetween>
                    </InfoSection>
                </StakingInfo>
            </WidgetWrapper>
        </SPAAnchor>
    );
};

export default Staking;
