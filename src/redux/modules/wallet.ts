import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_NETWORK } from 'constants/network';
import { RootState } from 'redux/rootReducer';
import { getAddress } from 'thales-utils';
import { SupportedNetwork } from 'types/network';

const sliceName = 'wallet';

type WalletSliceState = {
    walletAddress: string | null;
    networkId: SupportedNetwork;
    networkName: string;
    switchToNetworkId: SupportedNetwork; // used to trigger manually network switch in App.tsx
};

const initialState: WalletSliceState = {
    walletAddress: null,
    networkId: DEFAULT_NETWORK.networkId,
    networkName: DEFAULT_NETWORK.name,
    switchToNetworkId: DEFAULT_NETWORK.networkId,
};

const walletDetailsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        updateWallet: (state, action: PayloadAction<Partial<WalletSliceState>>) => {
            const { payload } = action;
            const newState = {
                ...state,
                ...payload,
                walletAddress: payload.walletAddress ? getAddress(payload.walletAddress) : null,
            };

            return newState;
        },
        updateNetworkSettings: (
            state,
            action: PayloadAction<{
                networkId: SupportedNetwork;
                networkName: string;
            }>
        ) => {
            const { networkId, networkName } = action.payload;

            state.networkId = networkId;
            state.networkName = networkName;
        },
        switchToNetworkId: (
            state,
            action: PayloadAction<{
                networkId: SupportedNetwork;
            }>
        ) => {
            state.switchToNetworkId = action.payload.networkId;
        },
    },
});

const getWalletState = (state: RootState) => state[sliceName];
export const getNetworkId = (state: RootState) => getWalletState(state).networkId;

export const getSwitchToNetworkId = (state: RootState) => getWalletState(state).switchToNetworkId;
export const getWalletAddress = (state: RootState) => getWalletState(state).walletAddress;
export const getIsWalletConnected = createSelector(getWalletAddress, (walletAddress) => walletAddress != null);

export const { updateNetworkSettings, switchToNetworkId, updateWallet } = walletDetailsSlice.actions;

export default walletDetailsSlice.reducer;
