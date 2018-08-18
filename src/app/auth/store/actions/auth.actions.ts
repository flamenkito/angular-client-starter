import { Action } from '@ngrx/store';
import { TokenModel } from '../../models';

export namespace AuthActions {
  export const LOGIN_USER_REQUEST = '[Auth] Login User Request';
  export const LOGIN_USER_SUCCESS = '[Auth] Login User Success';
  export const LOGIN_REDIRECT = '[Auth] Login Redirect';
  export const LOGOUT_USER_REQUEST = '[Auth] Logout User Request';
  export const LOGOUT_USER_SUCCESS = '[Auth] Logout User Success';
  export const OPERATION_FAILURE = '[Auth] Operation Failure';

  export class LoginUserRequest implements Action {
    readonly type = LOGIN_USER_REQUEST;
    constructor(
      public readonly username: string,
      public readonly password: string
    ) {}
  }
  export class LoginUserSuccess implements Action {
    readonly type = LOGIN_USER_SUCCESS;
    constructor(public readonly token: TokenModel) {}
  }
  export class LoginRedirect implements Action {
    readonly type = LOGIN_REDIRECT;
    constructor(public readonly message?: string) {}
  }
  export class LogoutUserRequest implements Action {
    readonly type = LOGOUT_USER_REQUEST;
  }
  export class LogoutUserSuccess implements Action {
    readonly type = LOGOUT_USER_SUCCESS;
  }
  export class OperationFailure implements Action {
    readonly type = OPERATION_FAILURE;
    constructor(public readonly error: any) {}
  }

  export type Types =
    | LoginUserRequest
    | LoginUserSuccess
    | LoginRedirect
    | LogoutUserRequest
    | LogoutUserSuccess
    | OperationFailure;
}
