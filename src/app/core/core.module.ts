import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { components } from './components';
import { containers } from './containers';
import { reducers, effects, metaReducers } from './store';
import { interceptors } from './interceptors';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects)
  ],
  declarations: [...components, ...containers],
  exports: [...components, ...containers]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    private readonly parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded in AppModule');
    }
  }

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [...interceptors]
    };
  }
}
