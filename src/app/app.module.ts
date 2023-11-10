import {NgModule,LOCALE_ID } from '@angular/core';
import { registerLocaleData} from "@angular/common";
import * as fr from '@angular/common/locales/fr'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { httpInterceptorProviders } from './core/interceptors';


@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    CoreModule,
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    BrowserAnimationsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    httpInterceptorProviders
],
  bootstrap: [AppComponent],

})
export class AppModule { 
  constructor(){
    registerLocaleData(fr.default);
  }
}
