import { COLLATERAL_DECIMALS, CRYPTO_CURRENCY_MAP } from 'constants/currency';
import QUERY_KEYS from 'constants/queryKeys';
import { Network } from 'enums/network';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter } from 'thales-utils';
import { Coins } from 'types/tokens';
import networkConnector from 'utils/networkConnector';

const useMultipleCollateralBalanceQuery = (
    walletAddress: string,
    networkId: Network,
    options?: UseQueryOptions<any>
) => {
    return useQuery<any>(
        QUERY_KEYS.WalletBalances.MultipleCollateral(walletAddress, networkId),
        async () => {
            try {
                const multipleCollateral = networkConnector.multipleCollateral;

                if (!walletAddress || !networkId) {
                    return {
                        sUSD: 0,
                        WETH: 0,
                        USDC: 0,
                        THALES: 0,
                    };
                }

                const [sUSDBalance, USDCBalance, WETHBalance, THALESBalance] = await Promise.all([
                    multipleCollateral?.[CRYPTO_CURRENCY_MAP.sUSD as Coins]?.address
                        ? multipleCollateral?.[CRYPTO_CURRENCY_MAP.sUSD as Coins]?.balanceOf(walletAddress)
                        : undefined,
                    multipleCollateral
                        ? multipleCollateral[CRYPTO_CURRENCY_MAP.USDC as Coins]?.balanceOf(walletAddress)
                        : undefined,
                    multipleCollateral
                        ? multipleCollateral[CRYPTO_CURRENCY_MAP.WETH as Coins]?.balanceOf(walletAddress)
                        : undefined,
                    multipleCollateral
                        ? multipleCollateral[CRYPTO_CURRENCY_MAP.THALES as Coins]?.balanceOf(walletAddress)
                        : undefined,
                ]);

                return {
                    sUSD: sUSDBalance ? bigNumberFormatter(sUSDBalance, COLLATERAL_DECIMALS.sUSD) : 0,
                    USDC: USDCBalance ? bigNumberFormatter(USDCBalance, COLLATERAL_DECIMALS.USDC) : 0,
                    WETH: WETHBalance ? bigNumberFormatter(WETHBalance, COLLATERAL_DECIMALS.WETH) : 0,
                    THALES: THALESBalance ? bigNumberFormatter(THALESBalance, COLLATERAL_DECIMALS.THALES) : 0,
                };
            } catch (e) {
                console.log('e ', e);
                return {
                    sUSD: 0,
                    WETH: 0,
                    USDC: 0,
                    THALES: 0,
                };
            }
        },
        options
    );
};

export default useMultipleCollateralBalanceQuery;
