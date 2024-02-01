import QUERY_KEYS from 'constants/queryKeys';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import thalesData from 'thales-data';
import { TokenTransactions } from 'types/token';

const useUserTokenTransactionsQuery = (
    walletAddress: string | undefined,
    networkId: Network,
    type_in?: string,
    options?: UseQueryOptions<TokenTransactions>
) => {
    return useQuery<TokenTransactions>(
        QUERY_KEYS.Token.Transactions(walletAddress, networkId, type_in),
        () =>
            thalesData.binaryOptions.tokenTransactions({
                account: walletAddress,
                network: 10,
                type_in,
            }),
        {
            ...options,
        }
    );
};

export default useUserTokenTransactionsQuery;
