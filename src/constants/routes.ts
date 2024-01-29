const ROUTES = {
    Home: '/',
    Dashboard: '/dashboard',
    Staking: '/token',
    Bridge: '/token/bridge',
    LPStaking: '/token/lp-staking',
    AMMLP: '/amm-lp',
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
    Token: {
        Rewards: '/token?tab=rewards',
        Vesting: '/token?tab=vesting',
        Leaderboard: '/token?tab=leaderboard',
        Preferences: '/token?tab=acc-preferences',
    },
};
export default ROUTES;
