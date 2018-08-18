import { createSelector } from '@ngrx/store';

import * as fromCore from '../reducers';
import * as fromFooter from '../reducers/footer.reducer';

// footer
export const selectFooterState = createSelector(
  (state: fromCore.State) => state.footer
);

export const selectFooterMessage = createSelector(
  selectFooterState,
  fromFooter.getMessage
);
