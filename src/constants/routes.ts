const ROUTES = {
    Home: '/',
    Dashboard: '/dashboard',
    Staking: '/staking',
    Bridge: '/bridge',
    LPStaking: '/lp-staking',
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
};
export default ROUTES;
