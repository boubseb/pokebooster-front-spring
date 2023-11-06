import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardComponent } from './components/card/card.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import {MatInputModule} from '@angular/material/input';
// import {MatMenuModule } from '@angular/material/menu';
// import {MatButtonModule } from '@angular/material/button';
// import {MatIconModule } from '@angular/material/icon';
import {MatSelectModule } from '@angular/material/select';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
 
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { OpenBoostersRoutingModule } from './open-boosters-routing.module';

@NgModule({
  declarations: [
    NavMenuComponent,
    CardListComponent,
    CardComponent
  ],
  imports: [
    OpenBoostersRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSelectModule,
    CarouselModule.forRoot(),
    
  ],
  exports:[
    NavMenuComponent,
    CardListComponent,
    CardComponent
  ]
})
export class OpenBoostersModule { }