import useLPStakingQuery from 'queries/token/useLPStakingQuery';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import Unstake from './Unstake';

const StakeSection: React.FC = () => {
    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';

    const lpStakingQuery = useLPStakingQuery(walletAddress, networkId, {
        enabled: isAppReady,
    });

    const staked = lpStakingQuery.isSuccess && lpStakingQuery.data ? Number(lpStakingQuery.data.staked) : 0;

    return <Unstake staked={staked} />;
};

export default StakeSection;
