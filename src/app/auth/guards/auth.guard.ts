import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, CanActivateChild } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromAuth from '@app/auth/store';

import { LocalStorageService, AUTH_KEY } from '@app/auth/services';
import { AuthActions } from '@app/auth/store';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(
    private store: Store<fromAuth.State>,
    private localStorageService: LocalStorageService
  ) {}

  canLoad(route: Route): Observable<boolean> {
    return of(true);
  }

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuth.selectToken).pipe(
      map(token => {
        if (!token) {
          const auth = this.localStorageService.getItem(AUTH_KEY);
          if (auth && auth.token) {
            // try to use stored token
            this.store.dispatch(new AuthActions.LoginUserSuccess(auth.token));
            return true;
          } else {
            // no token
            this.store.dispatch(new AuthActions.LoginRedirect());
            return false;
          }
        }
        // logged in
        return true;
      }),
      take(1)
    );
  }

  canActivateChild(): Observable<boolean> {
    return of(true);
  }
}
