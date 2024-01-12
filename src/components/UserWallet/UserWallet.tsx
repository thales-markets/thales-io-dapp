import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import NetworkSwitch from 'components/NetworkSwitch';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsWalletConnected, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDivCentered } from 'styles/common';
import { truncateAddress } from 'thales-utils';

const TRUNCATE_ADDRESS_NUMBER_OF_CHARS = 5;

const UserWallet: React.FC = () => {
    const { t } = useTranslation();
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();

    const isWalletConnected = useSelector((state: RootState) => getIsWalletConnected(state));
    const walletAddress = useSelector((state: RootState) => getWalletAddress(state)) || '';

    const [walletText, setWalletText] = useState('');

    return (
        <Container>
            <Wrapper>
                <WalletButton
                    onClick={() => {
                        isWalletConnected ? openAccountModal?.() : openConnectModal?.();
                    }}
                    onMouseOver={() => setWalletText(t('common.wallet.wallet-options'))}
                    onMouseLeave={() => setWalletText('')}
                >
                    <i className="icon icon--wallet" />
                    <FlexDivCentered>
                        {walletAddress
                            ? walletText ||
                              truncateAddress(
                                  walletAddress,
                                  TRUNCATE_ADDRESS_NUMBER_OF_CHARS,
                                  TRUNCATE_ADDRESS_NUMBER_OF_CHARS
                              )
                            : t('common.wallet.connect-your-wallet')}
                    </FlexDivCentered>
                </WalletButton>
                <NetworkSwitch />
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    @media (max-width: 500px) {
        width: 100%;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    color: ${(props) => props.theme.textColor.secondary};
    border: 1px solid ${(props) => props.theme.borderColor.quaternary};
    border-radius: 8px;
    @media (max-width: 500px) {
        height: 26px;
    }
    > div > div {
        width: 130px;
    }
`;

const WalletButton = styled.button`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: ${(props) => props.theme.textColor.primary};
    width: 140px;
    border: none;
    background: transparent;
    border-right: 1px solid ${(props) => props.theme.borderColor.quaternary};
    font-size: 13px;
`;

export default UserWallet;
