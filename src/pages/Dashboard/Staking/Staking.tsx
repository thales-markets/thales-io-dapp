import SPAAnchor from 'components/SPAAnchor';
import ROUTES from 'constants/routes';
import useStakersInfoQuery from 'queries/dashboard/useStakersInfoQuery';
import useStakingDataQuery from 'queries/dashboard/useStakingDataQuery';
import useTokenInfoQuery from 'queries/dashboard/useTokenInfoQuery';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Colors, FlexDiv, FlexDivColumnNative, FlexDivSpaceBetween } from 'styles/common';
import { formatCurrency } from 'thales-utils';
import { StakersInfo, StakingData, TokenInfo } from 'types/token';
import { buildHref } from 'utils/routes';
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

const Staking: React.FC = () => {
    const { t } = useTranslation();
    // TODO: ADDING state
    const isAppReady = true;
    const [stakingData, setStakingData] = useState<StakingData | undefined>(undefined);
    const [stakersInfo, setStakersInfo] = useState<StakersInfo | undefined>(undefined);
    const [tokenInfo, setTokenInfo] = useState<TokenInfo | undefined>(undefined);

    const stakingDataQuery = useStakingDataQuery({
        enabled: isAppReady,
    });

    const stakersInfoQuery = useStakersInfoQuery({
        enabled: isAppReady,
    });

    const tokenInfoQuery = useTokenInfoQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (stakersInfoQuery.isSuccess && stakersInfoQuery.data) {
            setStakersInfo(stakersInfoQuery.data);
        }
    }, [stakersInfoQuery.isSuccess, stakersInfoQuery.data]);

    useEffect(() => {
        if (stakingDataQuery.isSuccess && stakingDataQuery.data) {
            setStakingData(stakingDataQuery.data);
        }
    }, [stakingDataQuery.isSuccess, stakingDataQuery.data]);

    useEffect(() => {
        if (tokenInfoQuery.isSuccess && tokenInfoQuery.data) {
            setTokenInfo(tokenInfoQuery.data);
        }
    }, [tokenInfoQuery.isSuccess, tokenInfoQuery.data]);

    const totalStakedAmount = stakingData ? stakingData.totalStakedAmount : 0;
    const totalStakedAmountOptimism = stakingData ? stakingData.totalStakedAmountOptimism : 0;
    const totalStakedAmountArbitrum = stakingData ? stakingData.totalStakedAmountArbitrum : 0;
    const totalStakedAmountBase = stakingData ? stakingData.totalStakedAmountBase : 0;

    const stakedOfCirculatingSupplyPercentage =
        stakingData && tokenInfo ? (stakingData?.totalStakedAmount / tokenInfo?.circulatingSupply) * 100 : 0;

    const stakedOfTotalSupplyPercentage =
        stakingData && tokenInfo ? (stakingData?.totalStakedAmount / tokenInfo?.totalSupply) * 100 : 0;

    const totalStakers = stakersInfo ? stakersInfo.totalStakers : 0;

    return (
        <SPAAnchor href={buildHref(ROUTES.Staking)}>
            <WidgetWrapper>
                <WidgetHeader isTwoSided={true}>
                    <FlexDiv>
                        <WidgetIcon className="icon icon--staking" />
                        <TitleLabel>{t('dashboard.staking.title')}</TitleLabel>
                    </FlexDiv>
                    <FlexDivSpaceBetween>
                        <TitleLabel>{t('dashboard.staking.total-stakers')}</TitleLabel>
                        <TitleLabel isHighlighted={true}>{totalStakers}</TitleLabel>
                    </FlexDivSpaceBetween>
                </WidgetHeader>
                <InfoSection side="left">
                    <FlexDivFullWidthSpaceBetween>
                        <InfoText>{t('dashboard.staking.total-thales-staked')}</InfoText>
                        <InfoStats>{formatCurrency(totalStakedAmount)}</InfoStats>
                    </FlexDivFullWidthSpaceBetween>
                    <FlexDivFullWidthSpaceBetween>
                        <InfoText>{t('dashboard.staking.of-circulating-supply')}</InfoText>
                        <InfoStats>{stakedOfCirculatingSupplyPercentage.toFixed(2)}%</InfoStats>
                    </FlexDivFullWidthSpaceBetween>
                    <FlexDivFullWidthSpaceBetween>
                        <InfoText>{t('dashboard.staking.of-total-supply')}</InfoText>
                        <InfoStats>{stakedOfTotalSupplyPercentage.toFixed(2)}%</InfoStats>
                    </FlexDivFullWidthSpaceBetween>
                </InfoSection>
                <InfoSection side="right" direction="row" justifyContent="space-between">
                    <FlexDivColumnNative>
                        <InfoText>{t('dashboard.staking.staked-on-optimism')}</InfoText>
                        <InfoText>{t('dashboard.staking.staked-on-arbitrum')}</InfoText>
                        <InfoText>{t('dashboard.staking.staked-on-base')}</InfoText>
                    </FlexDivColumnNative>
                    <FlexDivColumnNative>
                        <InfoStats>{formatCurrency(totalStakedAmountOptimism)}</InfoStats>
                        <InfoStats>{formatCurrency(totalStakedAmountArbitrum)}</InfoStats>
                        <InfoStats>{formatCurrency(totalStakedAmountBase)}</InfoStats>
                    </FlexDivColumnNative>
                    <FlexDivColumnNative>
                        <InfoStats color={Colors.CYAN}>APY {stakingData?.apyOptimism.toFixed(2)} %</InfoStats>
                        <InfoStats color={Colors.CYAN}>APY {stakingData?.apyArbitrum.toFixed(2)} %</InfoStats>
                        <InfoStats color={Colors.CYAN}>APY {stakingData?.apyBase.toFixed(2)} %</InfoStats>
                    </FlexDivColumnNative>
                </InfoSection>
            </WidgetWrapper>
        </SPAAnchor>
    );
};

export default Staking;
