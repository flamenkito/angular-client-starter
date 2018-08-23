import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromAuth from '@app/auth/store';
import { Store } from '@ngrx/store';
import { AuthActions, PouchActions } from '@app/auth/store';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent {
  docs$: Observable<any[]>;

  constructor(private readonly store: Store<fromAuth.State>) {
    this.docs$ = store.select(fromAuth.selectDocs);
  }

  onSelectDoc(doc: any) {
    const name = prompt('Update todo name', doc.name);
    if (name !== null) {
      this.store.dispatch(
        new PouchActions.UpdateOne({
          ...doc,
          name
        })
      );
   }
  }

  onLogout() {
    this.store.dispatch(new AuthActions.LogoutUserRequest());
  }
}
