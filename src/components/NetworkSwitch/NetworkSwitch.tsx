import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { DEFAULT_NETWORK } from 'constants/network';
import { Network } from 'enums/network';
import { t } from 'i18next';
import React, { useMemo, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getIsMobile } from 'redux/modules/ui';
import { getIsWalletConnected, getNetworkId, getWalletAddress, switchToNetworkId } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { truncateAddress } from 'thales-utils';
import { isLedgerDappBrowserProvider } from 'utils/ledger';
import { SUPPORTED_NETWORK_IDS_MAP } from 'utils/network';
import { useSwitchNetwork } from 'wagmi';

type NetworkSwitchProps = {
    selectedNetworkId?: number;
    setSelectedNetworkId?: any;
    supportedNetworks?: number[];
    forceNetworkSwitch?: boolean;
    xl?: boolean;
    isWalletConnectorSwitch?: boolean;
};

const TRUNCATE_ADDRESS_NUMBER_OF_CHARS = 5;

const NetworkSwitch: React.FC<NetworkSwitchProps> = ({
    selectedNetworkId,
    setSelectedNetworkId,
    supportedNetworks,
    forceNetworkSwitch,
    xl,
    isWalletConnectorSwitch,
}) => {
    const { switchNetwork } = useSwitchNetwork();
    const dispatch = useDispatch();

    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const isMobile = useSelector((state: RootState) => getIsMobile(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';

    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();

    const filteredSupportedNetworks: Record<number, any> = useMemo(
        () =>
            supportedNetworks
                ? Object.keys(SUPPORTED_NETWORK_IDS_MAP)
                      .filter((key) => supportedNetworks.includes(Number(key)))
                      .reduce((obj, key) => {
                          return Object.assign(obj, {
                              [key]: SUPPORTED_NETWORK_IDS_MAP[Number(key)],
                          });
                      }, {})
                : SUPPORTED_NETWORK_IDS_MAP,
        [supportedNetworks]
    );

    // TODO: add support for testnets
    const selectedNetwork = useMemo(
        () =>
            filteredSupportedNetworks[selectedNetworkId || networkId] ||
            filteredSupportedNetworks[DEFAULT_NETWORK.networkId],
        [networkId, selectedNetworkId, filteredSupportedNetworks]
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const isLedgerLive = isLedgerDappBrowserProvider();

    // currently not supported network synchronization between browser without integrated wallet and wallet app on mobile
    const hideNetworkSwitcher = !isMobile && !isWalletConnected && !forceNetworkSwitch;

    return (
        <OutsideClickHandler display="contents" onOutsideClick={() => isDropdownOpen && setIsDropdownOpen(false)}>
            <NetworkInfoContainer>
                <SelectedNetworkContainer cursor={isLedgerLive ? 'initial' : 'pointer'}>
                    <NetworkItem
                        onClick={() => !isWalletConnectorSwitch && setIsDropdownOpen(!isDropdownOpen)}
                        xl={xl}
                        selectedItem={true}
                        noHover
                    >
                        {!isWalletConnectorSwitch && (
                            <NetworkIconWrapper
                                onClick={() => setIsDropdownOpen(!isDropdownOpen && !isLedgerLive)}
                                isWalletConnectorSwitch={false}
                            >
                                {React.createElement(selectedNetwork.icon, {})}
                            </NetworkIconWrapper>
                        )}
                        {!isWalletConnected && <WalletIcon className="icon icon--wallet" />}
                        <WalletAddress
                            onClick={() =>
                                isWalletConnectorSwitch
                                    ? isWalletConnected
                                        ? openAccountModal?.()
                                        : openConnectModal?.()
                                    : setIsDropdownOpen(!isDropdownOpen)
                            }
                        >
                            {isWalletConnectorSwitch
                                ? walletAddress
                                    ? truncateAddress(
                                          walletAddress,
                                          TRUNCATE_ADDRESS_NUMBER_OF_CHARS,
                                          TRUNCATE_ADDRESS_NUMBER_OF_CHARS
                                      )
                                    : t('common.wallet.connect-your-wallet')
                                : selectedNetwork.name}
                        </WalletAddress>
                        {isWalletConnectorSwitch && (
                            <NetworkIconWrapper
                                onClick={() => setIsDropdownOpen(!isDropdownOpen && !isLedgerLive)}
                                isWalletConnectorSwitch={true}
                            >
                                {isWalletConnected && React.createElement(selectedNetwork.icon)}
                                {!hideNetworkSwitcher && (
                                    <Icon
                                        className={isDropdownOpen ? `icon icon--caret-up` : `icon icon--caret-down`}
                                    />
                                )}
                            </NetworkIconWrapper>
                        )}
                        {!isWalletConnectorSwitch && (
                            <Icon className={isDropdownOpen ? `icon icon--caret-up` : `icon icon--caret-down`} />
                        )}
                    </NetworkItem>
                    {!hideNetworkSwitcher && isDropdownOpen && (
                        <NetworkDropDown xl={xl}>
                            {Object.keys(filteredSupportedNetworks)
                                .map((key) => {
                                    return { id: Number(key), ...filteredSupportedNetworks[Number(key)] };
                                })
                                .sort((a, b) => a.order - b.order)
                                .map((network, index) => (
                                    <NetworkItem
                                        xl={xl}
                                        key={index}
                                        onClick={async () => {
                                            setIsDropdownOpen(!isDropdownOpen);
                                            if (setSelectedNetworkId) {
                                                setSelectedNetworkId(Number(network.id));
                                            } else {
                                                await filteredSupportedNetworks[network.id].changeNetwork(
                                                    network.id,
                                                    () => {
                                                        switchNetwork?.(network.id);
                                                        // Trigger App.js init
                                                        // do not use updateNetworkSettings(networkId) as it will trigger queries before provider in App.js is initialized
                                                        dispatch(
                                                            switchToNetworkId({
                                                                networkId: Number(network.id) as Network,
                                                            })
                                                        );
                                                    }
                                                );
                                            }
                                        }}
                                    >
                                        {React.createElement(filteredSupportedNetworks[network.id].icon, {
                                            height: '18px',
                                            width: '18px',
                                            style: { marginRight: 5 },
                                        })}
                                        {filteredSupportedNetworks[network.id].name}
                                    </NetworkItem>
                                ))}
                        </NetworkDropDown>
                    )}
                </SelectedNetworkContainer>
            </NetworkInfoContainer>
        </OutsideClickHandler>
    );
};

const NetworkInfoContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    width: 100%;
`;

const WalletIcon = styled.i`
    font-size: 20px;
    margin-right: 5px;
    color: ${(props) => props.theme.textColor.secondary};
`;

const WalletAddress = styled.span`
    height: 100%;
`;

const NetworkDropDown = styled.div<{ xl?: boolean }>`
    box-shadow: -15px 13px 31px -3px rgba(0, 0, 0, 0.46);
    z-index: 9999;
    position: absolute;
    top: ${(props) => (props.xl ? '34px' : '30px')};
    right: 0;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: ${(props) => props.theme.background.primary};
    width: 100%;
    padding: 5px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: ${(props) => props.theme.textColor.primary};
    @media (max-width: 500px) {
        width: 100%;
    }
`;

const SelectedNetworkContainer = styled.div<{ cursor: string }>`
    display: flex;
    align-items: center;
    width: 100%;
    cursor: ${(props) => props.cursor};
    flex-direction: column;
    z-index: 1;
    /* @media (max-width: 500px) {
        width: 110px;
    } */
`;

const NetworkItem = styled.div<{ selectedItem?: boolean; noHover?: boolean; xl?: boolean }>`
    display: flex;
    align-items: center;
    width: 100%;
    padding: ${(props) => (props.xl ? '8px 13px' : '4px 13px')};
    font-size: 12px;
    border-radius: 8px;
    text-transform: ${(props) => (props.xl ? 'uppercase' : 'none')};
    &:hover {
        background: ${(props) => (props.noHover ? '' : props.theme.background.quaternary)};
    }
    svg {
        width: 16px;
        height: 16px;
    }
    /* @media (max-width: 500px) {
        ${(props) => (props.selectedItem ? 'padding: 4px 7px' : '')}
    } */
    span {
        color: ${(props) => props.theme.textColor.primary};
        display: flex;
        align-items: center;
        margin-top: 2px;
    }
`;

const Icon = styled.i`
    margin-left: 5px;
    font-size: 10px;
    color: ${(props) => props.theme.textColor.primary};
`;

const NetworkIconWrapper = styled(FlexDiv)<{ isWalletConnectorSwitch?: boolean }>`
    align-items: center;
    justify-content: center;
    ${(props) => props.isWalletConnectorSwitch && `margin-left: 5px`};
    ${(props) => props.isWalletConnectorSwitch && `padding-left: 6px`};
    ${(props) => props.isWalletConnectorSwitch && `border-left: 1px ${props.theme.borderColor.primary} solid`};
    ${(props) => !props?.isWalletConnectorSwitch && `margin-right: 5px`};
    ${(props) => !props?.isWalletConnectorSwitch && `padding-right: 6px`};
    color: ${(props) => props.theme.textColor.primary} !important;
`;

export default NetworkSwitch;
