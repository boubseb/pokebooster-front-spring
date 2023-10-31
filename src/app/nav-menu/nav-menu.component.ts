import { Component,OnInit } from '@angular/core';
import { BoostersService } from '../services/boosters.service';
import { Set } from '../models/set.model';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { card } from '../models/cards.model';
import { forkJoin, of } from 'rxjs';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],

})

export class NavMenuComponent implements OnInit{


  Sets$!:Observable<Set[]>;
  simulatorForm:FormGroup | any;
  cards$!: Observable<card[]>;
  boosters$!:Observable<card[][]>;
  cards!:any;
  cardsListForDislay!:any;
  display!:card[][];

  constructor(private formBuilder: FormBuilder,private BoosterService: BoostersService){

    this.simulatorForm=this.formBuilder.group({
      setid: ['sv3pt5', Validators.required],
      fastOpening:[true,Validators.required]})


  }

  ngOnInit(): void {
    this.Sets$=this.BoosterService.getAllBoosters()
    for(let booster in this.Sets$){
      
    }
    
  }
  onClick():void{    
    console.log(this.simulatorForm.value.fastOpening)
  this.BoosterService.getCardsBySetid(this.simulatorForm.value.setid).subscribe(x=>{
      console.log(x)
      let common=[];
      let uc=[];
      for(let i=0;i<80;i++){
        common.push(x.Common[Math.floor(Math.random()*x.Common.length)]);
        if(i<60){
          uc.push(x.Uncommon[Math.floor(Math.random()*x.Uncommon.length)])
        }
      };
      this.cards$=of(common)
      this.boosters$=of([common,uc])
    }) ;
    //rarity=this.cards$.subscribe(x=>{x.map(y=>{y.rarity;console.log(y.rarity)})});
    // this.cards$.subscribe((x:card[])=>{     
    //    console.log(x)
    //    }
    //   )
      
    };
    
  


}
