import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import { FooterActions } from '@app/core/store/actions';
import { PouchService } from '@app/auth/services';
import { PouchActions } from '@app/auth/store/actions';

import { getError } from '@app/shared/get-error';

@Injectable()
export class PouchEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly pouchService: PouchService
  ) {}

  @Effect()
  setup$ = this.actions$.pipe(
    ofType<PouchActions.Setup>(PouchActions.SETUP),
    switchMap(({ remoteDbOptions }) => {
      return this.pouchService.setupRemote(remoteDbOptions);
    })
  );

  @Effect()
  docs$ = this.actions$.pipe(
    ofType<PouchActions.Paused>(PouchActions.PAUSED),
    switchMap(() => {
      return this.pouchService.getDocs();
    })
  );

  @Effect()
  updateOne$ = this.actions$.pipe(
    ofType<PouchActions.UpdateOne>(PouchActions.UPDATE_ONE),
    switchMap(({update}) => {
      return this.pouchService.updateOne(update);
    })
  );

  @Effect()
  operationFailure$ = this.actions$.pipe(
    ofType<PouchActions.OperationFailure>(PouchActions.OPERATION_FAILURE),
    map(action => {
      const message = getError(action.error);
      return new FooterActions.Popup(message);
    })
  );
}
