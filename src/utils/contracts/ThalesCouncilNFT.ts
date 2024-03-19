import { Network } from 'enums/network';

const thalesCouncilNFT = {
    addresses: {
        [Network.Mainnet]: '0xA71F5fACaF3e021897931BE44b10d68F89EC6a3B',
        [Network.OptimismMainnet]: 'TBD',

        [Network.PolygonMainnet]: 'TBD',
        [Network.Arbitrum]: 'TBD',
        [Network.Base]: 'TBD',
    },
    abi: [
        {
            inputs: [
                { internalType: 'string', name: '_name', type: 'string' },
                { internalType: 'string', name: '_symbol', type: 'string' },
            ],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
        {
            anonymous: false,
            inputs: [{ indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
            name: 'Burn',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
                { indexed: false, internalType: 'string', name: 'tokenURI', type: 'string' },
            ],
            name: 'MetadataChanged',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
                { indexed: false, internalType: 'address', name: 'to', type: 'address' },
            ],
            name: 'Mint',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
                { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
            ],
            name: 'OwnershipTransferred',
            type: 'event',
        },
        {
            anonymous: false,
            inputs: [
                { indexed: true, internalType: 'address', name: 'from', type: 'address' },
                { indexed: true, internalType: 'address', name: 'to', type: 'address' },
                { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            ],
            name: 'Transfer',
            type: 'event',
        },
        {
            constant: true,
            inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
            name: 'burn',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            constant: true,
            inputs: [],
            name: 'isOwner',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [
                { internalType: 'address', name: 'to', type: 'address' },
                { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            ],
            name: 'mint',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            constant: true,
            inputs: [],
            name: 'name',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: true,
            inputs: [],
            name: 'owner',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: true,
            inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
            name: 'ownerOf',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [],
            name: 'renounceOwnership',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            constant: false,
            inputs: [
                { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
                { internalType: 'string', name: 'uri', type: 'string' },
            ],
            name: 'setTokenURI',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            constant: true,
            inputs: [],
            name: 'symbol',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: true,
            inputs: [{ internalType: 'address', name: '', type: 'address' }],
            name: 'tokenOwned',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: true,
            inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            name: 'tokenOwner',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: true,
            inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
            name: 'tokenURI',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: true,
            inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            name: 'tokenURIs',
            outputs: [{ internalType: 'string', name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: true,
            inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            name: 'tokens',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: true,
            inputs: [],
            name: 'totalSupply',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [
                { internalType: 'address', name: 'from', type: 'address' },
                { internalType: 'address', name: 'to', type: 'address' },
                { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            ],
            name: 'transfer',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
            name: 'transferOwnership',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],
};

export default thalesCouncilNFT;
