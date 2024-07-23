import { Network } from 'enums/network';
import keyBy from 'lodash/keyBy';
import { Coins as UtilsCoins } from 'thales-utils';
import { SupportedNetwork } from 'types/network';
import { Coins } from 'types/tokens';

export const THALES_CURRENCY = 'THALES';
export const USD_SIGN = '$';
export const LP_TOKEN = 'LP Token';

const CRYPTO_CURRENCY = ['OP', 'DAI', 'USDCe', 'USDC', 'USDbC', 'USDT', 'sUSD', 'WETH', 'THALES'];
export const CRYPTO_CURRENCY_MAP = keyBy(CRYPTO_CURRENCY);

export const DEFAULT_COLLATERALS: Record<SupportedNetwork, UtilsCoins> = {
    [Network.Mainnet]: CRYPTO_CURRENCY_MAP.sUSD as UtilsCoins,
    [Network.OptimismMainnet]: CRYPTO_CURRENCY_MAP.sUSD as UtilsCoins,
    [Network.PolygonMainnet]: CRYPTO_CURRENCY_MAP.USDC as UtilsCoins,
    [Network.Base]: CRYPTO_CURRENCY_MAP.USDbC as UtilsCoins,
    [Network.Arbitrum]: CRYPTO_CURRENCY_MAP.USDCe as UtilsCoins,
};

export const COLLATERAL_DECIMALS: Record<Coins, number> = {
    sUSD: 18,
    DAI: 18,
    USDCe: 6,
    USDC: 6,
    USDbC: 6,
    USDT: 6,
    OP: 18,
    WETH: 18,
    ETH: 18,
    ARB: 18,
    THALES: 18,
};
