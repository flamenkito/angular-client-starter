import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';

// auth
export const selectAuthState = createSelector(
  fromFeature.selectFeatureState,
  (state: fromFeature.AuthState) => state.auth
);

export const selectToken = createSelector(selectAuthState, fromAuth.getToken);

export const selectAuthLoading = createSelector(
  selectAuthState,
  fromAuth.getLoading
);

export const selectAuthLoaded = createSelector(
  selectAuthState,
  fromAuth.getLoaded
);

export const selectError = createSelector(selectAuthState, fromAuth.getError);
