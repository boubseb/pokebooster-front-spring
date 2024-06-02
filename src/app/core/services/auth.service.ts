import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http: HttpClient) {}


    url=environment.apiUrl



    username!:string;
    pokedollars!:number;
    pseudo!:string;
    private token!:string;


 

   

  login(username: string, password: string): Observable<any> {
        const body = { pseudo:username, password };
        return this.http.post(this.url+'/login', body);
      }

  changePassword(password: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        const body = { password };
        return this.http.post(this.url+'/changePassword', body,{headers}).pipe(map((x:any)=>x.message));
      }

  deleteAccount(password:string):Observable<any>{
    console.log('delete')
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    const params = new HttpParams().set('password',password)
    return this.http.put(this.url+'/deleteAccount',{},{headers,params})
  }


  setToken(token: string): void {
    localStorage.setItem('token',token);
    // You can also store the token in a secure way, like in local storage or a cookie.
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  removeToken():void{
    localStorage.removeItem('token')
  }


  registerUser(user: any): Observable<any> {
      console.log(user)    
      return this.http.post(this.url+'/register', user).pipe(map((information)=>{
          return information;
      }));
  }

  buyboosters(amount: any): Observable<any> {
    return this.http.get(this.url+'/buyBoosters', amount)
}

  getUserData(): Observable<any> {
    const headers = new HttpHeaders({'Authorization':`${this.token}`});
    console.log("lol"+headers)
    return this.http.get(this.url+'/User',{headers});
  }
}

