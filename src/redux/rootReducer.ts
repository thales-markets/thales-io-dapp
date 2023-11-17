import { combineReducers } from '@reduxjs/toolkit';
import ui from './modules/ui';
import app from './modules/app';
import wallet from './modules/wallet';

const rootReducer = combineReducers({ app, ui, wallet });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
