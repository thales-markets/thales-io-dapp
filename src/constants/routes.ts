const ROUTES = {
    Home: '/',
    Dashboard: '/dashboard',
    Token: {
        Staking: {
            Home: '/token/staking',
            Rewards: '/token/staking?tab=rewards',
            StakeAndEarn: '/token/staking?tab=stake-thales',
            Vesting: '/token/staking?tab=vesting',
            Leaderboard: '/token/staking?tab=leaderboard',
            Preferences: '/token/staking?tab=acc-preferences',
        },
        Bridge: '/token/bridge',
        LPStaking: '/token/lp-staking',
    },
    DAO: {
        Home: '/dao',
        Space: '/dao/:space',
        Proposal: '/dao/:space/:id',
    },
    About: {
        Root: '/about',
        Whitepaper: '/about/whitepaper',
        Token: '/about/thales-token',
        Governance: '/about/governance',
    },
};

export const ROUTE_NAMES = {
    Token: 'token',
    Staking: 'staking',
    About: 'about',
    DAO: 'dao',
};

export const API_ROUTES = {
    DigitalOptions: {
        Referral: 'v1/digital-options/referral',
        ReferralTransactions: 'v1/digital-options/referral/transactions',
        ReferralTraders: 'v1/digital-options/referral/traders',
        Referrers: 'v1/digital-options/referral/referrers',
        VaultsUserTransactions: 'v1/vaults/user-transactions',
        VaultsPnl: 'v1/vaults/pnl',
    },
    SportMarkets: {
        Referral: 'v1/sport-markets/referral',
        ReferralTransactions: 'v1/sport-markets/referral/transactions',
        ReferralTraders: 'v1/sport-markets/referral/traders',
        Referrers: 'v1/sport-markets/referral/referrers',
    },
    Stakers: 'v1/stakers',
    TokenTransactions: 'v1/stakers/token-transactions',
    ClaimOnBehalf: 'v1/stakers/claim-on-behalf',
    CacheControl: 'v1/cache-control',
};

export default ROUTES;
