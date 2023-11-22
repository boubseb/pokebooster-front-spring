import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedollarsService {
    constructor(private http: HttpClient) {}


    url="https://pkboostersapi.fr"
    //url="http://127.0.0.1:5000"


    private token!: string;


    getUserMoney(): number {
        return 0;
    }

    
    buyboostersapi(amount: any): Observable<any> {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        return this.http.post(this.url+'/buyBoosters', amount,{headers})
    }

    getUserData(): Observable<any> {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        return this.http.get(this.url+'/getUserData',{headers});
      }
    
}