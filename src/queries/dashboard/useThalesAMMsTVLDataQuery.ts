import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter, getDefaultDecimalsForNetwork } from 'thales-utils';
import { AMMsTVLData } from 'types/liquidity';
import thalesLiquidityPoolContract from 'utils/contracts/thalesLiquidityPoolContract';
import thalesLiquidityPoolDataContract from 'utils/contracts/thalesLiquidityPoolDataContract';
import QUERY_KEYS from '../../constants/queryKeys';

const useThalesAMMsTVLDataQuery = (options: UseQueryOptions<AMMsTVLData | undefined>) => {
    return useQuery<AMMsTVLData | undefined>(
        QUERY_KEYS.AMM.ThalesAMMsTVLData(),
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
                const baseAnkrProvider = new ethers.providers.JsonRpcProvider(
                    `https://rpc.ankr.com/base/${process.env.REACT_APP_ANKR_PROJECT_ID}`,
                    Network.Base
                );

                const baseThalesLPDataContract = new ethers.Contract(
                    thalesLiquidityPoolDataContract.addresses[Network.Base],
                    thalesLiquidityPoolDataContract.abi,
                    baseAnkrProvider
                );

                const [opLiquidityPoolData, arbLiquidityPoolData, baseLiquidityPoolData] = await Promise.all([
                    opThalesLPDataContract.getLiquidityPoolData(
                        thalesLiquidityPoolContract.addresses[Network.OptimismMainnet]
                    ),
                    arbThalesLPDataContract.getLiquidityPoolData(
                        thalesLiquidityPoolContract.addresses[Network.Arbitrum]
                    ),
                    baseThalesLPDataContract.getLiquidityPoolData(thalesLiquidityPoolContract.addresses[Network.Base]),
                ]);

                liquidityPoolData.opTVL = bigNumberFormatter(
                    opLiquidityPoolData.totalDeposited,
                    getDefaultDecimalsForNetwork(Network.OptimismMainnet)
                );

                liquidityPoolData.arbTVL = bigNumberFormatter(
                    arbLiquidityPoolData.totalDeposited,
                    getDefaultDecimalsForNetwork(Network.Arbitrum)
                );

                liquidityPoolData.baseTVL = bigNumberFormatter(
                    baseLiquidityPoolData.totalDeposited,
                    getDefaultDecimalsForNetwork(Network.Base)
                );

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
