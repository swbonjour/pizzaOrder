import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppAuthComponent } from './components/app-auth/app-auth.component';
import { AppLogoComponent } from './components/app-logo/app-logo.component';
import { AppLoginComponent } from './components/app-auth/app-login/app-login.component';
import { AppRegisterComponent } from './components/app-auth/app-register/app-register.component';
import { AppListComponent } from './components/app-list/app-list.component';
import { AppListItemComponent } from './components/app-list/list-item/app-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AppAuthComponent,
    AppLogoComponent,
    AppLoginComponent,
    AppRegisterComponent,
    AppListComponent,
    AppListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
