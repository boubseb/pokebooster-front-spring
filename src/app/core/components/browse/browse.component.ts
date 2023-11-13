import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoostersService } from '../../services/boosters.service';
import { Observable } from 'rxjs';
import { Set } from '../../../core/models/set.model';
import { card } from '../../../core/models/cards.model';
import {  of } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent {


  BrowseForm!:FormGroup;
  Sets$!:Observable<Set[]>;
  boosters$!:Observable<card[][]>;
  fastopening:Boolean=true;
  setRarities!:string[]
  setDisplayRarities:string[]=['all']
  isLoading:boolean=false;

  constructor(private formBuilder: FormBuilder,private BoosterService: BoostersService){

    this.BrowseForm=this.formBuilder.group({
      setid: ['sv3pt5', Validators.required],
      DisplayMode:[false,Validators.required]
      });

    }

    

  ngOnInit(): void {

    this.Sets$=this.BoosterService.getAllBoosters()
    this.onDisplaySet()
  }
  onDisplaySet():void{  
    this.isLoading=true;

    
      this.BoosterService.getCardsBySetid(this.BrowseForm.value.setid).subscribe(x=>{
      //console.log(x)
      this.setRarities=x.map((card:any) => card.rarity).filter((value:any, index:any, array:any) => array.indexOf(value) === index);
      this.setDisplayRarities=this.setRarities
      this.boosters$=of([x])
      this.isLoading=false;
      
    });
    

}

onfilterSet(rarity:string):void{
  if (this.setDisplayRarities.includes(rarity)) {
    this.setDisplayRarities=this.setDisplayRarities.filter(value => value !== rarity);
  }
  else{
    this.setDisplayRarities.push(rarity)
  }

}

selectAll():void{
  if(this.setDisplayRarities.length===0){
    this.setDisplayRarities=this.setRarities
  }
  else{
    this.setDisplayRarities=[]
  }

}

isItemSelected(item: string): boolean {
  return this.setDisplayRarities.includes(item);
}
}
