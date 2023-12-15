import QUERY_KEYS from 'constants/queryKeys';
import { Network } from 'enums/network';
import { ethers } from 'ethers';
import { UseQueryOptions, useQuery } from 'react-query';
import thalesCouncilNFT from 'utils/contracts/ThalesCouncilNFT';
import { bigNumberParser } from 'utils/formatters/number';

const useCouncilNftOwners = (options?: UseQueryOptions<string[]>) => {
    return useQuery<string[]>(
        QUERY_KEYS.Governance.CouncilNftOwners(),
        async () => {
            const mainnetInfuraProvider = new ethers.providers.InfuraProvider(
                Network.Mainnet,
                process.env.REACT_APP_INFURA_PROJECT_ID
            );

            const thalesCouncilNFTContract = new ethers.Contract(
                thalesCouncilNFT.addresses[Network.Mainnet],
                thalesCouncilNFT.abi,
                mainnetInfuraProvider
            );

            const nftIds = [1, 2, 3, 4, 5, 6, 7];

            const promises = nftIds.map((id: number) => thalesCouncilNFTContract.ownerOf(bigNumberParser(id)));

            const ownersAddresses = await Promise.all(promises);

            return ownersAddresses;
        },
        {
            ...options,
        }
    );
};

export default useCouncilNftOwners;
