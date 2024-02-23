import LoadingContainer from 'components/LoadingContainer';
import Tooltip from 'components/Tooltip';
import { LP_TOKEN, USD_SIGN } from 'constants/currency';
import { TooltipContainer } from 'pages/Staking/styled-components';
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
import { formatCurrencyWithKey, formatCurrencyWithPrecision, formatCurrencyWithSign } from 'thales-utils';
import { Header, Icon } from '../../styled-components';
import ClaimSection from '../ClaimSection';

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
        <Wrapper>
            <LoadingContainer isLoading={isLoading}>
                <StakingDataContainer>
                    <Header>
                        <Icon className={'icon icon--staking'} />
                        {t('staking.lp-staking.staking-data')}
                    </Header>
                    <StakingDetails>
                        <ItemName>
                            <TooltipContainer>
                                {t('staking.lp-staking.staking-data-section.apr-in-total')}
                                <Tooltip
                                    overlay={t('staking.lp-staking.staking-data-section.apr-tooltip')}
                                    marginTop={2}
                                    mobileIconFontSize={11}
                                    iconFontSize={13}
                                />
                            </TooltipContainer>
                        </ItemName>
                        <ItemValue>{totalAPR}</ItemValue>
                    </StakingDetails>
                    <StakingDetails>
                        <ItemName>
                            <TooltipContainer>
                                {t('staking.lp-staking.staking-data-section.thales-op')}
                                <Tooltip
                                    overlay={t('staking.lp-staking.staking-data-section.apr-percentage-tooltip')}
                                    marginTop={2}
                                    mobileIconFontSize={11}
                                    iconFontSize={13}
                                />
                            </TooltipContainer>
                        </ItemName>
                        <ItemValue>{thalesOPAPR}</ItemValue>
                    </StakingDetails>
                    <StakingDetails>
                        <ItemName>
                            <TooltipContainer>
                                {t('staking.lp-staking.staking-data-section.my-staking-share')}
                                <Tooltip
                                    overlay={t('staking.lp-staking.staking-data-section.share-tooltip')}
                                    marginTop={2}
                                    mobileIconFontSize={11}
                                    iconFontSize={13}
                                />
                            </TooltipContainer>
                        </ItemName>
                        <ItemValue>{myStakedShareValue}</ItemValue>
                    </StakingDetails>
                    <StakingDetails>
                        <ItemName>
                            <TooltipContainer>
                                {t('staking.lp-staking.staking-data-section.tvl')}
                                <Tooltip
                                    overlay={t('staking.lp-staking.staking-data-section.tvl-tooltip')}
                                    marginTop={2}
                                    mobileIconFontSize={11}
                                    iconFontSize={13}
                                />
                            </TooltipContainer>
                        </ItemName>
                        <ItemValue>{tvl}</ItemValue>
                    </StakingDetails>
                </StakingDataContainer>
                <ClaimSectionWrapper>
                    <MyStakingDetails>
                        <ItemName>
                            <TooltipContainer>
                                {t('staking.lp-staking.staking-data-section.my-staking-balance')}:
                                <Tooltip
                                    overlay={t('staking.lp-staking.staking-data-section.staked-balance-tooltip')}
                                    marginTop={2}
                                    mobileIconFontSize={11}
                                    iconFontSize={13}
                                />
                            </TooltipContainer>
                        </ItemName>
                        <ItemValue>
                            {formatCurrencyWithKey(LP_TOKEN, staked) +
                                ` = ${formatCurrencyWithSign(USD_SIGN, stakedInUSD)}`}
                        </ItemValue>
                    </MyStakingDetails>
                    <ClaimSection />
                </ClaimSectionWrapper>
            </LoadingContainer>
        </Wrapper>
    );
};

const Wrapper = styled(FlexDiv)`
    flex-direction: row;
    gap: 30px;
`;

const ClaimSectionWrapper = styled(FlexDiv)`
    flex-direction: column;
    flex: 1;
`;

const StakingDataContainer = styled(FlexDiv)`
    flex-direction: column;
    flex: 1;
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

const MyStakingDetails = styled(FlexDiv)`
    font-size: 13px;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    line-height: 20.15px;
    margin-bottom: 30px;
    > div:first-child {
        align-items: center;
        color: ${(props) => props.theme.textColor.tertiary};
        text-transform: capitalize;
        padding-right: 5px;
    }
    > div:nth-child(2) {
        align-items: center;
        color: ${(props) => props.theme.textColor.primary};
        font-weight: 800;
    }
`;

const ItemName = styled(FlexDiv)``;
const ItemValue = styled(FlexDiv)``;

export default StakingData;
