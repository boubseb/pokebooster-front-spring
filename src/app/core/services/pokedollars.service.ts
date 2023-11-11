import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedollarsService {
  private userPokedollarsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1000); // Initial user money
  userMoney$: Observable<number> = this.userPokedollarsSubject.asObservable();

  getUserMoney(): number {
    return this.userPokedollarsSubject.value;
  }

  updateUserMoney(amount: number): void {
    const currentMoney = this.userPokedollarsSubject.value;
    this.userPokedollarsSubject.next(currentMoney - amount);
  }
}