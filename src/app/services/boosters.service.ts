import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, reduce, groupBy, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SetList } from '../models/SetList.model';
import { Set } from '../models/set.model';
import { cardList } from '../models/cardList.model';
import { card } from '../models/cards.model';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class BoostersService {

  headers!:HttpHeaders;

  constructor(private http: HttpClient) {
    const headers = new HttpHeaders({"X-Api-Key":"6ef86c9f-633b-4411-a6cd-1d8b01533a46"})
  }

    getAllBoosters(): Observable<Set[]>{
            return this.http.get<SetList>('https://api.pokemontcg.io/v2/sets',{headers:this.headers}).pipe(map(e => e.data))         
    }

    getBoosterPrice(id:string):Observable<any>{
      return this.http.get<SetList>('https://api.pokemontcg.io/v2/cards?q=set.id:'+id,{headers:this.headers}).pipe(map((e:any) => {return e.data.map((card:any)=>{return card.cardmarket.prices.lowPrice}).reduce((acc:any, amount:any) => acc + amount)/e.count}))
    }

    getCardsBySetid(id :string): Observable<any>{
        
        return this.http.get<SetList>('https://api.pokemontcg.io/v2/cards?q=set.id:'+id,{headers:this.headers}).pipe(map(e => e.data.reduce(
          (res:any, card:any)=>{
            if(!res[card.rarity]){
              res[card.rarity]=[]}
            res[card.rarity].push(card);
            return res;},{}
        )))
    }
   



}