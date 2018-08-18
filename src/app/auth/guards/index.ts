import { AuthGuard } from './auth.guard';
import { LoginPageGuard } from './login-page.guard';

export const guards = [AuthGuard, LoginPageGuard];

export * from './auth.guard';
export * from './login-page.guard';
