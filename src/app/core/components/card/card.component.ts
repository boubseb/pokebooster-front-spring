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
  @Input() card!: card;
  @Input() fastopening!:Boolean;

  reveal!:Boolean;
  cardPath!:string;

  constructor(private BoosterService: BoostersService){
  
  }
  
  ngOnInit(): void {
    if(this.fastopening){
      this.reveal=true;
      this.cardPath=this.card.images.small
    }
    else{
      this.reveal=false;
      this.cardPath="/assets/pokemon_recto.png";
    }
  }
  onClick():void{
      console.log("click")
      if(this.reveal==false){
        this.reveal=true;
        this.cardPath=this.card.images.small
      }
      else{
        this.reveal=false;
        this.cardPath='/assets/pokemon_recto.png'
      }


  }
  
  

}
