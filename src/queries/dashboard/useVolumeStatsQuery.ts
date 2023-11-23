import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { UseQueryOptions, useQuery } from 'react-query';
import { VolumeStats } from 'types/statistics';

const useVolumeStatsQuery = (options?: UseQueryOptions<VolumeStats | undefined>) => {
    return useQuery<VolumeStats | undefined>(
        QUERY_KEYS.VolumeStats(),
        async () => {
            try {
                const response = await fetch(`${generalConfig.API_URL}/thales/thales-io/volume-data`);
                const volumeStatsResp = JSON.parse(await response.text());

                const volumeStats: VolumeStats = {
                    totalProtocolVolume: volumeStatsResp['total-protocol-volume'],
                    safeboxFees: volumeStatsResp['safebox-fees'],
                    thalesAmmVolume: volumeStatsResp['thales-amm-volume'],
                    overtimeAmmVolume: volumeStatsResp['overtime-amm-volume'],
                    parlayAmmVolume: volumeStatsResp['parlay-amm-volume'],
                };
                return volumeStats;
            } catch (e) {
                console.log(e);
            }

            return undefined;
        },
        {
            ...options,
        }
    );
};

export default useVolumeStatsQuery;
