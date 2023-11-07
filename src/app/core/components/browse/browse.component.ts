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

  constructor(private formBuilder: FormBuilder,private BoosterService: BoostersService){

    this.BrowseForm=this.formBuilder.group({
      setid: ['sv3pt5', Validators.required],
      DisplayMode:[false,Validators.required]
      });

    }

  ngOnInit(): void {

 


    this.Sets$=this.BoosterService.getAllBoosters()

  
    
  }
  onDisplaySet():void{  

    
  this.BoosterService.getCardsBySetid(this.BrowseForm.value.setid).subscribe(x=>{
      //console.log(x)
      this.boosters$=of([x])
      
    });
    

}
}
