export type TokenInfo = {
    totalSupply: number;
    circulatingSupply: number;
    thalesBurned: number;
    price?: number;
    marketCap?: number;
};

export type StakingData = {
    totalStakedAmount: number;
    totalStakedAmountOptimism: number;
    totalStakedAmountArbitrum: number;
    totalStakedAmountBase: number;
    apyOptimism: number;
    apyArbitrum: number;
    apyBase: number;
};
