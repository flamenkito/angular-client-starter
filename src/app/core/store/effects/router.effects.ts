import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs/operators';

import { RouterActions } from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class RouterEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router
  ) {}

  @Effect({ dispatch: false })
  loginUserSuccess$ = this.actions$.pipe(
    ofType<RouterActions.Navigate>(RouterActions.NAVIGATE),
    tap(action => this.router.navigate(action.paths))
  );
}
