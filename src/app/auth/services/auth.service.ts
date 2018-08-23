import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginResponse } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

const API = (...paths: string[]) => {
  return [environment.api].concat(paths).join('/');
};

@Injectable()
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  logIn(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(API('login'), {
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
