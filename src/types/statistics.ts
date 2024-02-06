export type MarketsStats = {
    totalUniqueMarkets: number;
};

export type UsersStats = {
    totalUniqueUsers: number;
};

export type VolumeStats = {
    totalProtocolVolume: number;
    thalesAmmVolume: number;
    overtimeAmmVolume: number;
    parlayAmmVolume: number;
    speedAmmVolume: number;
    safeboxFees: number;
};

export type TVLStats = {
    speedMarketsTVL: number;
    vaultsTVL: number;
    thalesLpTVL: number;
    overtimeSingleTVL: number;
    overtimeParlayTVL: number;
    stakingThalesTVL: number;
};

export type AllStats = {
    usersStats: UsersStats;
    marketsStats: MarketsStats;
    volumeStats: VolumeStats;
    TVLStats: TVLStats;
};

export type Fee = {
    day: string;
    amount: number;
};

export type WeeklyStats = {
    safeboxFees: Fee[];
    revShare: Fee[];
};
