import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { PouchService } from './pouch.service';

export const services = [AuthService, LocalStorageService, PouchService];

export * from './auth.service';
export * from './local-storage.service';
export * from './pouch.service';
