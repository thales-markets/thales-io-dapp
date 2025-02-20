import { generalConfig } from 'config/general';
import QUERY_KEYS from 'constants/queryKeys';
import { UseQueryOptions, useQuery } from 'react-query';
import { OverTokenInfo } from 'types/token';

const useOverTokenInfoQuery = (options?: UseQueryOptions<OverTokenInfo | undefined>) => {
    return useQuery<OverTokenInfo | undefined>(
        QUERY_KEYS.OverToken.Info(),
        async () => {
            try {
                const [price, totalSupply, circulatingSupply, burned, marketCap] = await Promise.all([
                    await fetch(`${generalConfig.API_URL}/over-token/price`),
                    await fetch(`${generalConfig.API_URL}/over-token/total-supply`),
                    await fetch(`${generalConfig.API_URL}/over-token/circulating-supply`),
                    await fetch(`${generalConfig.API_URL}/over-token/burned`),
                    await fetch(`${generalConfig.API_URL}/over-token/market-cap`),
                ]);

                const tokenInfo: OverTokenInfo = {
                    price: Number(await price.text()),
                    totalSupply: Number(await totalSupply.text()),
                    circulatingSupply: Number(await circulatingSupply.text()),
                    burned: Number(await burned.text()),
                    marketCap: Number(await marketCap.text()),
                };

                return tokenInfo;
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

export default useOverTokenInfoQuery;
