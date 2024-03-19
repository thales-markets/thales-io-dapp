import { BALANCE_THRESHOLD } from 'constants/token';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter } from 'thales-utils';
import QUERY_KEYS from '../../constants/queryKeys';
import networkConnector from '../../utils/networkConnector';

const useThalesBalanceQuery = (
    walletAddress: string,
    networkId: Network,
    options?: UseQueryOptions<{ balance: number }>
) => {
    return useQuery<{ balance: number }>(
        QUERY_KEYS.WalletBalances.Thales(walletAddress, networkId),
        async () => {
            if ((networkConnector as any).thalesTokenContract) {
                const balance = bigNumberFormatter(
                    await (networkConnector as any).thalesTokenContract.balanceOf(walletAddress)
                );
                return { balance: balance < BALANCE_THRESHOLD ? 0 : balance };
            }
            return { balance: 0 };
        },
        {
            ...options,
        }
    );
};

export default useThalesBalanceQuery;
