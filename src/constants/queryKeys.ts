import { SpaceKey } from 'enums/governance';
import { LiquidityPool } from 'enums/liquidityPool';
import { Network } from 'enums/network';

const QUERY_KEYS = {
    WalletBalances: {
        StableCoinBalance: (walletAddress: string, networkId: Network) => [
            'walletBalances',
            'stableCoin',
            walletAddress,
            networkId,
        ],
        Eth: (walletAddress: string) => ['walletBalances', 'eth', walletAddress],
        Thales: (walletAddress: string, networkId: Network) => ['walletBalances', 'thales', walletAddress, networkId],
        OpThales: (walletAddress: string, networkId: Network) => [
            'walletBalances',
            'opThales',
            walletAddress,
            networkId,
        ],
        MultipleCollateral: (walletAddress: string, networkId: Network) => [
            'multipleCollateral',
            'balance',
            walletAddress,
            networkId,
        ],
    },
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
        GlobalStakingData: () => ['token', 'global', 'staking'],
        ThalesStakingData: (networkId: Network) => [networkId, 'token', 'staking', 'data'],
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
        CelerBridgeHistory: (walletAddress: string) => ['token', 'celerBridge', 'history', walletAddress],
        CelerBridgeData: (srcNetwork: Network, destNetwork: Network) => [
            'token',
            'celerBridge',
            'data',
            srcNetwork,
            destNetwork,
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
        Proposals: (spaceKey: SpaceKey, limit: number) => ['governance', 'proposals', spaceKey, limit],
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
        CouncilNftOwners: () => ['governance', 'council'],
    },
    Integrators: () => ['integrators'],
    VolumeStats: () => ['volume', 'stats'],
    UsersStats: () => ['users', 'stats'],
    AllStats: () => ['all', 'stats'],
    LiquidityPoolPnL: (networkId: Network, liquidityPool: LiquidityPool) => [
        'liquidityPoolPnL',
        networkId,
        liquidityPool,
    ],
    LiquidityPoolUserTransactions: (networkId: Network, liquidityPool: LiquidityPool) => [
        'liquidityPoolUserTransactions',
        networkId,
        liquidityPool,
    ],
    ThalesLiquidityPool: {
        Data: (networkId: Network) => ['thalesLiquidityPool', 'data', networkId],
        UserData: (walletAddress: string, networkId: Network) => [
            'thalesLiquidityPool',
            'data',
            walletAddress,
            networkId,
        ],
    },
    ParlayLiquidityPool: {
        Data: (networkId: Network) => ['parlayLiquidityPool', 'data', networkId],
        UserData: (walletAddress: string, networkId: Network) => [
            'parlayLiquidityPool',
            'data',
            walletAddress,
            networkId,
        ],
    },
    SportsLiquidityPool: {
        Data: (networkId: Network) => ['sportsLiquidityPool', 'data', networkId],
        UserData: (walletAddress: string, networkId: Network) => [
            'sportsLiquidityPool',
            'data',
            walletAddress,
            networkId,
        ],
    },
    Landing: {
        Timeline: () => ['timeline'],
        EcosystemApps: () => ['ecosystemApps'],
    },
};

export default QUERY_KEYS;
