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
  collection!:card[];
  setRarities!:string[]
  setDisplayRarities:string[]=['all']

  constructor(private formBuilder: FormBuilder,private BoosterService: BoostersService,private UserDataService: UserDataService){

    this.CollectionForm=this.formBuilder.group({
      setid: ['sv3pt5', Validators.required],
      DisplayMode:[false,Validators.required]
      });

    }


  onDisplaySet():void{  

    if(this.CollectionForm.value.setid!='all'){
      this.boosters=this.collection.filter((card:any) => card.object.set.id === this.CollectionForm.value.setid).sort((a:any, b:any)=> {
        return a.object.number - b.object.number;})
      
      } 
    else{
      this.boosters=this.collection.sort((a:any, b:any) => a.object.set.id.localeCompare(b.object.set.id))
    }

    this.setRarities=this.boosters.map((card:any) => card.object.rarity).filter((value, index, array) => array.indexOf(value) === index);
    this.setDisplayRarities=this.setRarities
    this.boosters$=of([this.boosters]);
         

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
      this.Sets$=this.BoosterService.getAllBoosters()
      this.UserDataService.getUserCollection().subscribe(x=>{
        this.collection=x
        console.log(x)
        this.onDisplaySet()
        
      })
  }


}
