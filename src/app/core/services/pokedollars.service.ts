import { HttpHeaders,HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PokedollarsService {

  private pokedollarsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public pokedollars$: Observable<any> = this.pokedollarsSubject.asObservable();


    constructor(private http: HttpClient) {

      this.getUserData()
      
    }


    url=environment.apiUrl
  

    private token!: string;

  
    
    buyboostersapi(nb_booster:number,set_id:string): Observable<any> {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        const params = new HttpParams().set('nbBooster',nb_booster).set('set_id',set_id)
        return this.http.post(this.url+'/buyBoosters',{},{headers ,params})
    }

    getUserData(): Observable<any> {
        const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        return this.http.get(this.url+'/User',{headers}).pipe(tap(x=>this.updatePokedollars(x)))
      }


  

  updatePokedollars(userData: any): void {
    console.log(userData)
    this.pokedollarsSubject.next(userData);
  }
    
}


