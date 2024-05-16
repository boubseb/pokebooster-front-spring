import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { card } from '../models/cards.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn:'root'
})
export class UserDataService{
    constructor(private http: HttpClient) {}
    private token!: string;
    url=environment.apiUrl


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
      return this.http.get(this.url+'/User',{headers});
    }
}

