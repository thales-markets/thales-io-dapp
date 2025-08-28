import { generalConfig } from 'config/general';
import { ARB_SAFE_BOX_ADDRESS, BASE_SAFE_BOX_ADDRESS, DEAD_ADDRESS, OP_SAFE_BOX_ADDRESS } from 'constants/network';
import QUERY_KEYS from 'constants/queryKeys';
import { TOTAL_SUPPLY } from 'constants/token';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { RPC_LIST } from 'pages/Root/Root';
import { UseQueryOptions, useQuery } from 'react-query';
import { TokenInfo } from 'types/token';
import thalesContract from 'utils/contracts/thalesContract';

const useTokenInfoQuery = (options?: UseQueryOptions<TokenInfo | undefined>) => {
    return useQuery<TokenInfo | undefined>(
        QUERY_KEYS.Token.Info(),
        async () => {
            try {
                const [price, circulatingSupply, marketCap] = await Promise.all([
                    await fetch(`${generalConfig.API_URL}/token/price`),
                    await fetch(`${generalConfig.API_URL}/token/circulatingsupply`),
                    await fetch(`${generalConfig.API_URL}/token/marketcap`),
                ]);

                // Thales contract - Mainnet
                const infuraProvider = new ethers.providers.JsonRpcProvider(RPC_LIST.DRPC[Network.Mainnet].http);
                const mainThalesContract = new ethers.Contract(
                    thalesContract.addresses[Network.Mainnet],
                    thalesContract.abi,
                    infuraProvider
                );

                // Thales contract - Optimism
                const opInfuraProvider = new ethers.providers.JsonRpcProvider(
                    RPC_LIST.DRPC[Network.OptimismMainnet].http
                );
                const opThalesContract = new ethers.Contract(
                    thalesContract.addresses[Network.OptimismMainnet],
                    thalesContract.abi,
                    opInfuraProvider
                );

                // Thales contract - Arbitrum
                const arbInfuraProvider = new ethers.providers.JsonRpcProvider(RPC_LIST.DRPC[Network.Arbitrum].http);
                const arbThalesContract = new ethers.Contract(
                    thalesContract.addresses[Network.Arbitrum],
                    thalesContract.abi,
                    arbInfuraProvider
                );

                // Thales contract - Base
                const baseAnkrProvider = new ethers.providers.JsonRpcProvider(
                    `https://rpc.ankr.com/base/${process.env.REACT_APP_ANKR_PROJECT_ID}`,
                    Network.Base
                );

                const baseThalesContract = new ethers.Contract(
                    thalesContract.addresses[Network.Base],
                    thalesContract.abi,
                    baseAnkrProvider
                );

                const [
                    mainThalesBurnedBalance,
                    opThalesBurnedBalance,
                    arbThalesBurnedBalance,
                    baseThalesBurnedBalance,
                ] = await Promise.all([
                    mainThalesContract.balanceOf(DEAD_ADDRESS),
                    opThalesContract.balanceOf(OP_SAFE_BOX_ADDRESS),
                    arbThalesContract.balanceOf(ARB_SAFE_BOX_ADDRESS),
                    baseThalesContract.balanceOf(BASE_SAFE_BOX_ADDRESS),
                ]);

                const totalThalesBurned =
                    Number(ethers.utils.formatEther(mainThalesBurnedBalance)) +
                    Number(ethers.utils.formatEther(opThalesBurnedBalance)) +
                    Number(ethers.utils.formatEther(arbThalesBurnedBalance)) +
                    Number(ethers.utils.formatEther(baseThalesBurnedBalance));

                const tokenInfo: TokenInfo = {
                    price: Number(await price.text()),
                    circulatingSupply: Number(await circulatingSupply.text()),
                    marketCap: Number(await marketCap.text()),
                    totalSupply: TOTAL_SUPPLY,
                    thalesBurned: totalThalesBurned,
                };

                return tokenInfo;
            } catch (e) {
                console.log(e);
            }

            return undefined;
        },
        {
            ...options,
        }
    );
};

export default useTokenInfoQuery;
