import SwitchInput from 'components/SwitchInput';
import useLPStakingQuery from 'queries/token/useLPStakingQuery';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
// import { getIsMobile } from 'redux/modules/ui';
import { getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import { useTheme } from 'styled-components';
import Stake from './Stake';
import Unstake from './Unstake';

const StakeSection: React.FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';

    const [stakeSelected, setStakeSelected] = useState<boolean>(true);

    const lpStakingQuery = useLPStakingQuery(walletAddress, networkId, {
        enabled: isAppReady,
    });

    const staked = lpStakingQuery.isSuccess && lpStakingQuery.data ? Number(lpStakingQuery.data.staked) : 0;
    const paused = lpStakingQuery.isSuccess && lpStakingQuery.data ? lpStakingQuery.data.paused : false;

    return (
        <>
            <SwitchInput
                label={{
                    firstLabel: t('staking.staking.stake-unstake.stake'),
                    secondLabel: t('staking.staking.stake-unstake.unstake'),
                    fontSize: '18px',
                }}
                borderColor={theme.borderColor.secondary}
                dotBackground={theme.textColor.secondary}
                dotSize="20px"
                active={!stakeSelected}
                handleClick={() => setStakeSelected(!stakeSelected)}
            />
            {stakeSelected ? <Stake isStakingPaused={paused} /> : <Unstake staked={staked} />}
        </>
    );
};

export default StakeSection;
