import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { PokedollarsService } from '../../services/pokedollars.service';
import { SharedService } from '../../services/shared.service';
import { Socket } from 'ngx-socket-io';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{



  constructor(private AuthService:AuthService,private router: Router,
    private PokedollarsService: PokedollarsService,private socket: Socket,
    private SharedService: SharedService,private route: ActivatedRoute){}
  

  pseudo!:string;
  userdata!:any;


  private socketSubscription!: Subscription;


  onLogout():void{
    this.AuthService.removeToken();
    this.userdata=undefined;
    this.router.navigate(['./'], { relativeTo: this.route });
  }


  ngOnInit(): void {

    this.socketSubscription = this.SharedService.getAuthenticationStatus().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        console.log('user authent')
        const token = this.AuthService.getToken()
        this.socket = new Socket({ url: 'http://88.163.1.215:5000', options: { transportOptions: { polling: { extraHeaders: { Authorization: `Bearer ${token}` } } } } });
        this.socket.emit('user_connect') 
        this.socket.fromEvent(`value_updated`).subscribe((data: any) => {
          console.log('recive updated value')
          this.userdata = data;
          console.log(this.userdata)
         });    
        
        }
    });
    
  }


  ngOnDestroy() {



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
