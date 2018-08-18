import { TokenModel, PayloadModel } from '@app/auth/models';
import { AuthActions } from '@app/auth/store/actions';

import * as jwt from 'jsonwebtoken';

export interface State {
  token: TokenModel | null;
  payload: PayloadModel | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const INITIAL_STATE: State = {
  token: null,
  payload: null,
  loaded: false,
  loading: false,
  error: null
};

export function reducer(
  state = INITIAL_STATE,
  action: AuthActions.Types
): State {
  switch (action.type) {
    case AuthActions.LOGIN_USER_REQUEST: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }

    case AuthActions.LOGIN_USER_SUCCESS: {
      const { token } = action;
      const payload = jwt.decode(token.accessToken) as PayloadModel;

      return {
        ...state,
        loaded: true,
        loading: false,
        token,
        payload
      };
    }

    case AuthActions.LOGOUT_USER_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }

    case AuthActions.LOGOUT_USER_SUCCESS: {
      return INITIAL_STATE;
    }
  
    case AuthActions.OPERATION_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.error
      };
    }

    default: {
      return state;
    }
  }
}

export const getToken = (state: State) => state.token;
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
