import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokedollarsService } from '../../services/pokedollars.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private AuthService:AuthService,private router: Router,private PokedollarsService: PokedollarsService){}
  
  userPokedollars$!: Observable<number>;
  pseudo$!:Observable<string>;
  pseudo!:string;

  onLogout():void{
    this.AuthService.removeToken()
    this.AuthService.removePseudo()
    this.PokedollarsService.removeUserMoney()
    this.router.navigateByUrl('/');
  }
  ngOnInit(): void {
 
    this.userPokedollars$ = this.PokedollarsService.userMoney$;
    this.pseudo$=this.AuthService.userPseudo$;


  }

}
