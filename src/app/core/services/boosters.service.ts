import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Set } from '../models/set.model';
import { card } from '../models/cards.model';


@Injectable({
  providedIn: 'root'
})
export class BoostersService {

  headers!:HttpHeaders;

      url="https://pkboostersapi.fr"
      //url="http://127.0.0.1:5000"

  constructor(private http: HttpClient) {
  }

    getDataSets(): Observable<Set[]>{
      return this.http.get<Set[]>(this.url+'/getDataSets')         
    }


    getCardsBySetid(id :string): Observable<any>{    
      return this.http.get<card[]>(this.url+'/getDataCards/'+id).pipe(tap((results:any) => {
        results.sort((a:any, b:any)=> {
          return a.number - b.number;}
    )}
    ))
    }

    getRarityCardsBySetid(id :string): Observable<any>{ 
        return this.http.get<card[]>(this.url+'/getDataCards/'+id).pipe(map(e => e.reduce(
          (res:any, card:any)=>{
            if(!res[card.rarity]){
              res[card.rarity]=[]}
            res[card.rarity].push(card);
            return res;},{}
        )))
    }
   



}