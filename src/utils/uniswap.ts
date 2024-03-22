import { ChainId } from '@uniswap/sdk-core';
import { Network } from 'enums/network';
import JSBI from 'jsbi';
import { countDecimals } from 'thales-utils';
import { SupportedNetwork } from 'types/network';

export const getChainId = (network: SupportedNetwork) => {
    switch (network) {
        case Network.OptimismMainnet:
            return ChainId.OPTIMISM;
        case Network.Arbitrum:
            return ChainId.ARBITRUM_ONE;
        case Network.Base:
            return ChainId.BASE;
    }
    return ChainId.OPTIMISM;
};

export function fromReadableAmount(amount: number, decimals: number): JSBI {
    const extraDigits = Math.pow(10, countDecimals(amount));
    const adjustedAmount = amount * extraDigits;
    return JSBI.divide(
        JSBI.multiply(JSBI.BigInt(adjustedAmount), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))),
        JSBI.BigInt(extraDigits)
    );
}

export function toReadableAmount(rawAmount: number, decimals: number): string {
    return JSBI.divide(JSBI.BigInt(rawAmount), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))).toString();
}
