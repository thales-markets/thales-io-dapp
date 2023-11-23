import { SpaceKey } from 'enums/governance';
import { Network } from 'enums/network';

const QUERY_KEYS = {
    Token: {
        StakingOverview: (walletAddress: string, networkId: Network) => [
            'token',
            'staking',
            'overview',
            walletAddress,
            networkId,
        ],
        PointsBreakdown: (walletAddress: string, networkId: Network) => [
            'token',
            'staking',
            'breakdown',
            walletAddress,
            networkId,
        ],
        UserBaseRewards: (walletAddress: string, networkId: Network) => [
            'token',
            'staking',
            'baserewards',
            walletAddress,
            networkId,
        ],
        StakingData: () => ['token', 'staking', 'data'],
        UserStakingData: (walletAddress: string, networkId: Network) => [
            'token',
            'staking',
            'data',
            walletAddress,
            networkId,
        ],
        UserVestingData: (walletAddress: string, networkId: Network) => [
            'token',
            'vesting',
            'data',
            walletAddress,
            networkId,
        ],
        ClaimOnBehalf: (walletAddress: string, networkId: Network) => [
            'token',
            'staking',
            'claimOnBehalf',
            walletAddress,
            networkId,
        ],
        Transactions: (walletAddress: string | undefined, networkId: Network, type_in: string | undefined) => [
            'token',
            'transactions',
            walletAddress,
            networkId,
            type_in,
        ],
        MigratedInvestorsRetroRewards: (walletAddress: string, networkId: Network) => [
            'token',
            'migratedInvestorsRetroRewards',
            walletAddress,
            networkId,
        ],
        VestingEscrow: (walletAddress: string, networkId: Network) => [
            'token',
            'vestingEscrow',
            walletAddress,
            networkId,
        ],
        LPStaking: (walletAddress: string, networkId: Network) => ['token', 'lpStaking', walletAddress, networkId],
        GelatoBalance: (walletAddress: string, networkId: Network) => [
            'token',
            'gelatoBalance',
            walletAddress,
            networkId,
        ],
        Gelato: () => ['token', 'gelato'],
        Info: () => ['token', 'info'],
        StakersInfo: () => ['token', 'stakers'],
        StakersLeaderboardData: (walletAddress: string, networkId: Network, period: number) => [
            'token',
            'stakersLeaderboard',
            walletAddress,
            networkId,
            period,
        ],
    },
    AMM: {
        SportAMMsTVLData: () => ['amm', 'sport', 'tvl'],
        ParlayAMMsTVLData: () => ['amm', 'parlay', 'tvl'],
        ThalesAMMsTVLData: () => ['amm', 'thales', 'tvl'],
    },
    Vaults: {
        sportVaultsData: () => ['vaults', 'sport', 'data'],
        thalesVaultsData: () => ['vaults', 'thales', 'data'],
    },
    Governance: {
        Proposals: (spaceKey: SpaceKey) => ['governance', 'proposals', spaceKey],
        Proposal: (spaceKey: SpaceKey, hash: string, walletAddress: string) => [
            'governance',
            'proposal',
            spaceKey,
            hash,
            walletAddress,
        ],
        ThalesStakers: (filter: string) => ['governance', 'thalesStakers', filter],
        VotingPower: (proposalId: string, snapshot: string, walletAddress: string) => [
            'governance',
            'votingPower',
            proposalId,
            snapshot,
            walletAddress,
        ],
    },
    Integrators: () => ['integrators'],
    VolumeStats: () => ['volume', 'stats'],
    UsersStats: () => ['users', 'stats'],
};

export default QUERY_KEYS;
