import { ChainId, Currency, CurrencyAmount, Token, TradeType } from '@uniswap/sdk-core';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { computePoolAddress, FeeAmount, Route, SwapQuoter } from '@uniswap/v3-sdk';
import { getProvider } from '@wagmi/core';
import { UNISWAP_QUOTER_CONTRACT_ADDRESS } from 'constants/uniswap';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import JSBI from 'jsbi';
import { countDecimals } from 'thales-utils';
import { SupportedNetwork } from 'types/network';
import networkConnector from './networkConnector';

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

export const getFeeAmount = (network: SupportedNetwork) => {
    switch (network) {
        case Network.OptimismMainnet:
            return FeeAmount.MEDIUM;
        case Network.Arbitrum:
            return FeeAmount.MEDIUM;
        case Network.Base:
            return FeeAmount.HIGH;
    }
    return FeeAmount.MEDIUM;
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

export async function getPoolInfo(networkId: SupportedNetwork, tokenA: Token, tokenB: Token) {
    const { uniswapFactoryContract, provider } = networkConnector;

    if (!uniswapFactoryContract) {
        return;
    }

    const currentPoolAddress = computePoolAddress({
        factoryAddress: uniswapFactoryContract.address,
        tokenA,
        tokenB,
        fee: getFeeAmount(networkId),
    });

    const poolContract = new ethers.Contract(currentPoolAddress, IUniswapV3PoolABI.abi, provider);
    const [token0, token1, fee, tickSpacing, liquidity, slot0] = await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
        poolContract.tickSpacing(),
        poolContract.liquidity(),
        poolContract.slot0(),
    ]);

    return {
        token0,
        token1,
        fee,
        tickSpacing,
        liquidity,
        sqrtPriceX96: slot0[0],
        tick: slot0[1],
    };
}

export async function getOutputQuote(route: Route<Currency, Currency>, tokenIn: Token, amountIn: number) {
    const provider = getProvider();

    if (!provider) {
        throw new Error('Provider required to get pool state');
    }

    const { calldata } = await SwapQuoter.quoteCallParameters(
        route,
        CurrencyAmount.fromRawAmount(tokenIn, fromReadableAmount(amountIn, tokenIn.decimals).toString()),
        TradeType.EXACT_INPUT,
        {
            useQuoterV2: true,
        }
    );

    const quoteCallReturnData = await provider.call({
        to: UNISWAP_QUOTER_CONTRACT_ADDRESS,
        data: calldata,
    });

    return ethers.utils.defaultAbiCoder.decode(['uint256'], quoteCallReturnData);
}
