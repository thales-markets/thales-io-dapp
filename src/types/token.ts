import { TransferHistoryStatus } from 'ts-proto/sgn/cbridge/v1/query_pb';

type TokenTransactionType =
    | 'claimRetroAirdrop'
    | 'claimRetroUnlocked'
    | 'claimStakingRewards'
    | 'stake'
    | 'cancelUnstake'
    | 'startUnstaking'
    | 'unstake'
    | 'addToEscrow'
    | 'vest'
    | 'lpStake'
    | 'lpUnstake'
    | 'lpClaimStakingRewards'
    | 'lpClaimStakingRewardsSecond'
    | 'mergeAccount'
    | 'delegateVolume'
    | 'removeDelegation';

export type TokenInfo = {
    totalSupply: number;
    circulatingSupply: number;
    thalesBurned: number;
    price?: number;
    marketCap?: number;
};

export type OverTokenInfo = {
    totalSupply: number;
    circulatingSupply: number;
    burned: number;
    price: number;
    marketCap: number;
};

export type StakingData = {
    totalStakedAmount: number;
    totalStakedAmountOptimism: number;
    totalStakedAmountArbitrum: number;
    totalStakedAmountBase: number;
    apyOptimism: number;
    apyArbitrum: number;
    apyBase: number;
};

export type GlobalStakingData = {
    totalStakedAmount: number;
    feeApy: number;
    thalesApy: number;
    baseRewards: number;
    extraRewards: number;
};

export type ThalesStakingData = {
    period: number;
    unstakeDurationPeriod: number;
    closingDate: number;
    isPaused: boolean;
    baseRewardsPool: number;
    bonusRewardsPool: number;
    totalStakedAmount: number;
    canClosePeriod: boolean;
    closingPeriodInProgress: boolean;
    mergeAccountEnabled: boolean;
    totalEscrowBalanceNotIncludedInStaking: number;
    totalEscrowedRewards: number;
    durationPeriod: number;
};

export type TokenTransaction = {
    hash: string;
    type: TokenTransactionType;
    account: string;
    timestamp: number;
    amount: number | string;
    blockNumber: number;
    destAccount?: string;
    feeRewards: number;
};

export type TokenTransactions = TokenTransaction[];

export type UserStakingData = {
    thalesStaked: number;
    hasClaimRights: boolean;
    claimed: boolean;
    isUnstaking: boolean;
    lastUnstakeTime: number;
    unstakingAmount: number;
    delegatedVolume: string;
    rewards: number;
    baseRewards: number;
    feeRewards: number;
    totalBonus: number;
    escrowedBalance: number;
    claimable: number;
    rawClaimable: string;
    isPaused: boolean;
    unstakeDurationPeriod: number;
    mergeAccountEnabled: boolean;
};

type VestingScheduleItem = {
    date: number;
    amount: number | string;
};

export type VestingSchedule = VestingScheduleItem[];

export type UserVestingData = {
    claimable: number;
    rawClaimable: string;
    vestingSchedule: VestingSchedule;
};

export type CelerBridgeData = {
    transferLatencyInMinutes: number;
};

export type CelerBridgeTransaction = {
    transferId: string;
    timestamp: number;
    srcChainId?: number;
    srcAmount?: number;
    srcTx?: string;
    dstChainId?: number;
    dstAmount?: number;
    dstTx?: string;
    status: TransferHistoryStatus;
};

export type CelerBridgeHistory = CelerBridgeTransaction[];
