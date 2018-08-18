import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenModel } from '../models';
import { HttpClient } from '@angular/common/http';

const API = (...paths: string[]) => {
  return ['http://localhost:3000/auth'].concat(paths).join('/');
};

@Injectable()
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  logIn(username: string, password: string): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(API('login'), {
      username,
      password
    });
  }

  logOut(username?: string): Observable<void> {
    return this.httpClient.post<void>(API('logout'), {
      username
    });
  }
}
