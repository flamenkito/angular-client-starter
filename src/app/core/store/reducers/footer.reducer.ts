import { FooterActions } from '../actions';

export interface State {
  message: string | null;
}

export const INITIAL_STATE: State = {
  message: null
};

export function reducer(
  state = INITIAL_STATE,
  action: FooterActions.Types
): State {
  switch (action.type) {
    case FooterActions.SHOW: {
      return {
        ...state,
        message: action.message
      };
    }

    case FooterActions.HIDE: {
      return {
        ...state,
        message: null
      };
    }

    default: {
      return state;
    }
  }
}

export const getMessage = (state: State) => state.message;
