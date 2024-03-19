import { Network } from 'enums/network';
import keyBy from 'lodash/keyBy';
import { Coins } from 'thales-utils/src/types/tokens';

export const THALES_CURRENCY = 'THALES';
export const USD_SIGN = '$';
export const LP_TOKEN = 'LP Token';

const CRYPTO_CURRENCY = ['OP', 'DAI', 'USDCe', 'USDC', 'USDT', 'sUSD'];
export const CRYPTO_CURRENCY_MAP = keyBy(CRYPTO_CURRENCY);

export const DEFAULT_COLLATERALS: Record<Exclude<Network, Network.OptimismGoerli>, Coins> = {
    [Network.Mainnet]: CRYPTO_CURRENCY_MAP.sUSD as Coins,
    [Network.OptimismMainnet]: CRYPTO_CURRENCY_MAP.sUSD as Coins,
    [Network.PolygonMainnet]: CRYPTO_CURRENCY_MAP.USDC as Coins,
    [Network.Base]: CRYPTO_CURRENCY_MAP.USDC as Coins,
    [Network.Arbitrum]: CRYPTO_CURRENCY_MAP.USDCe as Coins,
};
