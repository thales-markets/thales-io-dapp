import { Network } from 'enums/network';

export type SupportedNetwork = Exclude<Network, Network.OptimismGoerli>;

export type NetworkParams = {
    chainId: string;
    chainName: string;
    rpcUrls: string[];
    blockExplorerUrls: string[];
    iconUrls: string[];
    fraudProofWindow?: number;
    nativeCurrency: {
        symbol: string;
        decimals: number;
    };
};
