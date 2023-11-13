import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowseComponent } from './components/browse/browse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CollectionComponent } from './components/collection/collection.component';
import {MatButtonModule} from '@angular/material/button';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    declarations: [
        HeaderComponent,
        BrowseComponent,
        CardComponent,
        CardListComponent,
        CollectionComponent,
        UserProfilComponent

    ],
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatToolbarModule,
        MatSelectModule,
        MatSlideToggleModule,
        CarouselModule.forRoot(),
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule
        
    ],
    exports: [
      HeaderComponent,
      CardComponent,
      CardListComponent,
      CollectionComponent
  ]
})
export class CoreModule { }
