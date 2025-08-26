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
import WalletDisclaimer from 'components/WalletDisclaimer';
import { PLAUSIBLE } from 'constants/analytics';
import { base, optimismSepolia } from 'constants/network';
import { Network } from 'enums/network';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import thalesDarkTheme from 'styles/themes/dark';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { arbitrum, mainnet, optimism } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';

interface RootProps {
    store: Store;
}

const STALL_TIMEOUT = 2000;

export const RPC_LIST = {
    DRPC: {
        [Network.OptimismMainnet]: {
            http: `https://lb.drpc.org/optimism/${process.env.REACT_APP_DRPC_PROJECT_ID}`,
        },
        [Network.Arbitrum]: {
            http: `https://lb.drpc.org/arbitrum/${process.env.REACT_APP_DRPC_PROJECT_ID}`,
        },
        [Network.Base]: {
            http: `https://lb.drpc.org/base/${process.env.REACT_APP_DRPC_PROJECT_ID}`,
        },
        [Network.PolygonMainnet]: {
            http: `https://lb.drpc.org/polygon/${process.env.REACT_APP_DRPC_PROJECT_ID}`,
        },
    },
};

const { chains, provider } = configureChains(
    [optimism, arbitrum, base, optimismSepolia, mainnet],
    [
        jsonRpcProvider({
            rpc: (chain) => {
                return {
                    http: RPC_LIST.DRPC[chain.id as keyof typeof RPC_LIST.DRPC]?.http,
                };
            },
            stallTimeout: STALL_TIMEOUT,
            priority: 0,
        }),
        infuraProvider({
            apiKey: process.env.REACT_APP_INFURA_PROJECT_ID || '',
            stallTimeout: STALL_TIMEOUT,
            priority: 1,
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

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.Browser = {
        T: () => {},
    };
}

const Root: React.FC<RootProps> = ({ store }) => {
    PLAUSIBLE.trackPageview();
    return (
        <Provider store={store}>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider
                    chains={chains}
                    theme={customTheme}
                    appInfo={{
                        appName: 'Thales Protocol',
                        disclaimer: WalletDisclaimer,
                    }}
                >
                    <App />
                </RainbowKitProvider>
            </WagmiConfig>
        </Provider>
    );
};

export default Root;
