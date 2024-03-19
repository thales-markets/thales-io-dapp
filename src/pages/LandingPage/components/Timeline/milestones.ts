import { Quarter } from './types';

// don't remove, used through thales-api
const MILESTONES_BY_QUARTER: Quarter[] = [
    {
        quarter: 'Q2 2021',
        milestones: [
            {
                year: '2021',
                month: 'May',
                link: 'https://blog.synthetix.io/thales-secures-seed-funding-from-synthetixdao/',
                descriptionKey: 'seed-funding',
            },
        ],
    },
    {
        quarter: 'Q3 2021',
        milestones: [
            {
                year: '2021',
                month: 'July',
                link:
                    'https://thalesmarket.medium.com/the-day-has-come-thales-dapp-launches-on-ethereum-mainnet-366b98ed0c71',
                descriptionKey: 'launch-protocol',
            },
            {
                year: '2021',
                month: 'September',
                link: 'https://thalesmarket.medium.com/thales-tokenomics-introducing-thales-token-3aab321174e7',
                descriptionKey: 'launch-token',
            },
        ],
    },
    {
        quarter: 'Q4 2021',
        milestones: [
            {
                year: '2021',
                month: 'December',
                link: 'https://thalesmarket.medium.com/thales-l2-deployment-2021-in-review-and-next-steps-975d2374d676',
                descriptionKey: 'op-deploy',
            },
        ],
    },
    {
        quarter: 'Q1 2022',
        milestones: [
            {
                year: '2022',
                month: 'January',
                link: 'https://thalesmarket.medium.com/tale-of-thales-launch-is-here-7db9de44f3c5',
                descriptionKey: 'tale-of-thales-launch',
            },
            {
                year: '2022',
                month: 'February',
                link: 'https://thalesmarket.medium.com/the-thales-token-is-coming-to-layer-2-6e5df7fcc6a5',
                descriptionKey: 'staking-migration',
            },
        ],
    },
    {
        quarter: 'Q2 2022',
        milestones: [
            {
                year: '2022',
                month: 'April',
                link:
                    'https://thalesmarket.medium.com/thales-goes-to-polygon-and-celebrates-with-a-trading-competition-634449d7f23d',
                descriptionKey: 'thales-polygon-launch',
            },
            {
                year: '2022',
                month: 'May',
                link:
                    'https://thalesmarket.medium.com/a-new-defi-primitive-is-born-the-launch-of-tokenized-ranged-markets-e1d85165627a',
                descriptionKey: 'ranged-markets-launch',
            },
            {
                year: '2022',
                month: 'June',
                link: 'https://thalesmarket.medium.com/thales-launches-novel-on-chain-referral-program-64aace807d8a',
                descriptionKey: 'referral-program-launch',
            },
        ],
    },
    {
        quarter: 'Q3 2022',
        milestones: [
            {
                year: '2022',
                month: 'July',
                link:
                    'https://medium.com/@OvertimeMarkets.xyz/sport-fans-meet-your-new-favorite-defi-platform-overtime-markets-5e18adb5b93',
                descriptionKey: 'overtime-launch',
            },
            {
                year: '2022',
                month: 'September',
                link: 'https://thalesmarket.medium.com/thales-officially-expands-to-arbitrum-c61455643a24',
                descriptionKey: 'thales-arbitrum-launch',
            },
        ],
    },
    {
        quarter: 'Q4 2022',
        milestones: [
            // { year: '2022', month: 'October', link: 'google.com', descriptionKey: 'tokenomics-2' },
            {
                year: '2022',
                month: 'November',
                link: 'https://thalesmarket.medium.com/thales-vaults-are-finally-live-48dae2c57b9c',
                descriptionKey: 'thales-vaults',
            },
            {
                year: '2022',
                month: 'November',
                link:
                    'https://medium.com/@OvertimeMarkets.xyz/overtime-highlights-parlays-new-look-and-zebro-world-cup-nfts-68c318bcf2c3',
                descriptionKey: 'parlay-amm-launch',
            },
        ],
    },
    {
        quarter: 'Q1 2023',
        milestones: [
            {
                year: '2023',
                month: 'February',
                link: 'https://medium.com/@OvertimeMarkets.xyz/overtime-is-coming-to-arbitrum-585c1137508f',
                descriptionKey: 'overtime-arbitrum',
            },
            {
                year: '2023',
                month: 'March',
                link: 'https://thalesmarket.medium.com/thales-gamified-staking-expands-to-arbitrum-afcf57163fcb',
                descriptionKey: 'token-arbitrum',
            },
            {
                year: '2023',
                month: 'March',
                link:
                    'https://thalesmarket.medium.com/thales-stakers-now-able-to-provide-liquidity-for-overtimes-sports-amm-dae946291b75',
                descriptionKey: 'overtime-lp',
            },
        ],
    },
    {
        quarter: 'Q2 2023',
        milestones: [
            {
                year: '2023',
                month: 'May',
                link:
                    'https://thalesmarket.medium.com/thales-markets-2-0-full-redesign-and-greatly-reduced-fees-df1b5f880107',
                descriptionKey: 'thales-lp',
            },
            {
                year: '2023',
                month: 'May',
                link:
                    'https://thalesmarket.medium.com/thales-markets-2-0-full-redesign-and-greatly-reduced-fees-df1b5f880107',
                descriptionKey: 'thales-markets-2',
            },
            {
                year: '2023',
                month: 'June',
                link:
                    'https://medium.com/@OvertimeMarkets.xyz/the-parlay-amm-is-open-for-liquidity-provisioning-94febbee1f62',
                descriptionKey: 'parlay-lp',
            },
        ],
    },
    {
        quarter: 'Q3 2023',
        milestones: [
            {
                year: '2023',
                month: 'July',
                link: 'https://thalesmarket.medium.com/gamified-thales-staking-2-0-5cb5e0d32642',
                descriptionKey: 'gamified-2',
            },
            {
                year: '2023',
                month: 'August',
                link: 'https://thalesmarket.medium.com/thales-launches-on-base-network-dd5cfe7d9075',
                descriptionKey: 'thales-base-launch',
            },
            {
                year: '2023',
                month: 'August',
                link: 'https://thalesmarket.medium.com/thales-shifts-into-overdrive-with-speed-markets-52b4d7676563',
                descriptionKey: 'speed-markets-launch',
            },
        ],
    },
    {
        quarter: 'Q1 2024',
        milestones: [
            {
                year: '2024',
                month: 'January',
                link: 'https://thalesmarket.medium.com/thales-tokenomics-v2-99afd5e8295f',
                descriptionKey: 'tokenomics-2',
            },
            {
                year: '2024',
                month: 'January',
                link:
                    'https://thalesmarket.medium.com/thales-protocol-integrates-chainlink-ccip-to-unlock-cross-chain-staking-and-protocol-rewards-1b10348158d2',
                descriptionKey: 'ccip',
            },
        ],
    },
];

export default MILESTONES_BY_QUARTER;
