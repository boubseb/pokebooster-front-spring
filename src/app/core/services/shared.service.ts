
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(localStorage.getItem('token')!==null);

  setAuthenticationStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  getAuthenticationStatus(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}