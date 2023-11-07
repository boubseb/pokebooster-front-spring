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
    url="127.0.0.1"


    addCardToUserCollection(cards:card[]) :Observable<any> {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        return this.http.put('http://'+this.url+':5000/addCardToUserCollection',{headers})
      }



    getUserCollection() :Observable<any> {
      const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
      return this.http.post('http://'+this.url+':5000/test',{headers}).pipe(map((information)=>{
          return information;
        }));
    }
}

