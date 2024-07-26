import { LiquidityPool } from 'enums/liquidityPool';
import { NetworkId } from 'thales-utils';
import { Coins } from 'types/tokens';
import { CRYPTO_CURRENCY_MAP } from './currency';

export const LiquidityPoolMap: Record<
    NetworkId.OptimismMainnet,
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
};
