import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { PokedollarsService } from '../../services/pokedollars.service';
import { SharedService } from '../../services/shared.service';
//import { Socket } from 'ngx-socket-io';
import { interval, Observable, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{



  constructor(private AuthService:AuthService,private router: Router,
  private PokedollarsService: PokedollarsService,private route: ActivatedRoute,public dialog: MatDialog){}
  

  pseudo!:string;
  userData$!:Observable<any>;





  onLogout():void{
    //this.socket.emit('user_action',false)
    this.AuthService.removeToken();
    this.PokedollarsService.updatePokedollars(null)
    this.router.navigate(['./'], { relativeTo: this.route });
  }


  ngOnInit(): void {

    this.userData$=this.PokedollarsService.pokedollars$    
  }


  ngOnDestroy() {



  }


  isLogin():boolean{
    return this.AuthService.getToken()!==null
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Optionally handle any result from the dialog here
    });
  }


}
