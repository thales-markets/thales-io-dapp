import { Provider } from '@wagmi/core';
import { Signer, ethers } from 'ethers';
import stakingDataContract from './contracts/stakingDataContract';
import overtimeLiquidityPoolContract from './contracts/overtimeLiquidityPoolContract';
import overtimeLiquidityPoolDataContract from './contracts/overtimeLiquidityPoolDataContract';
import parlayAMMLiquidityPoolContract from './contracts/parlayAMMLiquidityPoolContract';
import parlayAMMLiquidityPoolDataContract from './contracts/parlayAMMLiquidityPoolDataContract';
import thalesLiquidityPoolContract from './contracts/thalesLiquidityPoolContract';
import thalesLiquidityPoolDataContract from './contracts/thalesLiquidityPoolDataContract';

type SnxJSConnector = {
    initialized: boolean;
    provider: Provider | undefined;
    signer: Signer | undefined;
    stakingDataContract?: ethers.Contract;
    overtimeLiquidityPoolContract?: ethers.Contract;
    overtimeLiquidityPoolDataContract?: ethers.Contract;
    parlayAMMLiquidityPoolContract?: ethers.Contract;
    parlayAMMLiquidityPoolDataContract?: ethers.Contract;
    thalesLiquidityPoolContract?: ethers.Contract;
    thalesLiquidityPoolDataContract?: ethers.Contract;
    setContractSettings: (contractSettings: any) => void;
};

// @ts-ignore
const snxJSConnector: SnxJSConnector = {
    initialized: false,

    setContractSettings: function (contractSettings: any) {
        this.initialized = true;
        this.signer = contractSettings.signer;
        this.provider = contractSettings.provider;

        this.stakingDataContract = conditionalInitializeContract(stakingDataContract, contractSettings);
        this.overtimeLiquidityPoolContract = conditionalInitializeContract(
            overtimeLiquidityPoolContract,
            contractSettings
        );
        this.overtimeLiquidityPoolDataContract = conditionalInitializeContract(
            overtimeLiquidityPoolDataContract,
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
