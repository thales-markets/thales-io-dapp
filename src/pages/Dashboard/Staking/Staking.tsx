import { Colors, FlexDiv, FlexDivColumnNative, FlexDivSpaceBetween } from 'styles/common';
import {
    InfoSection,
    InfoStats,
    InfoText,
    FlexDivFullWidthSpaceBetween,
    WidgetHeader,
    WidgetIcon,
    TitleLabel,
    WidgetWrapper,
} from '../styled-components';
import { useTranslation } from 'react-i18next';
import useStakingDataQuery from 'queries/dashboard/useStakingDataQuery';
import { useState, useEffect } from 'react';
import { StakingData } from 'types/token';
import { formatCurrency } from 'thales-utils';

const Staking: React.FC = () => {
    const { t } = useTranslation();
    // TODO: ADDING NETWORK CONFIG
    const isAppReady = true;
    // const networkId = 10;
    const [stakingData, setStakingData] = useState<StakingData | undefined>(undefined);

    const stakingDataQuery = useStakingDataQuery({
        enabled: isAppReady,
    });

    useEffect(() => {
        if (stakingDataQuery.isSuccess && stakingDataQuery.data) {
            setStakingData(stakingDataQuery.data);
        }
    }, [stakingDataQuery.isSuccess, stakingDataQuery.data]);

    const totalStakedAmount = stakingData ? stakingData.totalStakedAmount : 0;
    const totalStakedAmountOptimism = stakingData ? stakingData.totalStakedAmountOptimism : 0;
    const totalStakedAmountArbitrum = stakingData ? stakingData.totalStakedAmountArbitrum : 0;
    const totalStakedAmountBase = stakingData ? stakingData.totalStakedAmountBase : 0;

    return (
        <WidgetWrapper>
            <WidgetHeader isTwoSided={true}>
                <FlexDiv>
                    <WidgetIcon className="icon icon--staking" />
                    <TitleLabel>{t('dashboard.staking.title')}</TitleLabel>
                </FlexDiv>
                <FlexDivSpaceBetween>
                    <TitleLabel>{t('dashboard.staking.total-stakers')}</TitleLabel>
                    <TitleLabel isHighlighted={true}>21,432</TitleLabel>
                </FlexDivSpaceBetween>
            </WidgetHeader>
            <InfoSection side="left">
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.staking.total-thales-staked')}</InfoText>
                    <InfoStats>{formatCurrency(totalStakedAmount)}</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.staking.of-circulating-supply')}</InfoText>
                    <InfoStats>10%</InfoStats>
                </FlexDivFullWidthSpaceBetween>
                <FlexDivFullWidthSpaceBetween>
                    <InfoText>{t('dashboard.staking.of-total-supply')}</InfoText>
                    <InfoStats>5%</InfoStats>
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
    );
};

export default Staking;
