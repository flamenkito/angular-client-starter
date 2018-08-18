import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAuth from '@app/auth/store';

import { AuthActions } from '@app/auth/store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  constructor(private readonly store: Store<fromAuth.State>) {}

  form = {
    username: 'user',
    password: 'secret'
  };

  onLogin(username: string, password: string) {
    this.store.dispatch(new AuthActions.LoginUserRequest(username, password));
  }
}
