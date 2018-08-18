import { Component, ChangeDetectionStrategy } from '@angular/core';

import * as fromAuth from '@app/auth/store';
import { Store } from '@ngrx/store';
import { AuthActions } from '@app/auth/store';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent {
  alerts = [];

  constructor(private readonly store: Store<fromAuth.State>) {
    for (let i = 0; i++ < 100; ) {
      this.alerts.push({ text: `Item #${i}` });
    }
  }

  onLogout() {
    this.store.dispatch(new AuthActions.LogoutUserRequest());
  }
}
