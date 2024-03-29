import { Network } from 'enums/network';

const stakingBonusRewardsManager = {
    addresses: {
        [Network.Mainnet]: 'TBD',
        [Network.OptimismMainnet]: '0xc07520843239C2CAA28101D8241D9132669B4271',

        [Network.PolygonMainnet]: 'TBD',
        [Network.Arbitrum]: '0x6535F4cCC70E0CCb192a8A224d5eBA420DDF9e3f',
        [Network.Base]: '0xA851554aA5f97b3DcA6486683b2da02d5a6a75dd',
    },
    abi: [
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'oldOwner',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'OwnerChanged',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'newOwner',
                    type: 'address',
                },
            ],
            name: 'OwnerNominated',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'origin',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'basePoints',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'round',
                    type: 'uint256',
                },
            ],
            name: 'PointsStored',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'pool',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'bool',
                    name: 'value',
                    type: 'bool',
                },
            ],
            name: 'SetKnownLiquidityPool',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'amm',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'bool',
                    name: 'value',
                    type: 'bool',
                },
            ],
            name: 'SetKnownTradingAMM',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: 'vault',
                    type: 'address',
                },
                {
                    indexed: false,
                    internalType: 'bool',
                    name: 'value',
                    type: 'bool',
                },
            ],
            name: 'SetKnownVault',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'SetMaxStakingMultiplier',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: '_vaultsMultiplier',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: '_lpMultiplier',
                    type: 'uint256',
                },
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: '_tradingMultiplier',
                    type: 'uint256',
                },
            ],
            name: 'SetMultipliers',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'SetStakingBaseDivider',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'address',
                    name: '_stakingThales',
                    type: 'address',
                },
            ],
            name: 'SetStakingThales',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: 'bool',
                    name: 'value',
                    type: 'bool',
                },
            ],
            name: 'SetUseNewModel',
            type: 'event',
        },
        {
            inputs: [],
            name: 'acceptOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address[]',
                    name: '_lps',
                    type: 'address[]',
                },
                {
                    internalType: 'bool',
                    name: 'add',
                    type: 'bool',
                },
            ],
            name: 'addLPs',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address[]',
                    name: '_vaults',
                    type: 'address[]',
                },
                {
                    internalType: 'bool',
                    name: 'add',
                    type: 'bool',
                },
            ],
            name: 'addVaults',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
            ],
            name: 'getEstimatedCurrentLPsPoints',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'estimatedPoints',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address[]',
                    name: 'stakers',
                    type: 'address[]',
                },
                {
                    internalType: 'uint256',
                    name: 'round',
                    type: 'uint256',
                },
            ],
            name: 'getEstimatedCurrentStakersLeaderboardData',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'stakingMultiplier',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'userVaultPointsPerRound',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'userLPPointsPerRound',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'userTradingBasePointsPerRound',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct StakingThalesBonusRewardsManager.EstimatedLeaderboardStakerData[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
            ],
            name: 'getEstimatedCurrentVaultPoints',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'estimatedPoints',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address[]',
                    name: 'stakers',
                    type: 'address[]',
                },
                {
                    internalType: 'uint256',
                    name: 'round',
                    type: 'uint256',
                },
            ],
            name: 'getStakersLeaderboardData',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'share',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'stakingMultiplier',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'userVaultBasePointsPerRound',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'userVaultPointsPerRound',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'userLPBasePointsPerRound',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'userLPPointsPerRound',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'userTradingBasePointsPerRound',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'userRoundBonusPoints',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct StakingThalesBonusRewardsManager.LeaderboardStakerData[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
            ],
            name: 'getStakingMultiplier',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'round',
                    type: 'uint256',
                },
            ],
            name: 'getUserRoundBonusShare',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'userShare',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'initNonReentrant',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_owner',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: '_stakingThales',
                    type: 'address',
                },
            ],
            name: 'initialize',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            name: 'knownLiquidityPools',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            name: 'knownTradingAMMs',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            name: 'knownVaults',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'lpMultiplier',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'maxStakingMultiplier',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_owner',
                    type: 'address',
                },
            ],
            name: 'nominateNewOwner',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'nominatedOwner',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'owner',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'pool',
                    type: 'address',
                },
                {
                    internalType: 'bool',
                    name: 'value',
                    type: 'bool',
                },
            ],
            name: 'setKnownLiquidityPool',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'amm',
                    type: 'address',
                },
                {
                    internalType: 'bool',
                    name: 'value',
                    type: 'bool',
                },
            ],
            name: 'setKnownTradingAMM',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'vault',
                    type: 'address',
                },
                {
                    internalType: 'bool',
                    name: 'value',
                    type: 'bool',
                },
            ],
            name: 'setKnownVault',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'setMaxStakingMultiplier',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '_vaultsMultiplier',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_lpMultiplier',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_tradingMultiplier',
                    type: 'uint256',
                },
            ],
            name: 'setMultipliers',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_owner',
                    type: 'address',
                },
            ],
            name: 'setOwner',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'setStakingBaseDivider',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_stakingThales',
                    type: 'address',
                },
            ],
            name: 'setStakingThales',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bool',
                    name: 'value',
                    type: 'bool',
                },
            ],
            name: 'setUseNewModel',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'stakingBaseDivider',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'stakingThales',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'origin',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'basePoints',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'round',
                    type: 'uint256',
                },
            ],
            name: 'storePoints',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'totalLPBasePointsPerRound',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'totalRoundBonusPoints',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'totalTradingBasePointsPerRound',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'totalVaultBasePointsPerRound',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'tradingMultiplier',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'proxyAddress',
                    type: 'address',
                },
            ],
            name: 'transferOwnershipAtInit',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'useNewBonusModel',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'userLPBasePointsPerRound',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'userRoundBonusPoints',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'userTradingBasePointsPerRound',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'userVaultBasePointsPerRound',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'vaultsMultiplier',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
    ],
};

export default stakingBonusRewardsManager;
