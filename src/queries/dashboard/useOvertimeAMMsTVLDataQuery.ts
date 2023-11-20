import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter } from 'thales-utils';
import { AMMsTVLData } from 'types/liquidity';
import overtimeLiquidityPoolContract from 'utils/contracts/overtimeLiquidityPoolContract';
import overtimeLiquidityPoolDataContract from 'utils/contracts/overtimeLiquidityPoolDataContract';
import QUERY_KEYS from '../../constants/queryKeys';

const useOvertimeAMMsTVLDataQuery = (options: UseQueryOptions<AMMsTVLData | undefined>) => {
    return useQuery<AMMsTVLData | undefined>(
        QUERY_KEYS.OvertimeAMMsTVLData(),
        async () => {
            const liquidityPoolData: AMMsTVLData = {
                opTVL: 0,
                arbTVL: 0,
                baseTVL: 0,
            };

            try {
                // Overtime LP Data - Optimism
                const opInfuraProvider = new ethers.providers.InfuraProvider(
                    Network.OptimismMainnet,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                );

                const opOvertimeLPDataContract = new ethers.Contract(
                    overtimeLiquidityPoolDataContract.addresses[Network.OptimismMainnet],
                    overtimeLiquidityPoolDataContract.abi,
                    opInfuraProvider
                );

                //  Overtime LP Data - Arbitrum
                const arbInfuraProvider = new ethers.providers.InfuraProvider(
                    Network.Arbitrum,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                );

                const arbOvertimeLPDataContract = new ethers.Contract(
                    overtimeLiquidityPoolDataContract.addresses[Network.Arbitrum],
                    overtimeLiquidityPoolDataContract.abi,
                    arbInfuraProvider
                );

                // // Overtime LP Data - Base
                // const baseProviderUrl = snxJSConnector.provider?.chains?.filter((chain) => chain.id === Network.Base)[0]
                //     .rpcUrls.default.http[0];
                // const baseInfuraProvider = new ethers.providers.JsonRpcProvider(baseProviderUrl, Network.Base);
                // const baseOvertimeLPDataContract = new ethers.Contract(
                //     overtimeLiquidityPoolDataContract.addresses[Network.Base],
                //     overtimeLiquidityPoolDataContract.abi,
                //     baseInfuraProvider
                // );

                const [opLiquidityPoolData, arbLiquidityPoolData /*baseLiquidityPoolData*/] = await Promise.all([
                    opOvertimeLPDataContract.getLiquidityPoolData(
                        overtimeLiquidityPoolContract.addresses[Network.OptimismMainnet]
                    ),
                    arbOvertimeLPDataContract.getLiquidityPoolData(
                        overtimeLiquidityPoolContract.addresses[Network.Arbitrum]
                    ),
                    // baseOvertimeLPDataContract.getLiquidityPoolData(
                    //     overtimeLiquidityPoolContract.addresses[Network.Base]
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

export default useOvertimeAMMsTVLDataQuery;
