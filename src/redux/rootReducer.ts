import { combineReducers } from '@reduxjs/toolkit';
import app from './modules/app';
import proposal from './modules/proposal';
import ui from './modules/ui';
import wallet from './modules/wallet';

const rootReducer = combineReducers({ app, ui, wallet, proposal });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
