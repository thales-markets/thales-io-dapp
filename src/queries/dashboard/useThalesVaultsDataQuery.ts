import { THALES_VAULT_MAP, VAULT_IDS } from 'constants/vaults';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter, getDefaultDecimalsForNetwork } from 'thales-utils';
import { VaultsTVLData } from 'types/liquidity';
import thalesVaultDataContract from 'utils/contracts/thalesVaultDataContract';
import QUERY_KEYS from '../../constants/queryKeys';

const useThalesVaultsDataQuery = (options?: UseQueryOptions<VaultsTVLData | undefined>) => {
    return useQuery<VaultsTVLData | undefined>(
        QUERY_KEYS.Vaults.thalesVaultsData(),
        async () => {
            const vaultData: VaultsTVLData = {
                opDiscountVaultTVL: 0,
                opDegenDiscountVaultTVL: 0,
                opSafuDiscountVaultTVL: 0,
                arbDiscountVaultTVL: 0,
                arbDegenDiscountVaultTVL: 0,
                arbSafuDiscountVaultTVL: 0,
            };

            try {
                //  Thales Vault Data - Optimism
                const opInfuraProvider = new ethers.providers.InfuraProvider(
                    Network.OptimismMainnet,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                );

                const opThalesVaultDataContract = new ethers.Contract(
                    thalesVaultDataContract.addresses[Network.OptimismMainnet],
                    thalesVaultDataContract.abi,
                    opInfuraProvider
                );

                //  Thales Vault Data - Arbitrum
                const arbInfuraProvider = new ethers.providers.InfuraProvider(
                    Network.Arbitrum,
                    process.env.REACT_APP_INFURA_PROJECT_ID
                );

                const arbThalesVaultDataContract = new ethers.Contract(
                    thalesVaultDataContract.addresses[Network.Arbitrum],
                    thalesVaultDataContract.abi,
                    arbInfuraProvider
                );

                const opVaultsAddresses = VAULT_IDS.map(
                    (id: string) => THALES_VAULT_MAP[id].addresses[Network.OptimismMainnet]
                );
                const arbVaultsAddresses = VAULT_IDS.map(
                    (id: string) => THALES_VAULT_MAP[id].addresses[Network.Arbitrum]
                );

                const opVaultsData = opVaultsAddresses.map((vaultAddress: string) =>
                    opThalesVaultDataContract.getAmmVaultData(vaultAddress)
                );
                const arbVaultsData = arbVaultsAddresses.map((vaultAddress: string) =>
                    arbThalesVaultDataContract.getAmmVaultData(vaultAddress)
                );

                const [
                    opDiscountVaultData,
                    opDegenDiscountVaultData,
                    opSafuDiscountVaultData,
                    arbDiscountVaultData,
                    arbDegenDiscountVaultData,
                    arbSafuDiscountVaultData,
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

                vaultData.arbDiscountVaultTVL = bigNumberFormatter(
                    arbDiscountVaultData.allocationNextRound,
                    getDefaultDecimalsForNetwork(Network.OptimismMainnet)
                );
                vaultData.arbDegenDiscountVaultTVL = bigNumberFormatter(
                    arbDegenDiscountVaultData.allocationNextRound,
                    getDefaultDecimalsForNetwork(Network.OptimismMainnet)
                );
                vaultData.arbSafuDiscountVaultTVL = bigNumberFormatter(
                    arbSafuDiscountVaultData.allocationNextRound,
                    getDefaultDecimalsForNetwork(Network.OptimismMainnet)
                );

                return vaultData;
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

export default useThalesVaultsDataQuery;
