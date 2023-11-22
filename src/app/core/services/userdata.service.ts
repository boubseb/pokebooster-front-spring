import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { card } from '../models/cards.model';

@Injectable({
    providedIn:'root'
})
export class UserDataService{
    constructor(private http: HttpClient) {}
    private token!: string;
    url="https://pkboostersapi.fr"
    //url="http://127.0.0.1:5000"


    addCardToUserCollection(cards:card[]) :Observable<any> {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        return this.http.put(this.url+'/addCardToUserCollection',cards,{headers})
      }



    getUserCollection() :Observable<any> {
      const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
      return this.http.get(this.url+'/UserCollection',{headers}).pipe(map((information)=>{
          return information;
        }));
    }


    
    getUserData(): Observable<any> {
      const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
      return this.http.get(this.url+'/getUserData',{headers});
    }
}

