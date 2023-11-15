import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http: HttpClient) {}


    url="88.163.1.215"
    //url="127.0.0.1"


    username!:string;
    pokedollars!:number;
    pseudo!:string;
    private token!:string;


 

   

  login(username: string, password: string): Observable<any> {
        const body = { username, password };
        return this.http.post('http://'+this.url+':5000/login', body);
      }

  changePAssword(password: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
        const body = { password };
        return this.http.post('http://'+this.url+':5000/changePassword', body,{headers}).pipe(map((x:any)=>x.message));
      }

  deleteAccount():Observable<any>{
    console.log('delete')
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.put('http://'+this.url+':5000/deleteAccount',{headers}).pipe(map((x:any)=>{x.message;console.log(x)}));
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
      return this.http.post('http://'+this.url+':5000/register', user).pipe(map((information)=>{
          return information;
      }));
  }

  buyboosters(amount: any): Observable<any> {
    return this.http.get('http://'+this.url+':5000/buyBoosters', amount)
}

  getUserData(): Observable<any> {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this.http.get('http://'+this.url+':5000/getUserData',{headers});
  }
}

