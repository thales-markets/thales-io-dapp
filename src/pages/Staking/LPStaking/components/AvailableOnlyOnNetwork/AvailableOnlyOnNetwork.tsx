import { Network } from 'enums/network';
import { ScreenSizeBreakpoint } from 'enums/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { switchToNetworkId } from 'redux/modules/wallet';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { SupportedNetwork } from 'types/network';
import { SUPPORTED_NETWORK_IDS_MAP } from 'utils/network';
import { useSwitchNetwork } from 'wagmi';

const AvailableOnlyOnNetwork: React.FC = () => {
    const { t } = useTranslation();
    const { switchNetwork } = useSwitchNetwork();
    const dispatch = useDispatch();

    const handleSwitch = async () => {
        await SUPPORTED_NETWORK_IDS_MAP[Network.OptimismMainnet].changeNetwork(Network.OptimismMainnet, () => {
            switchNetwork?.(Network.OptimismMainnet);
            // Trigger App.js init
            // do not use updateNetworkSettings(networkId) as it will trigger queries before provider in App.js is initialized
            dispatch(
                switchToNetworkId({
                    networkId: Number(Network.OptimismMainnet) as SupportedNetwork,
                })
            );
        });
    };

    return (
        <Wrapper>
            <Content>
                <Label>{t('staking.lp-staking.label-supported-network')}</Label>
                <Icon className="icon icon--double-staking" />
            </Content>
            <Button onClick={() => handleSwitch()}>{t('staking.lp-staking.switch-to-op')}</Button>
        </Wrapper>
    );
};

const Wrapper = styled(FlexDiv)`
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled(FlexDiv)`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Label = styled.span`
    width: 60%;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    color: ${(props) => props.theme.warning.textColor.quaternary};
    text-transform: uppercase;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 15px;
    }
`;

const Icon = styled.i`
    margin-right: 15px;
    font-size: 120px;
    color: ${(props) => props.theme.textColor.primary};
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 80px;
    }
`;

const Button = styled.button<{ padding?: string; disabled?: boolean }>`
    cursor: pointer;
    color: ${(props) => props.theme.background.primary};
    padding: ${(props) => props.padding || '5px 15px'};
    border-radius: 8px;
    border: 0;
    background: ${(props) => props.theme.textColor.secondary};
    text-align: center;
    font-size: 13px;
    text-transform: uppercase;
    width: 190px;
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export default AvailableOnlyOnNetwork;
