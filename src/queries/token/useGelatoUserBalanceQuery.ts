import QUERY_KEYS from 'constants/queryKeys';
import { BALANCE_THRESHOLD } from 'constants/token';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter } from 'thales-utils';
import networkConnector from 'utils/networkConnector';

interface BalanceQueryResponse {
    balance: number;
}

const useGelatoUserBalanceQuery = (
    walletAddress: string,
    networkId: Network,
    options?: UseQueryOptions<BalanceQueryResponse>
) => {
    return useQuery<BalanceQueryResponse>(
        QUERY_KEYS.Token.GelatoBalance(walletAddress, networkId),
        async () => {
            try {
                const balance = await networkConnector?.gelatoContract?.balanceOf(walletAddress);

                return {
                    balance: (bigNumberFormatter(balance) < BALANCE_THRESHOLD ? 0 : bigNumberFormatter(balance)) || 0,
                };
            } catch (e) {
                console.log(e);
            }
            return { balance: 0 };
        },
        {
            ...options,
        }
    );
};

export default useGelatoUserBalanceQuery;
