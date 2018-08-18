import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserRoutingModule } from './user-routing.module';

import { containers } from './containers';
import { components } from './components';
import { guards } from './guards';
import { services } from './services';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [...containers, ...components],
  exports: [...containers, ...components]
})
export class UserModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootUserModule,
      providers: [...guards, ...services]
    };
  }
}

@NgModule({
  imports: [UserModule, UserRoutingModule]
})
export class RootUserModule {}
