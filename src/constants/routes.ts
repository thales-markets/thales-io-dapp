const ROUTES = {
    Home: '/',
    Dashboard: '/dashboard',
    Staking: '/staking',
    Governance: {
        Home: '/governance',
        Space: '/governance/:space',
        Proposal: '/governance/:space/:id',
    },
    Whitepaper: '/whitepaper',
};
export default ROUTES;
