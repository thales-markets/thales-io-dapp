import QUERY_KEYS from 'constants/queryKeys';
import { useQueries } from 'react-query';
import { parlayAMMsTVLDataQueryFn } from './dashboard/useParlayAMMsTVLDataQuery';
import { sportAMMsTVLDataQueryFn } from './dashboard/useSportAMMsTVLDataQuery';
import { sportVaultsDataQueryFn } from './dashboard/useSportVaultsDataQuery';
import { thalesAMMsTVLDataQueryFn } from './dashboard/useThalesAMMsTVLDataQuery';
import { thalesVaultsDataQueryFn } from './dashboard/useThalesVaultsDataQuery';

const useAllTVLsQueries = () => {
    return useQueries([
        { queryKey: QUERY_KEYS.AMM.SportAMMsTVLData(), queryFn: sportAMMsTVLDataQueryFn, staleTime: Infinity },
        { queryKey: QUERY_KEYS.AMM.ParlayAMMsTVLData(), queryFn: parlayAMMsTVLDataQueryFn, staleTime: Infinity },
        { queryKey: QUERY_KEYS.Vaults.sportVaultsData(), queryFn: sportVaultsDataQueryFn, staleTime: Infinity },
        { queryKey: QUERY_KEYS.AMM.ThalesAMMsTVLData(), queryFn: thalesAMMsTVLDataQueryFn, staleTime: Infinity },
        { queryKey: QUERY_KEYS.Vaults.thalesVaultsData(), queryFn: thalesVaultsDataQueryFn, staleTime: Infinity },
    ]);
};

export default useAllTVLsQueries;
