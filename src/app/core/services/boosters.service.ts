import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, reduce, groupBy, filter, tap } from 'rxjs/operators';
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
  }

    getAllBoosters(): Observable<Set[]>{
      const filters:string[]=    
      ['basep', 'si1', 'np', 'dpp', 'ru1', 'hsp', 'bwp', 'mcd11', 'mcd12', 'xyp', 'xy0', 'mcd16', 'smp', 'mcd19', 'swshp', 'mcd14', 'mcd15', 'mcd18', 'mcd17', 'mcd21', 'bp', 'fut20', 'tk1a', 'tk1b', 'tk2a', 'tk2b', 'mcd22', 'svp', 'sve']
            return this.http.get<SetList>('https://api.pokemontcg.io/v2/sets').pipe(map((e:any) => e.data.filter((i:any) => !filters.includes(i.id))))         
    }

    getBoosterPrice(id:string):Observable<any>{
      return this.http.get<SetList>('https://api.pokemontcg.io/v2/cards?q=set.id:'+id).pipe(map((e:any) => {return e.data.map((card:any)=>{return card.cardmarket.prices.lowPrice}).reduce((acc:any, amount:any) => acc + amount)/e.count}))
    }

    getCardsBySetid(id :string): Observable<any>{    
      return this.http.get<SetList>('https://api.pokemontcg.io/v2/cards?q=set.id:'+id).pipe(map(e => e.data),tap(results => {
        results.sort((a:any, b:any)=> {
          return a.number - b.number;}
    )}
    ))
    }

    getRarityCardsBySetid(id :string): Observable<any>{ 
        return this.http.get<SetList>('https://api.pokemontcg.io/v2/cards?q=set.id:'+id).pipe(map(e => e.data.reduce(
          (res:any, card:any)=>{
            if(!res[card.rarity]){
              res[card.rarity]=[]}
            res[card.rarity].push(card);
            return res;},{}
        )))
    }
   



}