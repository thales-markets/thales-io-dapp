import { RainbowKitProvider, connectorsForWallets, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/dist/index.css';
import {
    braveWallet,
    coinbaseWallet,
    imTokenWallet,
    injectedWallet,
    ledgerWallet,
    metaMaskWallet,
    rabbyWallet,
    rainbowWallet,
    trustWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { base } from 'constants/network';
import { Network } from 'enums/network';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thalesDarkTheme from 'styles/themes/dark';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { arbitrum, optimism } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';

interface RootProps {
    store: Store;
}

type RpcProvider = {
    ankr: string;
    chainnode: string;
    blast: string;
};

const CHAIN_TO_RPC_PROVIDER_NETWORK_NAME: Record<number, RpcProvider> = {
    [Network.OptimismMainnet]: {
        ankr: 'optimism',
        chainnode: 'optimism-mainnet',
        blast: 'optimism-mainnet',
    },
    [Network.Arbitrum]: { ankr: 'arbitrum', chainnode: 'arbitrum-one', blast: 'arbitrum-one' },
    [Network.Base]: { ankr: 'base', chainnode: '', blast: '' },
};

const STALL_TIMEOUT = 2000;

const { chains, provider } = configureChains(
    [optimism, arbitrum, base],
    [
        jsonRpcProvider({
            rpc: (chain) => ({
                http:
                    process.env.REACT_APP_PRIMARY_PROVIDER_ID === 'INFURA' && chain.id === Network.Base
                        ? // Use Ankr as primary RPC provider on Base as Chainnode isn't available
                          `https://rpc.ankr.com/base/${process.env.REACT_APP_ANKR_PROJECT_ID}`
                        : !CHAIN_TO_RPC_PROVIDER_NETWORK_NAME[chain.id]?.chainnode
                        ? chain.rpcUrls.default.http[0]
                        : `https://${CHAIN_TO_RPC_PROVIDER_NETWORK_NAME[chain.id].chainnode}.chainnodes.org/${
                              process.env.REACT_APP_CHAINNODE_PROJECT_ID
                          }`,
            }),
            stallTimeout: STALL_TIMEOUT,
            priority: 1,
        }),
        infuraProvider({
            apiKey: process.env.REACT_APP_INFURA_PROJECT_ID || '',
            stallTimeout: STALL_TIMEOUT,
            priority: process.env.REACT_APP_PRIMARY_PROVIDER_ID === 'INFURA' ? 0 : 2,
        }),
        publicProvider({ stallTimeout: STALL_TIMEOUT, priority: 5 }),
    ]
);

const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || '';

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            metaMaskWallet({ projectId, chains }),
            walletConnectWallet({ projectId, chains }), // ensure all WalletConnect-based wallets are supported
            rabbyWallet({ chains }),
            braveWallet({ chains }),
            ledgerWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            injectedWallet({ chains }), //  ensure all injected wallets are supported
            coinbaseWallet({ appName: 'Thales Protocol', chains }),
            rainbowWallet({ projectId, chains }),
            imTokenWallet({ projectId, chains }),
        ],
    },
]);

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

const rainbowDarkTheme = darkTheme();
const customTheme = {
    ...rainbowDarkTheme,
    ...{ colors: { ...rainbowDarkTheme.colors, modalBackground: thalesDarkTheme.background.primary } },
};

const Root: React.FC<RootProps> = ({ store }) => {
    return (
        <Provider store={store}>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider
                    chains={chains}
                    theme={customTheme}
                    appInfo={{
                        appName: 'Thales Protocol',
                        // disclaimer: WalletDisclaimer,
                    }}
                >
                    <App />
                </RainbowKitProvider>
            </WagmiConfig>
        </Provider>
    );
};

export default Root;
