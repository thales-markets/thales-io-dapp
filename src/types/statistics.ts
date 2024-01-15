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

export type AllStats = { usersStats: UsersStats; marketsStats: MarketsStats; volumeStats: VolumeStats };
