import { Component, Input } from '@angular/core';
import { card } from '../../models/cards.model';
import { Observable } from 'rxjs';
import { BoostersService } from '../../services/boosters.service';

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

  constructor(private BoosterService: BoostersService){
  
  }
  
  ngOnInit(): void {
    if(this.collection){
      this.count=this.card.count
      this.card=this.card.object
      
    }

    // if(this.fastopening){
    //   this.reveal=true;
    //   this.cardPath=this.card.images.small
    // }
    // else{
    //   this.reveal=false;
    //   this.cardPath="/assets/pokemon_recto.png";
    // }

  }
  onClick():void{
      this.fastopening=!this.fastopening
  }
  
  

}
