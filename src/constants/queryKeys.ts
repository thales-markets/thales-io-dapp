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
        Thales: (walletAddress: string, networkId: Network) => ['walletBalances', 'thales', walletAddress, networkId],
        MultipleCollateral: (walletAddress: string, networkId: Network) => [
            'multipleCollateral',
            walletAddress,
            networkId,
        ],
    },
    Token: {
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
        LPStaking: (walletAddress: string, networkId: Network) => ['token', 'lpStaking', walletAddress, networkId],
        GelatoBalance: (walletAddress: string, networkId: Network) => [
            'token',
            'gelatoBalance',
            walletAddress,
            networkId,
        ],
        Gelato: () => ['token', 'gelato'],
        Info: () => ['token', 'info'],
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
    AllStats: () => ['all', 'stats'],
    WeeklyStats: () => ['weekly', 'stats'],
    LiquidityPoolPnL: (networkId: Network, liquidityPool: LiquidityPool) => [
        'liquidityPoolPnL',
        networkId,
        liquidityPool,
    ],
    LiquidityPoolUserTransactions: (
        networkId: Network,
        liquidityPool: LiquidityPool,
        account?: string,
        round?: number
    ) => [
        'liquidityPoolUserTransactions',
        networkId,
        liquidityPool,
        account ? account : undefined,
        round ? round : undefined,
    ],
    ThalesLiquidityPool: {
        Data: (address: string, networkId: Network) => ['thalesLiquidityPool', 'data', address, networkId],
        UserData: (address: string, walletAddress: string, networkId: Network) => [
            'thalesLiquidityPool',
            'data',
            address,
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
    LiquidityPoolV2: {
        Data: (address: string, networkId: Network) => ['liquidityPool', 'data', address, networkId],
        ParlayData: (networkId: Network) => ['liquidityPool', 'parlayData', networkId],
        UserData: (address: string, walletAddress: string, networkId: Network) => [
            'liquidityPool',
            'data',
            address,
            walletAddress,
            networkId,
        ],
        ParlayUserData: (walletAddress: string, networkId: Network) => [
            'liquidityPool',
            'parlayLPData',
            walletAddress,
            networkId,
        ],
        PnL: (networkId: Network, liquidityPoolAddress: string) => [
            'liquidityPool',
            'pnl',
            liquidityPoolAddress,
            networkId,
        ],
        Return: (networkId: Network, liquidityPoolAddress: string) => [
            'liquidityPool',
            'return',
            liquidityPoolAddress,
            networkId,
        ],
        UserTransactions: (networkId: Network, liquidityPoolAddress: string) => [
            'liquidityPool',
            'userTransactions',
            liquidityPoolAddress,
            networkId,
        ],
    },
    Landing: {
        Timeline: () => ['timeline'],
        EcosystemApps: () => ['ecosystemApps'],
    },
};

export default QUERY_KEYS;
