import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import { CelerBridgeData } from 'types/token';

const useCelerBridgeDataQuery = (
    srcNetwork: Network,
    destNetwork: Network,
    options?: UseQueryOptions<CelerBridgeData | undefined>
) => {
    return useQuery<CelerBridgeData | undefined>(
        QUERY_KEYS.Token.CelerBridgeData(srcNetwork, destNetwork),
        async () => {
            const celerBridgeData: CelerBridgeData = {
                transferLatencyInMinutes: 0,
            };
            try {
                const transferLatency = await fetch(
                    `${generalConfig.CELER_BRIDGE_URL}/v1/getLatest7DayTransferLatencyForQuery?src_chain_id=${srcNetwork}&dst_chain_id=${destNetwork}`
                );

                const transferLatencyJson = await transferLatency.json();
                celerBridgeData.transferLatencyInMinutes = Math.floor(
                    Number(transferLatencyJson.median_transfer_latency_in_second) / 60
                );
                return celerBridgeData;
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

export default useCelerBridgeDataQuery;
