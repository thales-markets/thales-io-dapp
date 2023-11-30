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

export type StakingData = {
    totalStakedAmount: number;
    totalStakedAmountOptimism: number;
    totalStakedAmountArbitrum: number;
    totalStakedAmountBase: number;
    apyOptimism: number;
    apyArbitrum: number;
    apyBase: number;
};

export type ThalesStakingData = {
    period: number;
    unstakeDurationPeriod: number;
    closingDate: number;
    isPaused: boolean;
    baseRewardsPool: number;
    bonusRewardsPool: number;
    totalStakedAmount: number;
    maxSnxBonusPercentage: number;
    maxAmmBonusPercentage: number;
    maxThalesRoyaleBonusPercentage: number;
    maxBonusRewardsPercentage: number;
    snxVolumeRewardsMultiplier: number;
    ammVolumeRewardsMultiplier: number;
    canClosePeriod: boolean;
    mergeAccountEnabled: boolean;
    totalEscrowBalanceNotIncludedInStaking: number;
    totalEscrowedRewards: number;
    durationPeriod: number;
};

export type StakersInfo = {
    opStakers: number;
    arbStakers: number;
    baseStakers: number;
    totalStakers: number;
};

export type TokenTransaction = {
    hash: string;
    type: TokenTransactionType;
    account: string;
    timestamp: number;
    amount: number | string;
    blockNumber: number;
    destAccount?: string;
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
    totalBonus: number;
    snxBonus: number;
    ammBonus: number;
    maxSnxBonus: number;
    maxAmmBonus: number;
    maxThalesRoyaleBonus: number;
    snxStaked: number;
    ammVolume: number;
    thalesAmmVolume: number;
    rangedAmmVolume: number;
    sportsAmmVolume: number;
    escrowedBalance: number;
    claimable: number;
    rawClaimable: string;
    isUserLPing: boolean;
    isPaused: boolean;
    unstakeDurationPeriod: number;
    mergeAccountEnabled: boolean;
};

export type BaseRewardsData = {
    thalesStaked: string;
    totalStaked: string;
    share: string;
    baseRewards: string;
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
