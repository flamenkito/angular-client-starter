import { TokenModel } from './token.model';
import { RemoteDbOptions } from './remote-db';

export interface LoginResponse {
  token: TokenModel;
  remoteDbOptions: RemoteDbOptions;
}
