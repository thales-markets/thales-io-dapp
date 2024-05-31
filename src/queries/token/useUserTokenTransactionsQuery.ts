import axios from 'axios';
import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { API_ROUTES } from 'constants/routes';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import { TokenTransactions } from 'types/token';

const useUserTokenTransactionsQuery = (
    walletAddress: string | undefined,
    networkId: Network,
    type_in?: string,
    options?: UseQueryOptions<TokenTransactions>
) => {
    return useQuery<TokenTransactions>(
        QUERY_KEYS.Token.Transactions(walletAddress, networkId, type_in),
        async () => {
            try {
                const response = await axios.get(
                    `${generalConfig.API_URL}/${API_ROUTES.TokenTransactions}/${networkId}?${
                        walletAddress ? `account=${walletAddress}` : ''
                    }&${type_in ? `type_in=${type_in}` : ''}`
                );

                if (!response?.data) return [];

                return response.data;
            } catch (e) {
                console.log('Error ', e);
                return [];
            }
        },
        {
            ...options,
        }
    );
};

export default useUserTokenTransactionsQuery;
