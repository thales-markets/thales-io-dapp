import keyBy from 'lodash/keyBy';

export const THALES_CURRENCY = 'THALES';
export const LP_TOKEN = 'LP Token';

// Order is important, used for sorting
export const CRYPTO_CURRENCY = [
    'BTC',
    'ETH',
    'SNX',
    'ARB',
    'OP',
    'GMX',
    'LINK',
    'MAGIC',
    'DPX',
    'MATIC',
    'KNC',
    'COMP',
    'REN',
    'LEND',
    'XRP',
    'BCH',
    'LTC',
    'EOS',
    'BNB',
    'XTZ',
    'XMR',
    'ADA',
    'TRX',
    'DASH',
    'ETC',
    'BAT',
    'DAI',
    'PHP',
    'REP',
    'USDCe',
    'USDC',
    'USDT',
    'VELO',
    'ZRX',
    'THALES',
    'SOL',
    'UNI',
    'CRV',
    'AAVE',
    'LYRA',
    'LUNA',
    'PERP',
    'APE',
    'CVX',
    'OHM',
    'LOOKS',
    'DYDX',
    'ETC',
    'BUSD',
    'CAKE',
    'PEPE',
    'WLD',
    'WETH',
];
export const CRYPTO_CURRENCY_MAP = keyBy(CRYPTO_CURRENCY);
