import { Provider } from '@wagmi/core';
import { Signer, ethers } from 'ethers';
import collateralContract from './contracts/collateralContract';
import escrowThales from './contracts/escrowThales';
import parlayAMMLiquidityPoolContract from './contracts/parlayAMMLiquidityPoolContract';
import parlayAMMLiquidityPoolDataContract from './contracts/parlayAMMLiquidityPoolDataContract';
import sportLiquidityPoolContract from './contracts/sportLiquidityPoolContract';
import sportLiquidityPoolDataContract from './contracts/sportLiquidityPoolDataContract';
import sportVaultDataContract from './contracts/sportVaultDataContract';
import stakingDataContract from './contracts/stakingDataContract';
import stakingThalesContract from './contracts/stakingThales';
import stakingBonusRewardsManager from './contracts/thalesAMMStakingThalesBonusRewardsManager';
import thalesContract from './contracts/thalesContract';
import thalesLiquidityPoolContract from './contracts/thalesLiquidityPoolContract';
import thalesLiquidityPoolDataContract from './contracts/thalesLiquidityPoolDataContract';
import thalesVaultDataContract from './contracts/thalesVaultDataContract';

type SnxJSConnector = {
    initialized: boolean;
    provider: Provider | undefined;
    signer: Signer | undefined;
    collateral?: ethers.Contract;
    stakingDataContract?: ethers.Contract;
    sportLiquidityPoolContract?: ethers.Contract;
    sportLiquidityPoolDataContract?: ethers.Contract;
    parlayAMMLiquidityPoolContract?: ethers.Contract;
    parlayAMMLiquidityPoolDataContract?: ethers.Contract;
    thalesLiquidityPoolContract?: ethers.Contract;
    thalesLiquidityPoolDataContract?: ethers.Contract;
    sportVaultDataContract?: ethers.Contract;
    thalesVaultDataContract?: ethers.Contract;
    stakingThalesContract?: ethers.Contract;
    stakingBonusRewardsManager?: ethers.Contract;
    thalesTokenContract?: ethers.Contract;
    escrowThalesContract?: ethers.Contract;
    setContractSettings: (contractSettings: any) => void;
};

// @ts-ignore
const snxJSConnector: SnxJSConnector = {
    initialized: false,

    setContractSettings: function (contractSettings: any) {
        this.initialized = true;
        this.signer = contractSettings.signer;
        this.provider = contractSettings.provider;
        this.collateral = conditionalInitializeContract(collateralContract, contractSettings);

        this.stakingDataContract = conditionalInitializeContract(stakingDataContract, contractSettings);
        this.sportLiquidityPoolContract = conditionalInitializeContract(sportLiquidityPoolContract, contractSettings);
        this.sportLiquidityPoolDataContract = conditionalInitializeContract(
            sportLiquidityPoolDataContract,
            contractSettings
        );
        this.parlayAMMLiquidityPoolContract = conditionalInitializeContract(
            parlayAMMLiquidityPoolContract,
            contractSettings
        );
        this.parlayAMMLiquidityPoolDataContract = conditionalInitializeContract(
            parlayAMMLiquidityPoolDataContract,
            contractSettings
        );
        this.thalesLiquidityPoolContract = conditionalInitializeContract(thalesLiquidityPoolContract, contractSettings);
        this.thalesLiquidityPoolDataContract = conditionalInitializeContract(
            thalesLiquidityPoolDataContract,
            contractSettings
        );
        this.sportVaultDataContract = conditionalInitializeContract(sportVaultDataContract, contractSettings);
        this.thalesVaultDataContract = conditionalInitializeContract(thalesVaultDataContract, contractSettings);
        this.stakingThalesContract = conditionalInitializeContract(stakingThalesContract, contractSettings);
        this.stakingBonusRewardsManager = conditionalInitializeContract(stakingBonusRewardsManager, contractSettings);
        this.thalesTokenContract = conditionalInitializeContract(thalesContract, contractSettings);
        this.escrowThalesContract = conditionalInitializeContract(escrowThales, contractSettings);
    },
};

const conditionalInitializeContract = (contract: any, contractSettings: any) =>
    contract.addresses[contractSettings.networkId || 1] !== 'TBD'
        ? new ethers.Contract(
              contract.addresses[contractSettings.networkId || 1],
              contract.abi,
              snxJSConnector.provider
          )
        : undefined;

export default snxJSConnector;
