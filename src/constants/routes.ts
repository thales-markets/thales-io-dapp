const ROUTES = {
    Home: '/',
    Dashboard: '/dashboard',
    AMMLP: '/amm-lp',
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
