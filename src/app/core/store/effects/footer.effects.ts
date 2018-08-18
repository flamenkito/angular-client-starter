import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { delay, switchMap } from 'rxjs/operators';

import { FooterActions } from '../actions';
import { of, merge } from 'rxjs';

@Injectable()
export class FooterEffects {
  constructor(private readonly actions$: Actions) {}

  @Effect()
  popup$ = this.actions$.pipe(
    ofType<FooterActions.Popup>(FooterActions.POPUP),
    switchMap(action =>
      merge(
        of(new FooterActions.Show(action.message)),
        of(new FooterActions.Hide()).pipe(delay(action.delay))
      )
    )
  );
}
