import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCore from '@app/core/store';
import * as fromAuth from './auth.reducer';

export interface AuthState {
  auth: fromAuth.State;
}

export interface State extends fromCore.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  auth: fromAuth.reducer
};

// feature state
export const selectFeatureState = createFeatureSelector<AuthState>('auth');
