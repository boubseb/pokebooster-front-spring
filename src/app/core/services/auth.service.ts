import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http: HttpClient) {}


    url="https://pkboostersapi.fr"
    //url="http://127.0.0.1:5000"


    username!:string;
    pokedollars!:number;
    pseudo!:string;
    private token!:string;


 

   

  login(username: string, password: string): Observable<any> {
        const body = { username, password };
        return this.http.post(this.url+'/login', body);
      }

  changePAssword(password: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        const body = { password };
        return this.http.post(this.url+'/changePassword', body,{headers}).pipe(map((x:any)=>x.message));
      }

  deleteAccount():Observable<any>{
    console.log('delete')
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.put(this.url+'/deleteAccount',{headers}).pipe(map((x:any)=>{x.message;console.log(x)}));
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
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.get(this.url+'/getUserData',{headers});
  }
}

