import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPostComponent } from './components/list-post/list-post.component';
import { PostComponent } from './components/post/post.component';



@NgModule({
  declarations: [
    ListPostComponent,
    PostComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TradeModule { }
