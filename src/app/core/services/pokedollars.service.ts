import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedollarsService {
    constructor(private http: HttpClient) {}


    //url="88.163.1.215"
    url="127.0.0.1"


    private token!: string;


    getUserMoney(): number {
        return 0;
    }

    
    buyboostersapi(amount: any): Observable<any> {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        return this.http.post('http://'+this.url+':5000/buyBoosters', amount,{headers})
    }

    getUserData(): Observable<any> {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        return this.http.get('http://'+this.url+':5000/getUserData',{headers});
      }
    
}