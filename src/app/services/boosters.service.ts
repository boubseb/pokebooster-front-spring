import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BoosterList } from '../models/boosterList.model';

@Injectable({
  providedIn: 'root'
})
export class BoostersService {
  constructor(private http: HttpClient) {}

    getAllBoosters(): Observable<BoosterList[]>{
            return this.http.get<BoosterList[]>('https://api.pokemontcg.io/v2/sets')
    }



}