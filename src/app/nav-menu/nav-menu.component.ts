import { Component,OnInit } from '@angular/core';
import { BoostersService } from '../services/boosters.service';
import { Booster } from '../models/Booster.model';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { card } from '../models/cards.model';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],

})

export class NavMenuComponent implements OnInit{


  Boosters$!:Observable<Booster[]>;
  simulatorForm:FormGroup | any;
  cards$!: Observable<card[]>


  constructor(private formBuilder: FormBuilder,private BoosterService: BoostersService){
    this.simulatorForm=this.formBuilder.group({
      boosterset: ['omnihexa', Validators.required],})


  }

  ngOnInit(): void {
    this.Boosters$=this.BoosterService.getAllBoosters()
    
  }
  onClick():void{
    this.BoosterService.getAllBoosters().subscribe(val => console.log(val))
  }

  getCardsBySet(id:string):void{
    this.cards$=this.BoosterService.getCardsBySetid(id)
  }



}
