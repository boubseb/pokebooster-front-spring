import { HttpHeaders,HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PokedollarsService {
    constructor(private http: HttpClient) {}


    url=environment.apiUrl


    private token!: string;


    getUserMoney(): number {
        return 0;
    }

    
    buyboostersapi(amount: number): Observable<any> {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        const params = new HttpParams().set('money', amount);
        return this.http.post(this.url+'/buyBoosters', amount,{headers ,params})
    }

    getUserData(): Observable<any> {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        return this.http.get(this.url+'/User',{headers});
      }
    
}