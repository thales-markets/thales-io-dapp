import { Coins, NetworkId } from 'thales-utils';
import { CRYPTO_CURRENCY_MAP, DEFAULT_COLLATERALS } from '../constants/currency';
import { SupportedNetwork } from '../types/network';

export const getDefaultCollateral = (networkId: SupportedNetwork, isDeprecatedCurrency: boolean) =>
    isDeprecatedCurrency && networkId === NetworkId.OptimismMainnet
        ? (CRYPTO_CURRENCY_MAP.sUSD as Coins)
        : (DEFAULT_COLLATERALS[networkId] as Coins);
