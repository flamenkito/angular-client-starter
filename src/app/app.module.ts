import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';

// root component
import { AppComponent } from './core/containers';

@NgModule({
  imports: [
    BrowserModule,
    AuthModule.forRoot(),
    CoreModule.forRoot(),
    UserModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
