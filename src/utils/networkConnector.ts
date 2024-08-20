import { Provider } from '@wagmi/core';
import { ethers, Signer } from 'ethers';
import celerBridgeContract from './contracts/celerBridgeContract';
import collateralContract from './contracts/collateralContract';
import escrowThales from './contracts/escrowThales';
import { gelatoContract } from './contracts/gelatoContract';
import lpStakingRewardsContract from './contracts/lpStakingRewardsContract';
import parlayAMMLiquidityPoolContract from './contracts/parlayAMMLiquidityPoolContract';
import parlayAMMLiquidityPoolDataContract from './contracts/parlayAMMLiquidityPoolDataContract';
import sportLiquidityPoolContract from './contracts/sportLiquidityPoolContract';
import sportLiquidityPoolDataContract from './contracts/sportLiquidityPoolDataContract';
import sportVaultDataContract from './contracts/sportVaultDataContract';
import stakingDataContract from './contracts/stakingDataContract';
import stakingThalesContract from './contracts/stakingThales';
import thalesContract from './contracts/thalesContract';
import thalesCouncilNFT from './contracts/ThalesCouncilNFT';
import thalesLiquidityPoolContract from './contracts/thalesLiquidityPoolContract';
import thalesLiquidityPoolDataContract from './contracts/thalesLiquidityPoolDataContract';
import uniswapFactoryContract from './contracts/uniswapV3Factory';

type networkConnector = {
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
    stakingThalesContract?: ethers.Contract;
    thalesTokenContract?: ethers.Contract;
    escrowThalesContract?: ethers.Contract;
    thalesCouncilNftContract?: ethers.Contract;
    lpStakingRewardsContract?: ethers.Contract;
    gelatoContract?: ethers.Contract;
    celerBridgeContract?: ethers.Contract;
    uniswapFactoryContract?: ethers.Contract;
    setContractSettings: (contractSettings: any) => void;
};

// @ts-ignore
const networkConnector: networkConnector = {
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
        this.stakingThalesContract = conditionalInitializeContract(stakingThalesContract, contractSettings);
        this.thalesTokenContract = conditionalInitializeContract(thalesContract, contractSettings);
        this.escrowThalesContract = conditionalInitializeContract(escrowThales, contractSettings);
        this.thalesCouncilNftContract = conditionalInitializeContract(thalesCouncilNFT, contractSettings);
        this.lpStakingRewardsContract = conditionalInitializeContract(lpStakingRewardsContract, contractSettings);
        this.gelatoContract = conditionalInitializeContract(gelatoContract, contractSettings);
        this.celerBridgeContract = conditionalInitializeContract(celerBridgeContract, contractSettings);
        this.uniswapFactoryContract = conditionalInitializeContract(uniswapFactoryContract, contractSettings);
    },
};

const conditionalInitializeContract = (contract: any, contractSettings: any) =>
    contract.addresses[contractSettings.networkId || 1] !== 'TBD'
        ? new ethers.Contract(
              contract.addresses[contractSettings.networkId || 1],
              contract.abi,
              networkConnector.provider
          )
        : undefined;

export default networkConnector;
