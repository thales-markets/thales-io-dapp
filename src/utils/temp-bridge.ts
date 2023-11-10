import { NetworkId } from 'thales-utils';

export const getCelerBridgeUrl = (networkId: number) => {
    switch (networkId) {
        case NetworkId.Arbitrum:
            return 'https://cbridge.celer.network/10/42161/THALES';
        case NetworkId.Base:
            return 'https://cbridge.celer.network/10/8453/THALES';
        default:
            return 'https://cbridge.celer.network/1/10/THALES';
    }
};
