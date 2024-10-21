export enum LiquidityPoolTransaction {
    USER_TRANSACTIONS = 'user-transactions',
    YOUR_TRANSACTIONS = 'your-transactions',
}

export enum LiquidityPoolPnlType {
    PNL_PER_ROUND = 'pnl-per-round',
    CUMULATIVE_PNL = 'cumulative-pnl',
}

export enum LiquidityPool {
    THALES = 'thales-amm',
    THALES_DEPRECATED = 'thales-amm-susd',
    OVERTIME_SINGLE = 'sports-amm',
    OVERTIME_PARLAY = 'parlay-amm',
    OVERTIME_USDC = 'overtime-usdc',
    OVERTIME_WETH = 'overtime-weth',
    OVERTIME_THALES = 'overtime-thales',
}
