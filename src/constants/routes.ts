const ROUTES = {
    Home: '/',
    Dashboard: '/dashboard',
    Staking: '/staking',
    Bridge: '/bridge',
    LPStaking: '/lp-staking',
    AMMLP: '/amm-lp',
    Governance: {
        Home: '/governance',
        Space: '/governance/:space',
        Proposal: '/governance/:space/:id',
    },
    Learn: {
        Whitepaper: '/whitepaper',
        Token: '/about-thales-token',
        Governance: '/about-governance',
    },
};
export default ROUTES;
