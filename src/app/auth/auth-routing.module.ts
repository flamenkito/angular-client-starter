import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './containers';
import { LoginPageGuard } from './guards';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginPageGuard],
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
