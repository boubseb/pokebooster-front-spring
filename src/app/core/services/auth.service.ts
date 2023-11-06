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


    login():void {
        this.token ='MyFakeToken';
    }
    getToken():string{
        return this.token
    }

    registerUser(user: any): Observable<any> {
        console.log(user)    
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('http:///127.0.0.1:5000/register', user,{headers}).pipe(map((information)=>{
            return information;
          }));
      }
}

