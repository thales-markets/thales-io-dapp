import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEYS } from 'constants/storage';
import { localStore } from 'thales-utils';
import { RootState } from '../rootReducer';

const sliceName = 'proposal';

const getDefaultProposalSearch = (): string => {
    const lsProposalSearch = localStore.get(LOCAL_STORAGE_KEYS.FILTER_PROPOSAL_SEARCH);
    return lsProposalSearch !== undefined ? (lsProposalSearch as string) : '';
};

type ProposalSliceState = {
    proposalSearch: string;
};

const initialState: ProposalSliceState = {
    proposalSearch: getDefaultProposalSearch(),
};

const proposalSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setProposalSearch: (state, action: PayloadAction<string>) => {
            state.proposalSearch = action.payload;
            localStore.set(LOCAL_STORAGE_KEYS.FILTER_PROPOSAL_SEARCH, action.payload);
        },
    },
});

export const { setProposalSearch: setProposalSearch } = proposalSlice.actions;

const getProposalState = (state: RootState) => state[sliceName];
export const getProposalSearch = (state: RootState) => getProposalState(state).proposalSearch;

export default proposalSlice.reducer;
