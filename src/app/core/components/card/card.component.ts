import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: any;
  @Input() fastopening!:Boolean;
  @Input() filterList!:string[];
  @Input() collection ?:Boolean;
  @Input() DisplayMode ?:Boolean;

  reveal!:Boolean;
  cardPath!:string;
  count?:number;



  constructor(){
  
  }
  
  onClick():void{
      if(this.filterList===undefined){
        this.fastopening=!this.fastopening
      }
      
  }
  
  

}
