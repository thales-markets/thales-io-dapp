import { Icon } from '@material-ui/core';
import { LP_TOKEN, USD_SIGN } from 'constants/currency';
import useGelatoQuery from 'queries/token/useGelatoQuery';
import useLPStakingQuery from 'queries/token/useLPStakingQuery';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { formatCurrencyWithKey, formatCurrencyWithSign } from 'thales-utils';
import { Container, SectionHeader } from '../styled-components';
import StakingData from './components/StakingData';
import Steps from './components/Steps';

const LPStaking: React.FC = () => {
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

    return (
        <Container>
            <Steps />
            <RowsContainer>
                <StakingData />
                <MyStakingBalanceContainer>
                    <Header>
                        <Icon className={'icon icon--person'} />
                        {t('staking.lp-staking.my-lp-staking')}
                    </Header>
                    <Balance>
                        {formatCurrencyWithKey(LP_TOKEN, staked) +
                            ` (${formatCurrencyWithSign(USD_SIGN, stakedInUSD)})`}
                    </Balance>
                </MyStakingBalanceContainer>
            </RowsContainer>
        </Container>
    );
};

const RowsContainer = styled(FlexDiv)`
    flex-direction: row;
    background-color: transparent !important;
    padding: 0 !important;
    justify-content: space-between;
    flex: 1;
    > div {
        flex: 1;
        position: relative;
        padding: 20px;
        background-color: ${(props) => props.theme.background.primary};
        border-radius: 8px;
    }
`;

const MyStakingBalanceContainer = styled(FlexDiv)`
    flex-direction: column;
    margin-left: 5px;
`;

const Balance = styled.span`
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${(props) => props.theme.textColor.secondary};
`;

const Header = styled(SectionHeader)`
    margin-bottom: 15px;
    flex-direction: row;
    padding: 0;
`;

export default LPStaking;
