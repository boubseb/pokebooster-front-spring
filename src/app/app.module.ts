import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainPageComponent } from './main-page/main-page.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';


import { HttpClientModule } from '@angular/common/http';


import {MatInputModule} from '@angular/material/input';
import {MatMenuModule } from '@angular/material/menu';
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule } from '@angular/material/icon';
import {MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavMenuComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatMenuModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
