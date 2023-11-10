import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(private http: HttpClient) {}
    private token!: string;
    url="88.163.1.215"
    //url="127.0.0.1"


    login(username: string, password: string): Observable<any> {
        const body = { username, password };
        return this.http.post('http://'+this.url+':5000/login', body);
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

    getDataofuser() :Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}` // Send the token using the "Bearer" scheme
      });
      return this.http.post('http://'+this.url+':5000/test',{headers}).pipe(map((information)=>{
          return information;
        }));
    }
}

