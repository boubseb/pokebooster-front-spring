import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedollarsService {
    constructor(private http: HttpClient) {}
    private token!: string;

    //url="88.163.1.215"
    url="127.0.0.1"
    private userPokedollarsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(-1); // Initial user money
    userMoney$: Observable<number> = this.userPokedollarsSubject.asObservable();

    getUserMoney(): number {
        return this.userPokedollarsSubject.value;
    }

    setUserMoney(amount:number):void{
        this.userPokedollarsSubject.next(amount)
    }

    buyboosters(amount: number): void {
        const currentMoney = this.userPokedollarsSubject.value;
        this.userPokedollarsSubject.next(currentMoney - amount);
    }
}