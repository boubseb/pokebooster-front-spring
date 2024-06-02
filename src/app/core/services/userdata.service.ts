import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
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




    getUserCollection(set_id:string) :Observable<any> {
      const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
      const params = new HttpParams().set('set_id', set_id)
      return this.http.get(this.url+'/Collection',{headers,params})
    }


    
    getUserData(): Observable<any> {
      const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
      return this.http.get(this.url+'/User',{headers});
    }
}

