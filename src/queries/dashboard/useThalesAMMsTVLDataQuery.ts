import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter } from 'thales-utils';
import { AMMsTVLData } from 'types/liquidity';
import thalesLiquidityPoolContract from 'utils/contracts/thalesLiquidityPoolContract';
import thalesLiquidityPoolDataContract from 'utils/contracts/thalesLiquidityPoolDataContract';
import QUERY_KEYS from '../../constants/queryKeys';

const useThalesAMMsTVLDataQuery = (options: UseQueryOptions<AMMsTVLData | undefined>) => {
    return useQuery<AMMsTVLData | undefined>(
        QUERY_KEYS.ThalesAMMsTVLData(),
        async () => {
            const liquidityPoolData: AMMsTVLData = {
                opTVL: 0,
                arbTVL: 0,
                baseTVL: 0,
            };

            try {
                // Thales LP Data - Optimism
                const opInfuraProvider = new ethers.providers.InfuraProvider(
                    Network.OptimismMainnet,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                );

                const opThalesLPDataContract = new ethers.Contract(
                    thalesLiquidityPoolDataContract.addresses[Network.OptimismMainnet],
                    thalesLiquidityPoolDataContract.abi,
                    opInfuraProvider
                );

                //  Thales LP Data - Arbitrum
                const arbInfuraProvider = new ethers.providers.InfuraProvider(
                    Network.Arbitrum,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                );

                const arbThalesLPDataContract = new ethers.Contract(
                    thalesLiquidityPoolDataContract.addresses[Network.Arbitrum],
                    thalesLiquidityPoolDataContract.abi,
                    arbInfuraProvider
                );

                // Thales LP Data - Base
                // const baseProviderUrl = snxJSConnector.provider?.chains?.filter((chain) => chain.id === Network.Base)[0]
                //     .rpcUrls.default.http[0];
                // const baseInfuraProvider = new ethers.providers.JsonRpcProvider(baseProviderUrl, Network.Base);
                // const baseThalesLPDataContract = new ethers.Contract(
                //     thalesLiquidityPoolDataContract.addresses[Network.Base],
                //     thalesLiquidityPoolDataContract.abi,
                //     baseInfuraProvider
                // );

                const [opLiquidityPoolData, arbLiquidityPoolData /*baseLiquidityPoolData*/] = await Promise.all([
                    opThalesLPDataContract.getLiquidityPoolData(
                        thalesLiquidityPoolContract.addresses[Network.OptimismMainnet]
                    ),
                    arbThalesLPDataContract.getLiquidityPoolData(
                        thalesLiquidityPoolContract.addresses[Network.Arbitrum]
                    ),
                    // baseOvertimeLPDataContract.getLiquidityPoolData(
                    //     thalesLiquidityPoolContract.addresses[Network.Base]
                    // ),
                ]);

                liquidityPoolData.opTVL = bigNumberFormatter(opLiquidityPoolData.totalDeposited, 18);

                liquidityPoolData.arbTVL = bigNumberFormatter(arbLiquidityPoolData.totalDeposited, 6);

                // liquidityPoolData.baseTVL = bigNumberFormatter(baseLiquidityPoolData.totalDeposited, 6);

                return liquidityPoolData;
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

export default useThalesAMMsTVLDataQuery;
