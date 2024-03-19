import { CRYPTO_CURRENCY_MAP } from 'constants/currency';
import QUERY_KEYS from 'constants/queryKeys';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import { Coins, COLLATERAL_DECIMALS } from 'thales-utils';
import networkConnector from 'utils/networkConnector';

const useStableBalanceQuery = (walletAddress: string, networkId: Network, options?: UseQueryOptions<any>) => {
    return useQuery<any>(
        QUERY_KEYS.WalletBalances.StableCoinBalance(walletAddress ?? '', networkId),
        async () => {
            try {
                const collateral = networkConnector.collateral;
                const collateralKey = CRYPTO_CURRENCY_MAP.sUSD;

                let usdBalance = await collateral?.balanceOf(walletAddress);
                usdBalance = usdBalance
                    ? parseInt(usdBalance) /
                      10 **
                          (COLLATERAL_DECIMALS[collateralKey as Coins]
                              ? COLLATERAL_DECIMALS[collateralKey as Coins]
                              : 18)
                    : 0;

                return usdBalance;
            } catch (e) {
                console.log('e ', e);
                return null;
            }
        },
        options
    );
};

export default useStableBalanceQuery;
