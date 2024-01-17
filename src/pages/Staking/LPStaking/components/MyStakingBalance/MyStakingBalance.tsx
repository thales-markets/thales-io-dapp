import { Icon } from '@material-ui/core';
import { LP_TOKEN, USD_SIGN } from 'constants/currency';
import { t } from 'i18next';
import { SectionHeader } from 'pages/Staking/styled-components';
import useGelatoQuery from 'queries/token/useGelatoQuery';
import useLPStakingQuery from 'queries/token/useLPStakingQuery';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { formatCurrencyWithKey, formatCurrencyWithSign } from 'thales-utils';

const MyStakingBalance: React.FC = () => {
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
        <MyStakingBalanceContainer>
            <Header>
                <Icon className={'icon icon--person'} />
                {t('staking.lp-staking.my-lp-staking')}
            </Header>
            <Balance>
                {formatCurrencyWithKey(LP_TOKEN, staked) + ` (${formatCurrencyWithSign(USD_SIGN, stakedInUSD)})`}
            </Balance>
        </MyStakingBalanceContainer>
    );
};

const Header = styled(SectionHeader)`
    margin-bottom: 15px;
    flex-direction: row;
    padding: 0;
`;

const MyStakingBalanceContainer = styled(FlexDiv)`
    flex-direction: column;
`;

const Balance = styled.span`
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    color: ${(props) => props.theme.textColor.secondary};
`;

export default MyStakingBalance;
