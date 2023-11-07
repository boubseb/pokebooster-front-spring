import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Set } from '../../models/set.model';
import { card } from '../../models/cards.model';
import { BoostersService } from '../../services/boosters.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {


  @Input() cards$!: Observable<card[]>;
  @Input() boosters$!:Observable<card[][]>;
  @Input() fastOpening!:Boolean;
  @Input() DisplayMode!:Boolean;
  mobile!:Boolean;

  constructor(private BoosterService: BoostersService){
  }


  ngOnInit(): void {

    if (window.screen.width <= 1000) { // 768px portrait
      this.mobile = true;
    }
    
  }
 

}
