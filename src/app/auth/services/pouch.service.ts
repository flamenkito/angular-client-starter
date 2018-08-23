import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Observer, of, from } from 'rxjs';

import PouchDB from 'pouchdb';
import PouchDBAuthentication from 'pouchdb-authentication';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBAuthentication);
PouchDB.plugin(PouchDBFind);

import { RemoteDbOptions } from '@app/auth/models';
import {
  switchMap,
  takeUntil,
  catchError,
  map,
  tap,
  share
} from 'rxjs/operators';
import { PouchActions } from '@app/auth/store/actions';

const LOCAL_DB = 'localDb';

@Injectable()
export class PouchService implements OnDestroy {
  private destroy$ = new Subject<void>();

  private localDb: PouchDB.Database;

  constructor() {
    this.localDb = new PouchDB(LOCAL_DB);
    this.localDb.createIndex({ index: { fields: ['type'] } });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getEvents(
    remoteDB: PouchDB.Database
  ): Observable<PouchActions.Types> {
    return Observable.create((observer: Observer<PouchActions.Types>) => {
      const sync = this.localDb
        .sync(remoteDB, {
          live: true,
          retry: true
        })
        .on('change', payload =>
          observer.next(new PouchActions.Change(payload))
        )
        .on('paused', payload =>
          observer.next(new PouchActions.Paused(payload))
        )
        .on('active', () => observer.next(new PouchActions.Active()))
        .on('denied', payload =>
          observer.next(new PouchActions.Denied(payload))
        )
        .on('complete', payload =>
          observer.next(new PouchActions.Complete(payload))
        )
        .on('error', payload => observer.next(new PouchActions.Error(payload)));

      return () => {
        sync.cancel();
      };
    });
  }

  private logIn(
    remoteDbOptions: RemoteDbOptions
  ): Observable<PouchDB.Authentication.LoginResponse> {
    const { host, name, pass } = remoteDbOptions;

    const ajaxOpts = {
      ajax: {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(name + ':' + pass).toString('base64')
        }
      }
    };

    return Observable.create((observer: Observer<PouchDB.Database>) => {
      const remoteDB = new PouchDB(host.replace('://', `://${name}:${pass}@`), {
        skip_setup: false
      });
      remoteDB
        .logIn(name, pass, ajaxOpts)
        .then((res: PouchDB.Authentication.LoginResponse) => {
          observer.next(remoteDB);
          observer.complete();
        })
        .catch((err: any) => {
          observer.error(err);
        });
      return () => {
        remoteDB.logOut();
      };
    });
  }

  setupRemote(
    remoteDbOptions: RemoteDbOptions
  ): Observable<PouchActions.Types> {
    return this.logIn(remoteDbOptions).pipe(
      switchMap(
        (remoteDB: PouchDB.Database): Observable<PouchActions.Types> => {
          return this.getEvents(remoteDB);
        }
      ),
      catchError(err => of(new PouchActions.OperationFailure(err))),
      takeUntil(this.destroy$)
    );
  }

  getDocs(): Observable<PouchActions.Types> {
    return from(this.localDb.find({ selector: { type: 'doc' } })).pipe(
      map((res: PouchDB.Find.FindResponse<{}>) => {
        return new PouchActions.Docs(res.docs);
      }),
      catchError(err => of(new PouchActions.OperationFailure(err)))
      // share()
    );
  }

  updateOne(update: any): Observable<PouchActions.Types> {
    return from(this.localDb.put(update)).pipe(
      map((res: PouchDB.Core.Response) => {
        return new PouchActions.OperationSuccess(res);
      }),
      catchError(err => of(new PouchActions.OperationFailure(err)))
    );
  }
}
