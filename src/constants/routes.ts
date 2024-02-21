const ROUTES = {
    Home: '/',
    Dashboard: '/dashboard',
    AmmLP: {
        Home: '/amm-lp',
        SportsAMM: '/amm-lp?tab=overtime-single',
        ParlayAMM: '/amm-lp?tab=overtime-parlay',
    },
    Token: {
        Staking: {
            Home: '/token',
            Rewards: '/token?tab=rewards',
            Vesting: '/token?tab=vesting',
            Leaderboard: '/token?tab=leaderboard',
            Preferences: '/token?tab=acc-preferences',
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
export default ROUTES;
