import { Component,OnInit } from '@angular/core';
import { BoostersService } from '../services/boosters.service';
import { Set } from '../models/set.model';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { card } from '../models/cards.model';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],

})

export class NavMenuComponent implements OnInit{


  Sets$!:Observable<Set[]>;
  simulatorForm:FormGroup | any;
  cards$!: Observable<card[]>;
  cards!:any;
  cardsListForDislay!:any;
  display!:card[][];

  constructor(private formBuilder: FormBuilder,private BoosterService: BoostersService){

    this.simulatorForm=this.formBuilder.group({
      setid: ['sv3pt5', Validators.required],})


  }

  ngOnInit(): void {
    this.Sets$=this.BoosterService.getAllBoosters()
    for(let booster in this.Sets$){
      
    }
    
  }
  onClick():void{
    let rarity;
    
    this.cards$=this.BoosterService.getCardsBySetid(this.simulatorForm.value.setid) ;
    this.cards$.subscribe(x=>{this.cards=x})
    console.log(this.cards['Common'])
    this.cardsListForDislay=this.cards
    console.log(this.cardsListForDislay)
    //rarity=this.cards$.subscribe(x=>{x.map(y=>{y.rarity;console.log(y.rarity)})});
    // this.cards$.subscribe((x:card[])=>{     
    //    console.log(x)
    //    }
    //   )
      
    };
    
  


}
