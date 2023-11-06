import { combineReducers } from '@reduxjs/toolkit';
import ui from './modules/ui';
import app from './modules/app';

const rootReducer = combineReducers({ app, ui });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
