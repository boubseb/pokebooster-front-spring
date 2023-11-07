import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private AuthService:AuthService,private router: Router){}
  
  onLogout():void{
    this.AuthService.removeToken()
    this.router.navigateByUrl('/');
  }

}
