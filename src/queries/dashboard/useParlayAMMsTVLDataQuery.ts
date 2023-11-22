import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter, getDefaultDecimalsForNetwork } from 'thales-utils';
import { AMMsTVLData } from 'types/liquidity';
import parlayAMMLiquidityPoolContract from 'utils/contracts/parlayAMMLiquidityPoolContract';
import parlayAMMLiquidityPoolDataContract from 'utils/contracts/parlayAMMLiquidityPoolDataContract';
import QUERY_KEYS from '../../constants/queryKeys';

const useParlayAMMsTVLDataQuery = (options: UseQueryOptions<AMMsTVLData | undefined>) => {
    return useQuery<AMMsTVLData | undefined>(
        QUERY_KEYS.AMM.ParlayAMMsTVLData(),
        async () => {
            const liquidityPoolData: AMMsTVLData = {
                opTVL: 0,
                arbTVL: 0,
                baseTVL: 0,
            };

            try {
                // Parlay LP Data - Optimism
                const opInfuraProvider = new ethers.providers.InfuraProvider(
                    Network.OptimismMainnet,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                );

                const opParlayLPDataContract = new ethers.Contract(
                    parlayAMMLiquidityPoolDataContract.addresses[Network.OptimismMainnet],
                    parlayAMMLiquidityPoolDataContract.abi,
                    opInfuraProvider
                );

                //  Parlay LP Data - Arbitrum
                const arbInfuraProvider = new ethers.providers.InfuraProvider(
                    Network.Arbitrum,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                );

                const arbParlayLPDataContract = new ethers.Contract(
                    parlayAMMLiquidityPoolDataContract.addresses[Network.Arbitrum],
                    parlayAMMLiquidityPoolDataContract.abi,
                    arbInfuraProvider
                );

                // // Parlay LP Data - Base
                const baseAnkrProvider = new ethers.providers.JsonRpcProvider(
                    `https://rpc.ankr.com/base/${process.env.REACT_APP_ANKR_PROJECT_ID}`,
                    Network.Base
                );
                const baseParlayLPDataContract = new ethers.Contract(
                    parlayAMMLiquidityPoolDataContract.addresses[Network.Base],
                    parlayAMMLiquidityPoolDataContract.abi,
                    baseAnkrProvider
                );

                const [opLiquidityPoolData, arbLiquidityPoolData, baseLiquidityPoolData] = await Promise.all([
                    opParlayLPDataContract.getLiquidityPoolData(
                        parlayAMMLiquidityPoolContract.addresses[Network.OptimismMainnet]
                    ),
                    arbParlayLPDataContract.getLiquidityPoolData(
                        parlayAMMLiquidityPoolContract.addresses[Network.Arbitrum]
                    ),
                    baseParlayLPDataContract.getLiquidityPoolData(
                        parlayAMMLiquidityPoolContract.addresses[Network.Base]
                    ),
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

export default useParlayAMMsTVLDataQuery;
