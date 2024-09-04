import { LiquidityPool } from 'enums/liquidityPool';
import { Coins, NetworkId } from 'thales-utils';
import { CRYPTO_CURRENCY_MAP } from './currency';

export const LiquidityPoolMap: Record<
    NetworkId.OptimismMainnet | NetworkId.Arbitrum,
    Partial<
        Record<
            LiquidityPool,
            {
                name: string;
                address: string;
                collateral: Coins;
            }
        >
    >
> = {
    [NetworkId.OptimismMainnet]: {
        [LiquidityPool.OVERTIME_USDC]: {
            name: 'OVERTIME USDC',
            address: '0x0fe1044Fc8C05482102Db14368fE88791E9B8698',
            collateral: CRYPTO_CURRENCY_MAP.USDC as Coins,
        },
        [LiquidityPool.OVERTIME_WETH]: {
            name: 'OVERTIME WETH',
            address: '0x4f2822D4e60af7f9F70E7e45BC1941fe3461231e',
            collateral: CRYPTO_CURRENCY_MAP.WETH as Coins,
        },
        [LiquidityPool.OVERTIME_THALES]: {
            name: 'OVERTIME THALES',
            address: '0xE59206b08cC96Da0818522C75eE3Fd4EBB7c0A47',
            collateral: CRYPTO_CURRENCY_MAP.THALES as Coins,
        },
    },
    [NetworkId.Arbitrum]: {
        [LiquidityPool.OVERTIME_USDC]: {
            name: 'OVERTIME USDC',
            address: '0x22D180F39A0eB66098cf839AF5e3C6b009383B6A',
            collateral: CRYPTO_CURRENCY_MAP.USDC as Coins,
        },
        [LiquidityPool.OVERTIME_WETH]: {
            name: 'OVERTIME WETH',
            address: '0xcB4728a1789B87E05c813B68DBc5E6A98a4856bA',
            collateral: CRYPTO_CURRENCY_MAP.WETH as Coins,
        },
        [LiquidityPool.OVERTIME_THALES]: {
            name: 'OVERTIME THALES',
            address: '0x9733AB157f5A89f0AD7460d08F869956aE2018dA',
            collateral: CRYPTO_CURRENCY_MAP.THALES as Coins,
        },
    },
};
