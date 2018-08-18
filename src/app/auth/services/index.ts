import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

export const services = [AuthService, LocalStorageService];

export * from './auth.service';
export * from './local-storage.service';
