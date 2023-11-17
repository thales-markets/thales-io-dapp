import { useQuery, UseQueryOptions } from 'react-query';
import thalesData from 'thales-data';
import QUERY_KEYS from 'constants/queryKeys';
import { TokenTransactions } from 'types/token';
import { Network } from 'enums/network';

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
                account: '0x169379d950ceffa34f5d92e33e40B7F3787F0f71', // TODO: remove
                network: 10,
                type_in,
            }),
        {
            ...options,
        }
    );
};

export default useUserTokenTransactionsQuery;
