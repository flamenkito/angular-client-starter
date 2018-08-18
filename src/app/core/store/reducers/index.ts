import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';

import { environment } from '@env/environment';

import { storeFreeze } from 'ngrx-store-freeze';

import * as fromFooter from './footer.reducer';

export interface State {
  footer: fromFooter.State;
}

export const reducers: ActionReducerMap<State> = {
  footer: fromFooter.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    if (action.constructor.name !== 'Object') {
      console.log(action);
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
