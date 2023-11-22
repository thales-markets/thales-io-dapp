import { useQuery, UseQueryOptions } from 'react-query';
import { bigNumberFormatter, getDefaultDecimalsForNetwork } from 'thales-utils';
import QUERY_KEYS from '../../constants/queryKeys';
import { VaultsTVLData } from 'types/liquidity';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import sportVaultDataContract from 'utils/contracts/sportVaultDataContract';
import { SPORT_VAULT_MAP, VAULT_IDS } from 'constants/vaults';

const useSportVaultsDataQuery = (options?: UseQueryOptions<VaultsTVLData | undefined>) => {
    return useQuery<VaultsTVLData | undefined>(
        QUERY_KEYS.Vaults.sportVaultsData(),
        async () => {
            const vaultData: VaultsTVLData = {
                opDiscountVaultTVL: 0,
                opDegenDiscountVaultTVL: 0,
                opSafuDiscountVaultTVL: 0,
                opUpsettoorVaultTVL: 0,
                opParlayDiscountVaultTVL: 0,
                arbDiscountVaultTVL: 0,
                arbDegenDiscountVaultTVL: 0,
                arbSafuDiscountVaultTVL: 0,
                arbUpsettoorVaultTVL: 0,
                arbParlayDiscountVaultTVL: 0,
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

                const opVaultsAddresses = VAULT_IDS.map(
                    (id: string) => SPORT_VAULT_MAP[id].addresses[Network.OptimismMainnet]
                );
                const arbVaultsAddresses = VAULT_IDS.map(
                    (id: string) => SPORT_VAULT_MAP[id].addresses[Network.Arbitrum]
                );

                const opVaultsData = opVaultsAddresses.map((vaultAddress: string) =>
                    opSportVaultDataContract.getAmmVaultData(vaultAddress)
                );
                const arbVaultsData = arbVaultsAddresses.map((vaultAddress: string) =>
                    arbSportVaultDataContract.getAmmVaultData(vaultAddress)
                );

                const [
                    opDiscountVaultData,
                    opDegenDiscountVaultData,
                    opSafuDiscountVaultData,
                    opUpsettoorVaultData,
                    opParlayDiscountVaultData,
                    arbDiscountVaultData,
                    arbDegenDiscountVaultData,
                    arbSafuDiscountVaultData,
                    arbUpsettoorVaultData,
                    arbParlayDiscountVaultData,
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
                vaultData.opParlayDiscountVaultTVL = bigNumberFormatter(
                    opParlayDiscountVaultData.allocationNextRound,
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
                vaultData.arbUpsettoorVaultTVL = bigNumberFormatter(
                    arbUpsettoorVaultData.allocationNextRound,
                    getDefaultDecimalsForNetwork(Network.OptimismMainnet)
                );
                vaultData.arbParlayDiscountVaultTVL = bigNumberFormatter(
                    arbParlayDiscountVaultData.allocationNextRound,
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

export default useSportVaultsDataQuery;
