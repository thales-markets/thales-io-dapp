import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter, getDefaultDecimalsForNetwork } from 'thales-utils';
import { AMMsTVLData } from 'types/liquidity';
import overtimeLiquidityPoolContract from 'utils/contracts/sportLiquidityPoolContract';
import overtimeLiquidityPoolDataContract from 'utils/contracts/sportLiquidityPoolDataContract';
import QUERY_KEYS from '../../constants/queryKeys';

const useSportAMMsTVLDataQuery = (options: UseQueryOptions<AMMsTVLData | undefined>) => {
    return useQuery<AMMsTVLData | undefined>(QUERY_KEYS.AMM.SportAMMsTVLData(), sportAMMsTVLDataQueryFn, {
        ...options,
    });
};

export const sportAMMsTVLDataQueryFn = async () => {
    const liquidityPoolData: AMMsTVLData = {
        opTVL: 0,
        arbTVL: 0,
        baseTVL: 0,
    };

    try {
        // Sport LP Data - Optimism
        const opInfuraProvider = new ethers.providers.InfuraProvider(
            Network.OptimismMainnet,
            process.env.REACT_APP_INFURA_PROJECT_ID
        );

        const opOvertimeLPDataContract = new ethers.Contract(
            overtimeLiquidityPoolDataContract.addresses[Network.OptimismMainnet],
            overtimeLiquidityPoolDataContract.abi,
            opInfuraProvider
        );

        //  Sport LP Data - Arbitrum
        const arbInfuraProvider = new ethers.providers.InfuraProvider(
            Network.Arbitrum,
            process.env.REACT_APP_INFURA_PROJECT_ID
        );

        const arbOvertimeLPDataContract = new ethers.Contract(
            overtimeLiquidityPoolDataContract.addresses[Network.Arbitrum],
            overtimeLiquidityPoolDataContract.abi,
            arbInfuraProvider
        );

        // // Sport LP Data - Base
        const baseAnkrProvider = new ethers.providers.JsonRpcProvider(
            `https://rpc.ankr.com/base/${process.env.REACT_APP_ANKR_PROJECT_ID}`,
            Network.Base
        );
        const baseOvertimeLPDataContract = new ethers.Contract(
            overtimeLiquidityPoolDataContract.addresses[Network.Base],
            overtimeLiquidityPoolDataContract.abi,
            baseAnkrProvider
        );

        const [opLiquidityPoolData, arbLiquidityPoolData, baseLiquidityPoolData] = await Promise.all([
            opOvertimeLPDataContract.getLiquidityPoolData(
                overtimeLiquidityPoolContract.addresses[Network.OptimismMainnet]
            ),
            arbOvertimeLPDataContract.getLiquidityPoolData(overtimeLiquidityPoolContract.addresses[Network.Arbitrum]),
            baseOvertimeLPDataContract.getLiquidityPoolData(overtimeLiquidityPoolContract.addresses[Network.Base]),
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
};

export default useSportAMMsTVLDataQuery;
