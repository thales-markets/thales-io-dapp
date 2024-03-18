import NetworkSwitch from 'components/NetworkSwitch';
import Tooltip from 'components/Tooltip';
import ROUTES from 'constants/routes';
import { ScreenSizeBreakpoint } from 'enums/ui';
import useUserStakingDataQuery from 'queries/token/useUserStakingData';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsAppReady } from 'redux/modules/app';
import { getIsWalletConnected, getNetworkId, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { navigateTo } from 'utils/routes';

const UserWallet: React.FC = () => {
    const { t } = useTranslation();

    const isAppReady = useSelector((state: RootState) => getIsAppReady(state));
    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';
    const networkId = useSelector((state: RootState) => getNetworkId(state));

    const userStakingDataQuery = useUserStakingDataQuery(walletAddress, networkId, {
        enabled: isAppReady && isWalletConnected,
    });

    return (
        <Container>
            <Wrapper>
                {userStakingDataQuery?.data?.baseRewards && !userStakingDataQuery?.data?.claimed && (
                    <Tooltip overlay={t('common.wallet.rewards')}>
                        <Rewards onClick={() => navigateTo(ROUTES.Token.Staking.Rewards)}>
                            <RewardsIcon className="icon icon--rewards" />
                        </Rewards>
                    </Tooltip>
                )}
                <NetworkSwitch isWalletConnectorSwitch={true} />
            </Wrapper>
        </Container>
    );
};

const RewardsIcon = styled.i`
    color: ${(props) => props.theme.background.primary};
    font-size: 16px;
    &:before {
        font-size: 16px;
    }
`;

const Rewards = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.textColor.secondary};
    border-radius: 30px;
    height: 22px;
    width: 22px;
    left: -33px;
    cursor: pointer;
    z-index: 2;
    box-shadow: 0 0 0 0 rgba(25, 248, 239, 1);
    animation: pulse 2s infinite;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        right: 0;
        bottom: -45px;
        left: unset;
    }
`;

const Container = styled.div<{ hidden?: boolean }>`
    visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
    display: flex;
    z-index: 4;
    height: 30px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
        justify-content: flex-end;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: 1px solid ${(props) => props.theme.borderColor.primary};
    border-radius: 8px;
    @media (max-width: 500px) {
        height: 26px;
    }
    > div > div {
        width: 150px;
        height: 30px;
    }
`;

export default UserWallet;
