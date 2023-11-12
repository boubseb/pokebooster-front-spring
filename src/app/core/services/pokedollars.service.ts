import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedollarsService {
    constructor(private http: HttpClient) {}


    url="88.163.1.215"
    //url="127.0.0.1"
    private userPokedollarsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('money')); // Initial user money
    userMoney$: Observable<number> = this.userPokedollarsSubject.asObservable();

    private token!: string;

    getUserMoney(): number {
        return this.userPokedollarsSubject.value;
    }

    setUserMoney(amount:any):void{
        localStorage.setItem('money',amount);
        this.userPokedollarsSubject.next(amount)
    }
    removeUserMoney():void{
        localStorage.removeItem('money')
        this.userPokedollarsSubject.next(-1)
    }

    buyboostersapi(amount: any): Observable<any> {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        return this.http.post('http://'+this.url+':5000/buyBoosters', amount,{headers})
    }
    


    buyboosters(amount: number): void {
        const currentMoney = this.userPokedollarsSubject.value;
        this.userPokedollarsSubject.next(currentMoney - amount);
    }
}