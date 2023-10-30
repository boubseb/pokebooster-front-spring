import { Component, Input } from '@angular/core';
import { card } from '../models/cards.model';
import { Observable } from 'rxjs';
import { BoostersService } from '../services/boosters.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() Card!: card;

  cards$!: Observable<card[]>
  constructor(private BoosterService: BoostersService){
  }
  getCardsBySet(id:string):void{
    this.cards$=this.BoosterService.getCardsBySetid(id)
  }
  

}
