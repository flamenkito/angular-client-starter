import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, empty, Subject, throwError } from 'rxjs';
import { map, switchMap, take, catchError, takeUntil } from 'rxjs/operators';

import * as fromAuth from '@app/auth/store';

import { AuthActions } from '@app/auth/store/actions';
import { TokenModel } from '@app/auth/models';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private token$: Observable<TokenModel>;
  private unauthorized$ = new Subject<void>();

  constructor(private store: Store<fromAuth.State>) {
    this.token$ = store.select(fromAuth.selectToken);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.token$.pipe(
      take(1),
      map(token => {
        return token
          ? request.clone({
              setHeaders: {
                Authorization: `Bearer ${token.accessToken}`
              }
            })
          : request;
      }),
      switchMap(req =>
        next.handle(req).pipe(
          catchError(
            (err: any): Observable<HttpEvent<any>> => {
              if (isJwtExpiredError(err)) {
                this.unauthorized$.next();
                this.store.dispatch(
                  new AuthActions.LoginRedirect('Token expired')
                );
                return empty();
              } else {
                return throwError(err);
              }
            }
          )
        )
      ),
      takeUntil(this.unauthorized$)
    );
  }
}

const isJwtExpiredError = (res): boolean => {
  return res && res.error && res.error.message === 'jwt expired';
};
