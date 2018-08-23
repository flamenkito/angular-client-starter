import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromPouch from '../reducers/pouch.reducer';

// pouch
export const selectPouchState = createSelector(
  fromFeature.selectFeatureState,
  (state: fromFeature.AuthState) => state.pouch
);

export const selectDocs = createSelector(selectPouchState, fromPouch.getDocs);
