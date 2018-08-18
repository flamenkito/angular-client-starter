import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';

import { containers } from './containers';
import { components } from './components';
import { guards } from './guards';
import { services } from './services';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/auth/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [...containers, ...components],
  exports: [...containers, ...components]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [...guards, ...services]
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects),
    AuthRoutingModule
  ]
})
export class RootAuthModule {}
