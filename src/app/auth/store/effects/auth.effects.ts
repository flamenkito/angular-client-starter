import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';

import { AuthActions, PouchActions } from '../actions';
import { AuthService, LocalStorageService, AUTH_KEY } from '@app/auth/services';
import { RouterActions, FooterActions } from '@app/core/store';

import { getError } from '@app/shared/get-error';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService
  ) {}

  @Effect()
  loginUser$ = this.actions$.pipe(
    ofType<AuthActions.LoginUserRequest>(AuthActions.LOGIN_USER_REQUEST),
    switchMap(action => {
      return this.authService.logIn(action.username, action.password).pipe(
        tap(loginResponse =>
          this.localStorageService.setItem(AUTH_KEY, {
            loginResponse
          })
        ),
        map(loginResponse => new AuthActions.LoginUserSuccess(loginResponse)),
        catchError(err => {
          return of(new AuthActions.OperationFailure(err));
        })
      );
    })
  );

  @Effect()
  logoutUser$ = this.actions$.pipe(
    ofType<AuthActions.LogoutUserRequest>(AuthActions.LOGOUT_USER_REQUEST),
    switchMap(() => {
      return this.authService.logOut().pipe(
        tap(() =>
          this.localStorageService.setItem(AUTH_KEY, {
            loginResponse: null
          })
        ),
        map(() => new AuthActions.LogoutUserSuccess()),
        catchError(err => {
          return of(new AuthActions.OperationFailure(err));
        })
      );
    })
  );

  @Effect()
  loginUserSuccess$ = this.actions$.pipe(
    ofType<AuthActions.LoginUserSuccess>(AuthActions.LOGIN_USER_SUCCESS),
    map(action => action.loginResponse),
    mergeMap(({ token, remoteDbOptions }) => [
      new PouchActions.Setup(remoteDbOptions),
      new RouterActions.Navigate(['/user']),
      new FooterActions.Popup('Logged in')
    ])
  );

  @Effect()
  logoutUserSuccess$ = this.actions$.pipe(
    ofType<AuthActions.LogoutUserSuccess>(AuthActions.LOGOUT_USER_SUCCESS),
    mergeMap(() => [
      new AuthActions.LoginRedirect(),
      new FooterActions.Popup('Logged out')
    ])
  );

  @Effect()
  loginRedirect$ = this.actions$.pipe(
    ofType<AuthActions.LoginRedirect>(AuthActions.LOGIN_REDIRECT),
    map(() => new RouterActions.Navigate(['/login']))
  );

  @Effect()
  operationFailure$ = this.actions$.pipe(
    ofType<AuthActions.OperationFailure>(AuthActions.OPERATION_FAILURE),
    map(action => {
      const message = getError(action.error);
      return new FooterActions.Popup(message);
    })
  );
}
