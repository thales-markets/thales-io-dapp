import { CACHE_PREFIX_KEYS } from 'constants/cache';
import QUERY_KEYS from 'constants/queryKeys';
import { SpaceKey } from 'enums/governance';
import { LiquidityPool } from 'enums/liquidityPool';
import { Network } from 'enums/network';
import { QueryClient } from 'react-query';
import { getCacheKey, invalidateCache, wait } from './cache';

type QueryConnector = {
    queryClient: QueryClient;
    setQueryClient: () => void;
};

// @ts-ignore
const queryConnector: QueryConnector = {
    setQueryClient: function () {
        if (this.queryClient === undefined) {
            this.queryClient = new QueryClient();
        }
    },
};

export const refetchTokenQueries = async (walletAddress: string, networkId: Network) => {
    await invalidateCache([getCacheKey(CACHE_PREFIX_KEYS.TokenTransactions, [networkId, walletAddress])]);

    await wait(2.5);

    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.StakingData());
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.UserStakingData(walletAddress, networkId));
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.UserVestingData(walletAddress, networkId));
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.Transactions(walletAddress, networkId, undefined));
    // queryConnector.queryClient.invalidateQueries(QUERY_KEYS.WalletBalances.Thales(walletAddress, networkId));
};

export const refetchLPStakingQueries = (walletAddress: string, networkId: Network) => {
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.LPStaking(walletAddress, networkId));
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.GelatoBalance(walletAddress, networkId));
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.Gelato());
};

export const refetchProposal = (spaceKey: SpaceKey, hash: string, walletAddress: string) => {
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Governance.Proposal(spaceKey, hash, walletAddress));
};

export const refetchLiquidityPoolData = async (
    walletAddress: string,
    networkId: Network,
    pool: LiquidityPool,
    round?: number
) => {
    if (pool == LiquidityPool.THALES) {
        await invalidateCache([
            getCacheKey(CACHE_PREFIX_KEYS.DigitalOptions.LiquidityPoolTransactions, [networkId, walletAddress]),
            getCacheKey(CACHE_PREFIX_KEYS.DigitalOptions.LiquidityPoolTransactions, [networkId, round]),
        ]);
    } else {
        await invalidateCache([
            getCacheKey(CACHE_PREFIX_KEYS.SportsMarkets.LiquidityPoolTransactions, [networkId, pool, walletAddress]),
            getCacheKey(CACHE_PREFIX_KEYS.SportsMarkets.LiquidityPoolTransactions, [networkId, pool, round]),
        ]);
    }

    await wait(2.5);

    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.ThalesLiquidityPool.Data(networkId));
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.ThalesLiquidityPool.UserData(walletAddress, networkId));
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.LiquidityPoolPnL(networkId, pool));
    queryConnector.queryClient.invalidateQueries(
        QUERY_KEYS.LiquidityPoolUserTransactions(networkId, pool, walletAddress, undefined)
    );
    queryConnector.queryClient.invalidateQueries(
        QUERY_KEYS.LiquidityPoolUserTransactions(networkId, pool, undefined, round)
    );
};

export const refetchCelerBridgeHistory = (walletAddress: string) => {
    queryConnector.queryClient.invalidateQueries(QUERY_KEYS.Token.CelerBridgeHistory(walletAddress));
};

export default queryConnector;
