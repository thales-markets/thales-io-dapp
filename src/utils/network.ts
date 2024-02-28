import { ReactComponent as ArbitrumLogo } from 'assets/images/arbitrum-circle-logo.svg';
import { ReactComponent as BaseLogo } from 'assets/images/base-circle-logo.svg';
import { ReactComponent as OpLogo } from 'assets/images/optimism-circle-logo.svg';
import { L1_TO_L2_NETWORK_MAPPER, SUPPORTED_NETWORKS_PARAMS } from 'constants/network';
import { Network } from 'enums/network';
import { BigNumber } from 'ethers';
import { FunctionComponent, SVGProps } from 'react';
import { changeNetwork } from 'thales-utils';

type DropdownNetwork = {
    name: string;
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    logoClassName: string;
    changeNetwork: (networkId: number, callback?: VoidFunction) => Promise<void>;
    order: number;
};

export const SUPPORTED_NETWORK_IDS_MAP: Record<number, DropdownNetwork> = {
    [Network.OptimismMainnet]: {
        name: 'Optimism',
        icon: OpLogo,
        logoClassName: 'icon icon--op-logo',
        changeNetwork: async (networkId: number, callback?: VoidFunction) => {
            const switchTo = L1_TO_L2_NETWORK_MAPPER[networkId] ?? 10;
            const optimismNetworkParms = SUPPORTED_NETWORKS_PARAMS[switchTo];
            // @ts-ignore
            await changeNetwork(optimismNetworkParms, callback);
        },
        order: 1,
    },
    [Network.Arbitrum]: {
        name: 'Arbitrum',
        icon: ArbitrumLogo,
        logoClassName: 'icon icon--arb-logo',
        changeNetwork: async (networkId: number, callback?: VoidFunction) => {
            const arbNetworkParams = SUPPORTED_NETWORKS_PARAMS[networkId];
            // @ts-ignore
            await changeNetwork(arbNetworkParams, callback);
        },
        order: 2,
    },
    [Network.Base]: {
        name: 'Base',
        icon: BaseLogo,
        logoClassName: 'icon icon--base-logo',
        changeNetwork: async (networkId: number, callback?: VoidFunction) => {
            const baseNetworkParams = SUPPORTED_NETWORKS_PARAMS[networkId];
            // @ts-ignore
            await changeNetwork(baseNetworkParams, callback);
        },
        order: 3,
    },
};

export const checkAllowance = async (amount: BigNumber, token: any, walletAddress: string, spender: string) => {
    try {
        const approved = await token.allowance(walletAddress, spender);
        return approved.gte(amount);
    } catch (err: any) {
        console.log(err);
        return false;
    }
};
