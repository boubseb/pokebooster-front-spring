import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../core/services/userdata.service';
import { Observable, of } from 'rxjs';
import { card } from '../core/models/cards.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit{

  boosters$!:Observable<card[][]>
  constructor(private UserDataService: UserDataService){}

  ngOnInit(): void {
       this.UserDataService.getUserCollection().subscribe(x=>{this.boosters$=of([x])})
  }
}
