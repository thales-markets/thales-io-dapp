import { SPORT_VAULT_MAP, VAULT_IDS } from 'constants/vaults';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { UseQueryOptions, useQuery } from 'react-query';
import { bigNumberFormatter, getDefaultDecimalsForNetwork } from 'thales-utils';
import { VaultsTVLData } from 'types/liquidity';
import sportVaultDataContract from 'utils/contracts/sportVaultDataContract';
import QUERY_KEYS from '../../constants/queryKeys';

const useSportVaultsDataQuery = (options?: UseQueryOptions<VaultsTVLData | undefined>) => {
    return useQuery<VaultsTVLData | undefined>(QUERY_KEYS.Vaults.sportVaultsData(), sportVaultsDataQueryFn, {
        ...options,
    });
};

export const sportVaultsDataQueryFn = async () => {
    const vaultData: VaultsTVLData = {
        opDiscountVaultTVL: 0,
        opDegenDiscountVaultTVL: 0,
        opSafuDiscountVaultTVL: 0,
        opUpsettoorVaultTVL: 0,
        arbDiscountVaultTVL: 0,
        arbDegenDiscountVaultTVL: 0,
        arbSafuDiscountVaultTVL: 0,
        arbUpsettoorVaultTVL: 0,
    };

    try {
        //  Sport Vault Data - Optimism
        const opInfuraProvider = new ethers.providers.InfuraProvider(
            Network.OptimismMainnet,
            process.env.REACT_APP_INFURA_PROJECT_ID
        );

        const opSportVaultDataContract = new ethers.Contract(
            sportVaultDataContract.addresses[Network.OptimismMainnet],
            sportVaultDataContract.abi,
            opInfuraProvider
        );

        //  Sport Vault Data - Arbitrum
        const arbInfuraProvider = new ethers.providers.InfuraProvider(
            Network.Arbitrum,
            process.env.REACT_APP_INFURA_PROJECT_ID
        );

        const arbSportVaultDataContract = new ethers.Contract(
            sportVaultDataContract.addresses[Network.Arbitrum],
            sportVaultDataContract.abi,
            arbInfuraProvider
        );

        const opVaultsAddresses = VAULT_IDS.map((id: string) => SPORT_VAULT_MAP[id].addresses[Network.OptimismMainnet]);
        const arbVaultsAddresses = VAULT_IDS.map((id: string) => SPORT_VAULT_MAP[id].addresses[Network.Arbitrum]);

        const opVaultsData = opVaultsAddresses.map((vaultAddress: string) =>
            opSportVaultDataContract.getSportVaultData(vaultAddress)
        );
        const arbVaultsData = arbVaultsAddresses.map((vaultAddress: string) =>
            arbSportVaultDataContract.getSportVaultData(vaultAddress)
        );

        const [
            opDiscountVaultData,
            opDegenDiscountVaultData,
            opSafuDiscountVaultData,
            opUpsettoorVaultData,
            arbDiscountVaultData,
            arbDegenDiscountVaultData,
            arbSafuDiscountVaultData,
            arbUpsettoorVaultData,
        ] = await Promise.all(opVaultsData.concat(arbVaultsData));

        vaultData.opDiscountVaultTVL = bigNumberFormatter(
            opDiscountVaultData.allocationNextRound,
            getDefaultDecimalsForNetwork(Network.OptimismMainnet)
        );
        vaultData.opDegenDiscountVaultTVL = bigNumberFormatter(
            opDegenDiscountVaultData.allocationNextRound,
            getDefaultDecimalsForNetwork(Network.OptimismMainnet)
        );
        vaultData.opSafuDiscountVaultTVL = bigNumberFormatter(
            opSafuDiscountVaultData.allocationNextRound,
            getDefaultDecimalsForNetwork(Network.OptimismMainnet)
        );
        vaultData.opUpsettoorVaultTVL = bigNumberFormatter(
            opUpsettoorVaultData.allocationNextRound,
            getDefaultDecimalsForNetwork(Network.OptimismMainnet)
        );

        vaultData.arbDiscountVaultTVL = bigNumberFormatter(
            arbDiscountVaultData.allocationNextRound,
            getDefaultDecimalsForNetwork(Network.Arbitrum)
        );
        vaultData.arbDegenDiscountVaultTVL = bigNumberFormatter(
            arbDegenDiscountVaultData.allocationNextRound,
            getDefaultDecimalsForNetwork(Network.Arbitrum)
        );
        vaultData.arbSafuDiscountVaultTVL = bigNumberFormatter(
            arbSafuDiscountVaultData.allocationNextRound,
            getDefaultDecimalsForNetwork(Network.Arbitrum)
        );
        vaultData.arbUpsettoorVaultTVL = bigNumberFormatter(
            arbUpsettoorVaultData.allocationNextRound,
            getDefaultDecimalsForNetwork(Network.Arbitrum)
        );

        return vaultData;
    } catch (e) {
        console.log(e);
    }
    return undefined;
};

export default useSportVaultsDataQuery;
