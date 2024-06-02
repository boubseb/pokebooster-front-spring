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
//import { Socket } from 'ngx-socket-io';

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
    private UserDataService: UserDataService,private PokedollarsService:PokedollarsService){

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
    
    // this.socket.fromEvent(`value_updated`).subscribe((data: any) => {
    //   this.userdata = data;
    //   console.log(this.userdata)
    //  });   
  }

  refreshValue(): void {
    this.PokedollarsService.getUserData().subscribe(data => {
      this.userdata = data;   
    });
  }

  onBuyBoosters():void{  
    let price=0
    let nb_booster!:number
    let setid:any=this.simulatorForm.value.setid

    switch(this.simulatorForm.value.openingChoice) { 
    
      case "booster": { 
        nb_booster=1
        price=this.boosterPrice[setid]
        break; 
      } 
      case "Display": { 
        nb_booster=20
        price=this.boosterPrice[setid]*20
         break; 
      } 
      case "few_boosters": {  
        nb_booster=this.simulatorForm.value.nb_boosters   
         price=this.boosterPrice[setid]*this.simulatorForm.value.nb_boosters
         break; 
      } 
   } 
    console.log(price)
    this.isLoading=true;
    this.PokedollarsService.buyboostersapi(nb_booster,setid).subscribe(x=>{  
      console.log(x)
      this.boosters$=of(x)
      this.isLoading=false
      this.PokedollarsService.getUserData().subscribe(x=> {
        console.log(x)
        this.PokedollarsService.updatePokedollars(x)}
      )
    })


  }
  

  

    canPay():boolean{
      let setid:any=this.simulatorForm.value.setid
      switch(this.simulatorForm.value.openingChoice){
        case "booster":{
          return  this.userdata['pokedollars']>(this.boosterPrice[setid])
          break;
        }
        case "Display":{
          return this.userdata['pokedollars']>(this.boosterPrice[setid]*20)
          break;
        }
        case "few_boosters":{
          return this.userdata['pokedollars']>(this.boosterPrice[setid]*this.simulatorForm.value.nb_boosters)
          break;
        }
      }
      return false   
    }
    
  


}
