import { Network } from 'enums/network';
import keyBy from 'lodash/keyBy';
import { Coins } from 'thales-utils';
import { SupportedNetwork } from 'types/network';

export const THALES_CURRENCY = 'THALES';
export const OVER_CURRENCY = '$OVER';
export const USD_SIGN = '$';
export const LP_TOKEN = 'LP Token';

const CRYPTO_CURRENCY = ['OP', 'DAI', 'USDCe', 'USDC', 'USDbC', 'USDT', 'sUSD', 'WETH', 'THALES'];
export const CRYPTO_CURRENCY_MAP = keyBy(CRYPTO_CURRENCY);

export const DEFAULT_COLLATERALS: Record<SupportedNetwork, Coins> = {
    [Network.Mainnet]: CRYPTO_CURRENCY_MAP.sUSD as Coins,
    [Network.OptimismMainnet]: CRYPTO_CURRENCY_MAP.USDC as Coins,
    [Network.OptimismSepolia]: CRYPTO_CURRENCY_MAP.USDC as Coins,
    [Network.Base]: CRYPTO_CURRENCY_MAP.USDbC as Coins,
    [Network.Arbitrum]: CRYPTO_CURRENCY_MAP.USDCe as Coins,
};

export const BUY_OVER_LINKS: Record<SupportedNetwork, string> = {
    [Network.Mainnet]: '',
    [Network.OptimismMainnet]:
        'https://app.velora.xyz/#/swap/0x0b2c639c533813f4aa9d7837caf62653d097ff85-0xedf38688b27036816a50185caa430d5479e1c63e/1000/SELL?network=optimism&version=6.2',
    [Network.OptimismSepolia]: '',
    [Network.Base]:
        'https://app.velora.xyz/#/swap/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913-0x7750c092e284e2c7366f50c8306f43c7eb2e82a2/1000/SELL?network=base&version=6.2',
    [Network.Arbitrum]:
        'https://app.velora.xyz/#/swap/0xaf88d065e77c8cc2239327c5edb3a432268e5831-0x5829d6fe7528bc8e92c4e81cc8f20a528820b51a/1000/SELL?network=arbitrum&version=6.2',
};
