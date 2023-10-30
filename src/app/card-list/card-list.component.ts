import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Set } from '../models/set.model';
import { card } from '../models/cards.model';
import { BoostersService } from '../services/boosters.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {


  @Input() cards$!: Observable<card[]>;

  constructor(private BoosterService: BoostersService){
  }


  ngOnInit(): void {
    
  }
 

}
