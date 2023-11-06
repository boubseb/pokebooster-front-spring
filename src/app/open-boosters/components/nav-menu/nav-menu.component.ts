import { Component,OnInit } from '@angular/core';
import { BoostersService } from '../../../core/services/boosters.service';
import { Set } from '../../../core/models/set.model';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { card } from '../../../core/models/cards.model';
import {  of } from 'rxjs';
import * as ParamSetData from 'src/assets/param.json';

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
  ParamSetData!:any;


  constructor(private formBuilder: FormBuilder,private BoosterService: BoostersService){

    this.simulatorForm=this.formBuilder.group({
      setid: ['sv3pt5', Validators.required],
      fastOpening:[false,Validators.required],
      openingChoice:['booster',Validators.required],
      nb_boosters:['1',Validators.required],
      DisplayMode:[false,Validators.required]})


  }
  sets=[
     "xy9",]

  ngOnInit(): void {

 

    this.ParamSetData=ParamSetData
    this.Sets$=this.BoosterService.getAllBoosters()
    // for(let setid of this.sets){
    //   this.BoosterService.getCardsBySetid(setid).subscribe(x=>{
    //     console.log(setid)
    //     console.log(Object.keys(x))})
    // }
  
    
  }
  onClick():void{    
    this.BoosterService.getBoosterPrice(this.simulatorForm.value.setid).subscribe(x=>{
      console.log(x)
      
    })
    
  this.BoosterService.getCardsBySetid(this.simulatorForm.value.setid).subscribe(x=>{
      //console.log(x)
      this.boosters$=of([])
      let boosters:card[][]=[]
      let nb_booster:number=0;
   
      switch(this.simulatorForm.value.openingChoice) { 
        case "booster": { 
          nb_booster=1;
          break; 
        } 
        case "Display": { 
           nb_booster=20;
           break; 
        } 
        case "few_boosters": { 
           nb_booster=this.simulatorForm.value.nb_boosters
           break; 
        } 
     } 
      let random=0;
      for(let i=0;i<nb_booster;i++){
        boosters.push([])
        this.boosters$=of(boosters)
        for(let j=0;j<this.ParamSetData[this.simulatorForm.value.setid].length;j++){
          random=Math.random()*100
          for(let k=0;k<this.ParamSetData[this.simulatorForm.value.setid][j].length;k++){    
              let pourcentage=this.ParamSetData[this.simulatorForm.value.setid][j][k].pourcentage
              if(pourcentage[0]<random && random<pourcentage[1]){
                let Rarity=this.ParamSetData[this.simulatorForm.value.setid][j][k]['Rarity']
                let card = x[Rarity][Math.floor(Math.random()*x[Rarity].length)]
                boosters[i].push(card)
              }
          }
          
        }
      };
      //this.cards$=of(common)
      this.boosters$=of(boosters)
    }) ;
    //rarity=this.cards$.subscribe(x=>{x.map(y=>{y.rarity;console.log(y.rarity)})});
    // this.cards$.subscribe((x:card[])=>{     
    //    console.log(x)
    //    }
    //   )
      
    };
    
  


}
