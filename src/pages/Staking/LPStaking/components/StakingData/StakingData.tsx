import { Icon } from '@material-ui/core';
import { USD_SIGN } from 'constants/currency';
import { SectionHeader } from 'pages/Staking/styled-components';
import useGelatoQuery from 'queries/token/useGelatoQuery';
import useLPStakingQuery from 'queries/token/useLPStakingQuery';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { formatCurrencyWithPrecision, formatCurrencyWithSign } from 'thales-utils';

const StakingData: React.FC = () => {
    const { t } = useTranslation();
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));

    const lpStakingQuery = useLPStakingQuery(walletAddress, networkId, {
        enabled: isAppReady,
    });
    const gelatoQuery = useGelatoQuery({ enabled: isAppReady });

    const gelatoData = gelatoQuery.isSuccess ? gelatoQuery.data : undefined;
    const staked = lpStakingQuery.isSuccess && lpStakingQuery.data ? Number(lpStakingQuery.data.staked) : 0;

    const stakedInUSD = staked * (gelatoData?.priceInUSD ?? 0);
    const totalInUSD = gelatoData?.totalInUSD ?? 0;

    const myStakedShare = useMemo(() => (totalInUSD === 0 ? 0 : (100 * stakedInUSD) / totalInUSD), [
        stakedInUSD,
        totalInUSD,
    ]);

    const isLoading = gelatoQuery.isLoading || lpStakingQuery.isLoading;

    // Values
    const totalAPR = isLoading ? '-' : gelatoData?.totalApr;
    const thalesOPAPR = isLoading ? '-' : `${gelatoData?.apr} + ${gelatoData?.secondApr}`;
    const myStakedShareValue = isLoading ? '-' : `${formatCurrencyWithPrecision(myStakedShare)}%`;
    const tvl = isLoading ? '-' : formatCurrencyWithSign(USD_SIGN, totalInUSD);

    return (
        <StakingDataContainer>
            <Header>
                <Icon className={'icon icon--staking'} />
                {t('staking.lp-staking.staking-data')}
            </Header>
            <StakingDetails>
                <ItemName>{t('staking.lp-staking.staking-data-section.apr-in-total')}</ItemName>
                <ItemValue>{totalAPR}</ItemValue>
            </StakingDetails>
            <StakingDetails>
                <ItemName>{t('staking.lp-staking.staking-data-section.thales-op')}</ItemName>
                <ItemValue>{thalesOPAPR}</ItemValue>
            </StakingDetails>
            <StakingDetails>
                <ItemName>{t('staking.lp-staking.staking-data-section.my-staking-share')}</ItemName>
                <ItemValue>{myStakedShareValue}</ItemValue>
            </StakingDetails>
            <StakingDetails>
                <ItemName>{t('staking.lp-staking.staking-data-section.tvl')}</ItemName>
                <ItemValue>{tvl}</ItemValue>
            </StakingDetails>
        </StakingDataContainer>
    );
};

const Header = styled(SectionHeader)`
    margin-bottom: 15px;
    flex-direction: row;
    padding: 0;
`;

const StakingDataContainer = styled(FlexDiv)`
    flex-direction: column;
    margin-right: 5px;
`;

const StakingDetails = styled(FlexDiv)`
    font-size: 13px;
    width: 100%;
    text-transform: capitalize;
    line-height: 20.15px;
    > div:first-child {
        flex: 1;
        align-items: center;
        justify-content: flex-start;
        color: ${(props) => props.theme.textColor.tertiary};
        text-transform: capitalize;
    }
    > div:nth-child(2) {
        flex: 1;
        align-items: center;
        justify-content: flex-end;
        color: ${(props) => props.theme.textColor.primary};
        font-weight: 800;
    }
`;

const ItemName = styled(FlexDiv)``;
const ItemValue = styled(FlexDiv)``;

export default StakingData;
