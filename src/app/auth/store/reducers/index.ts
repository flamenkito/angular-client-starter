import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCore from '@app/core/store';
import * as fromAuth from './auth.reducer';
import * as fromPouch from './pouch.reducer';

export interface AuthState {
  auth: fromAuth.State;
  pouch: fromPouch.State;
}

export interface State extends fromCore.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  auth: fromAuth.reducer,
  pouch: fromPouch.reducer
};

// feature state
export const selectFeatureState = createFeatureSelector<AuthState>('auth');
