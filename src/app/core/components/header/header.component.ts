import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PokedollarsService } from '../../services/pokedollars.service';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private AuthService:AuthService,private router: Router,private PokedollarsService: PokedollarsService,private socket: Socket){}
  

  pseudo!:string;
  userdata:any={'user':'','money':0};

  onLogout():void{
    this.AuthService.removeToken()
    this.router.navigateByUrl('/');
  }
  ngOnInit(): void {
    if(this.isLogin()){
      this.refreshValue();
    }
    // Listen for the 'value_updated' event
    this.socket.fromEvent('value_updated').subscribe((data: any) => {
      this.userdata = data;
      console.log(this.userdata)
    });
  }

  isLogin():boolean{
    return this.AuthService.getToken()!==null
  }

  refreshValue(): void {
    this.PokedollarsService.getUserData().subscribe(data => {
      this.userdata = data;
    });
  }

}
