import {Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable,BehaviorSubject } from 'rxjs';

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


    private userPseudoSubject: BehaviorSubject<string> = new BehaviorSubject<string>(""); // Initial user money
    userPseudo$: Observable<string> = this.userPseudoSubject.asObservable();

   

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

//   removePseudo():void{
//     this.userPseudoSubject.next("")
// ;
//   }

//   setPseudo(pseudo:string):void{
//     this.userPseudoSubject.next(pseudo)
    
//   }


  setPseudo(pseudo:string):void{
    localStorage.setItem('pseudo',pseudo);
  }

  removePseudo():void{
    localStorage.removeItem('pseudo')
  }
  getPseudo():any{
    return localStorage.getItem('pseudo');
  }

  registerUser(user: any): Observable<any> {
      console.log(user)    
      return this.http.post('http://'+this.url+':5000/register', user).pipe(map((information)=>{
          return information;
        }));
  }


 
}

