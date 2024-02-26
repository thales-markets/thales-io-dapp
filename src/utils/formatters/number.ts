import { ethers } from 'ethers';
import { floorNumberToDecimals, formatCurrency, formatCurrencyWithPrecision } from 'thales-utils';

export const formatNumberShort = (value: number, trim = true, negativeFactors = false) => {
    // Nine Zeroes for Billions
    return value >= 1.0e9
        ? formatCurrency(value / 1.0e9, 2, trim) + 'b'
        : // Six Zeroes for Millions
        value >= 1.0e6
        ? formatCurrency(value / 1.0e6, 2, trim) + 'm'
        : // Three Zeroes for Thousands
        value >= 1.0e3
        ? formatCurrency(value / 1.0e3, 2, trim) + 'k'
        : negativeFactors && value <= 1.0e-6
        ? formatCurrency(value * 1.0e6, 2, trim) + 'e-6'
        : formatCurrencyWithPrecision(value, trim);
};

export const formatPricePercentageGrowth = (priceChange: number) => {
    return priceChange > 0 ? `+ ${Math.abs(priceChange).toFixed(2)}%` : `- ${Math.abs(priceChange).toFixed(2)}%`;
};

export const calculatePercentageChange = (lastPrice: number, firstPrice: number) => {
    return ((lastPrice - firstPrice) / lastPrice) * 100;
};

export const formatPricePercentageDifference = (targetPrice: number, currentPrice: number) => {
    return ((currentPrice - targetPrice) / currentPrice) * 100;
};

export const calculateAndFormatPercentage = (first: number, second: number) => {
    const greater = first > second ? first : second;
    const smaller = first > second ? second : first;
    return (greater - smaller) / smaller;
};

export const bigNumberParser = (value: number, decimals?: number) =>
    ethers.utils.parseUnits(
        floorNumberToDecimals(Number(value), decimals ? decimals : 18).toString(),
        decimals ? decimals : 18
    );

export const formatMultiplier = (value: string | number | undefined) => {
    return `x${value ? value : '0.00'}`;
};
