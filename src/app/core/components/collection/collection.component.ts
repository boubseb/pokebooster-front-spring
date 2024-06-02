import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/userdata.service';
import { Observable, of } from 'rxjs';
import { card } from '../../models/cards.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoostersService } from '../../services/boosters.service';
import { Set } from '../../../core/models/set.model';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit{

  boosters$!:Observable<card[][]>
  CollectionForm!:FormGroup;
  Sets$!:Observable<Set[]>;
  fastopening:Boolean=true;
  boosters!:card[];
  collections!:card[];
  setRarities!:string[]
  setDisplayRarities:string[]=['all']

  constructor(private formBuilder: FormBuilder,private BoosterService: BoostersService,private UserDataService: UserDataService){

    this.CollectionForm=this.formBuilder.group({
      setid: ['all', Validators.required],
      DisplayMode:[false,Validators.required]
      });

    }


  onDisplaySet():void{  

    this.UserDataService.getUserCollection(this.CollectionForm.value.setid).subscribe(x=>{
      this.collections=x


      if(this.CollectionForm.value.setid!='all'){
        this.collections=this.collections.sort((a:any, b:any)=> {
          return a.number - b.number;})
        
        } 
      else{
        this.collections=this.collections.sort((a:any, b:any) => a.pokeSetId.localeCompare(b.pokeSetId))
      }
  
      this.setRarities=this.collections.map((collection:any) => collection.card.rarity).filter((value, index, array) => array.indexOf(value) === index);
      this.setDisplayRarities=this.setRarities
      this.boosters$=of([this.collections]);
      console.log(this.boosters$)
      
    })


         

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

  ngOnInit(): void {
    this.Sets$=this.BoosterService.getDataSets()
  }

  isItemSelected(item: string): boolean {
    return this.setDisplayRarities.includes(item);
  }


}
