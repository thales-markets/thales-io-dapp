const ROUTES = {
    Home: '/',
    Dashboard: '/dashboard',
    AmmLP: {
        Home: '/amm-lp',
        SportsAMM: '/amm-lp?tab=sports-amm',
        ParlayAMM: '/amm-lp?tab=parlay-amm',
    },
    Token: {
        Staking: {
            Home: '/token/staking',
            Rewards: '/token/staking?tab=rewards',
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
    AmmLP: 'amm-lp',
    Token: 'token',
    Staking: 'staking',
    About: 'about',
    DAO: 'dao',
};

export default ROUTES;
