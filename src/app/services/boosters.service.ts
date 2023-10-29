import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BoosterList } from '../models/boosterList.model';
import { Booster } from '../models/Booster.model';
import { cardList } from '../models/cardList.model';
import { card } from '../models/cards.model';

@Injectable({
  providedIn: 'root'
})
export class BoostersService {
  constructor(private http: HttpClient) {}

    getAllBoosters(): Observable<Booster[]>{
            return this.http.get<BoosterList>('https://api.pokemontcg.io/v2/sets').pipe(map(e => e.data))         
    }

    getCardsBySetid(id :string): Observable<card[]>{
        return this.http.get<cardList>('https://api.pokemontcg.io/v2/cards?q=set.id:'+id).pipe(map(e => e.data))
    }



}