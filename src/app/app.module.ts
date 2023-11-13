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
import {MatButtonModule} from '@angular/material/button';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };


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
    BrowserAnimationsModule,
    MatButtonModule,
    SocketIoModule.forRoot(config),
    
  ],
  providers: [{provide: LOCALE_ID,useValue: 'fr-FR'},
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
