import { Component,OnInit } from '@angular/core';
import { BoostersService } from '../../../core/services/boosters.service';
import { UserDataService } from '../../../core/services/userdata.service';
import { PokedollarsService } from '../../../core/services/pokedollars.service';

import { Set } from '../../../core/models/set.model';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { card } from '../../../core/models/cards.model';
import {  of } from 'rxjs';
import * as ParamSetData from 'src/assets/param.json';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],

})

export class NavMenuComponent implements OnInit{


  Sets$!:Observable<Set[]>;
  simulatorForm:FormGroup;
  boosters$!:Observable<card[][]>;
  boosterPrice:any[]=[{'sv3pt5':22}]
  isLoading:boolean= false;

  ParamSetData!:any;
  CanPay:boolean=false;
  userdata:any={'user':'','money':0};


  constructor(private formBuilder: FormBuilder,private BoosterService: BoostersService,
    private UserDataService: UserDataService,private PokedollarsService:PokedollarsService,private socket: Socket){

    this.simulatorForm=this.formBuilder.group({
      setid: ['sv3pt5', Validators.required],
      fastOpening:[false,Validators.required],
      openingChoice:['booster',Validators.required],
      nb_boosters:[1,Validators.required],
      DisplayMode:[false,Validators.required]
    })


  }

  ngOnInit(): void {
    this.ParamSetData=ParamSetData
    this.BoosterService.getDataSets().subscribe((x:any)=>{
      this.Sets$=of(x)

      this.boosterPrice=x.reduce((acc:any, item:any) => { acc[item.id] = item.avg_price_cards;
        return acc;
      }, {});
    })

    this.refreshValue(); 
    
    this.socket.fromEvent(`value_updated`).subscribe((data: any) => {
      this.userdata = data;
      console.log(this.userdata)
     });   
  }

  refreshValue(): void {
    this.PokedollarsService.getUserData().subscribe(data => {
      this.userdata = data;   
    });
  }

  onBuyBoosters():void{  
    let y=0
    let nb_booster!:number
    let setid:any=this.simulatorForm.value.setid

    switch(this.simulatorForm.value.openingChoice) { 
    
      case "booster": { 
        nb_booster=1
        y=this.boosterPrice[setid]*this.ParamSetData[this.simulatorForm.value.setid].length
        break; 
      } 
      case "Display": { 
        nb_booster=20
        y=this.boosterPrice[setid]*this.ParamSetData[this.simulatorForm.value.setid].length*20
         break; 
      } 
      case "few_boosters": {  
        nb_booster=this.simulatorForm.value.nb_boosters   
         y=this.boosterPrice[setid]*this.ParamSetData[this.simulatorForm.value.setid].length*this.simulatorForm.value.nb_boosters
         break; 
      } 
   } 
    
    this.isLoading=true;
    this.PokedollarsService.buyboostersapi({'money':y}).subscribe(x=>{  
      if(x.money){
        this.BoosterService.getRarityCardsBySetid(this.simulatorForm.value.setid).subscribe(x=>{
          let boosters:card[][]=[]    
          let random=0;
          for(let i=0;i<nb_booster;i++){
            boosters.push([])
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
          this.boosters$=of(boosters)
          this.UserDataService.addCardToUserCollection(boosters.reduce((accumulator, value) => accumulator.concat(value), [])).subscribe(x=>{console.log(x)})
          console.log("done")
        },
        (error) => {
          console.error('Error fetching data', error);
        },
        () => {
          this.isLoading = false; // Reset the loading state after the observable completes
        }
        )

      }
      else{
        console.log('not enought money')

      }
  
  })
    
    
    };

  

    canPay():boolean{
      let setid:any=this.simulatorForm.value.setid
      switch(this.simulatorForm.value.openingChoice){
        case "booster":{
          return  this.userdata['money']>(this.boosterPrice[setid]*this.ParamSetData[setid].length)
          break;
        }
        case "Display":{
          return this.userdata['money']>(this.boosterPrice[setid]*this.ParamSetData[setid].length*20)
          break;
        }
        case "few_boosters":{
          return this.userdata['money']>(this.boosterPrice[setid]*this.ParamSetData[setid].length*this.simulatorForm.value.nb_boosters)
          break;
        }
      }
      return false   
    }
    
  


}
