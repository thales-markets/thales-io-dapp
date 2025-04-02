export const CACHE_PREFIX_KEYS = {
    Stakers: 'stakers-',
    ClaimOnBehalfItems: 'claim-on-behalf',
    TokenTransactions: 'token-transactions',
    DigitalOptions: {
        Markets: 'digital-options-markets-',
        RangedMarkets: 'digital-options-ranged-markets',

        Trades: 'digital-options-trades-',
        OptionTransactions: 'digital-options-option-transactions-',
        PositionBalance: 'digital-options-position-balance',
        RangePositionBalance: 'digital-options-range-position-balance',

        ReferralTransactions: 'digital-options-referral-transactions',
        ReferredTraders: 'digital-options-referred-traders',
        Referrers: 'digital-options-referrers',

        VaultUserTransactions: 'digital-options-vault-user-transactions',
        VaultPnl: 'digital-options-vault-pnl',
        VaultTransactions: 'digital-options-vault-transactions',
    },
    SportsMarkets: {
        ReferralTransactions: 'sports-markets-referral-transactions',
        ReferredTraders: 'sports-markets-referred-traders',
        Referrers: 'sports-markets-referrers',
    },
};

export const WAIT_PERIOD_AFTER_CACHE_INVALIDATION_IN_SECONDS = 7;
