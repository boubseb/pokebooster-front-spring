import { Component, OnInit } from '@angular/core';
//import { Socket } from 'ngx-socket-io';
import { UserDataService } from '../../../core/services/userdata.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Observable,of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {
  userdata: any;
  PasswordForm!:FormGroup;
  resultResetPassword$!: Observable<any>;


  constructor(private UserDataService: UserDataService,private AuthService: AuthService,
     private formBuilder: FormBuilder,private router: Router){
    
  
  this.PasswordForm = this.formBuilder.group({
    password: ['', [Validators.required]]
  });
  }

  


  ngOnInit(): void {
   
    this.refreshValue(); 
    // Listen for the 'value_updated' event
    //this.socket.fromEvent('value_updated').subscribe((data: any) => {
    //this.userdata = data;
   // });
  }

  refreshValue(): void {
    this.UserDataService.getUserData().subscribe(data => {
      console.log(data)
      this.userdata = data;
    });
  }

  onChangePassword():void{
    this.AuthService.changePAssword(this.PasswordForm.value.password).subscribe(x=>this.resultResetPassword$=of(x))
    //this.AuthService.removeToken()
    //this.router.navigateByUrl('/auth/login')
  }

  onDeleteAccount():void{
    this.AuthService.deleteAccount().subscribe(x=>console.log(x))
    this.AuthService.removeToken()
    this.router.navigateByUrl('/')
  }

  

}
