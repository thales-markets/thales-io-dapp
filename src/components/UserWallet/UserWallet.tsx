import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { WalletButton } from 'layouts/DappLayout/DappHeader/styled-components';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getIsWalletConnected, getWalletAddress } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
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
            <WalletButton
                onClick={() => {
                    isWalletConnected ? openAccountModal?.() : openConnectModal?.();
                }}
                onMouseOver={() => setWalletText(t('common.wallet.wallet-options'))}
                onMouseLeave={() => setWalletText('')}
            >
                <i className="icon icon--wallet" />
                {walletAddress
                    ? walletText ||
                      truncateAddress(walletAddress, TRUNCATE_ADDRESS_NUMBER_OF_CHARS, TRUNCATE_ADDRESS_NUMBER_OF_CHARS)
                    : t('common.wallet.connect-your-wallet')}
            </WalletButton>
        </Container>
    );
};

const Container = styled.div`
    @media (max-width: 500px) {
        width: 100%;
    }
`;

export default UserWallet;
