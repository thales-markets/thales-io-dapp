import QUERY_KEYS from 'constants/queryKeys';
import { UseQueryOptions, useQuery } from 'react-query';
import { COLLATERAL_DECIMALS, Coins } from 'thales-utils';
import { SupportedNetwork } from 'types/network';
import { getDefaultCollateral } from 'utils/currency';
import networkConnector from 'utils/networkConnector';

const useStableBalanceQuery = (walletAddress: string, networkId: SupportedNetwork, options?: UseQueryOptions<any>) => {
    return useQuery<any>(
        QUERY_KEYS.WalletBalances.StableCoinBalance(walletAddress ?? '', networkId),
        async () => {
            try {
                const collateral = networkConnector.collateral;
                const collateralKey = getDefaultCollateral(networkId, false);

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
