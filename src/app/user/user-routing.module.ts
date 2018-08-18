import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

import { AuthGuard } from '@app/auth/guards';

const routes: Routes = [
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: fromContainers.UserPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
