import QUERY_KEYS from 'constants/queryKeys';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { RPC_LIST } from 'pages/Root/Root';
import { useQuery, UseQueryOptions } from 'react-query';
import { getOverBuybackByDates, OverBuybackByDate } from 'utils/overTokenBuyback';

// Full buyback history for the burn chart. Kept separate from useOverTokenInfoQuery so the slow
// (cold-start) full-event scan never blocks the headline stats, which render as soon as they load.
const useOverBuybackHistoryQuery = (options?: UseQueryOptions<OverBuybackByDate[] | undefined>) => {
    return useQuery<OverBuybackByDate[] | undefined>(
        QUERY_KEYS.OverToken.BuybackHistory(),
        async () => {
            try {
                const opInfuraProvider = new ethers.providers.JsonRpcProvider(
                    RPC_LIST.DRPC[Network.OptimismMainnet].http
                );

                return await getOverBuybackByDates(opInfuraProvider);
            } catch (e) {
                console.log(e);
            }

            return undefined;
        },
        {
            ...options,
            // History only grows when new buybacks execute; the cache makes refetches cheap.
            refetchInterval: 60 * 1000,
        }
    );
};

export default useOverBuybackHistoryQuery;
