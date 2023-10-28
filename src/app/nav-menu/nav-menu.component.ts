import { Component,OnInit } from '@angular/core';
import { BoostersService } from '../services/boosters.service';
import { BoosterList } from '../models/boosterList.model';
import { Booster } from '../models/Booster.model';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],

})

export class NavMenuComponent implements OnInit{
  ListBoosters$!:Observable<BoosterList[]>;
  //Boosters$!:Observable<Booster>;
  constructor(private BoosterService: BoostersService){}

  ngOnInit(): void {
    this.ListBoosters$=this.BoosterService.getAllBoosters()
    
  }
  onClick():void{
    this.ListBoosters$=this.BoosterService.getAllBoosters()
    console.log(this.ListBoosters$)
  }



}
