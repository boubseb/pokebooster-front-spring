import { Component, OnInit } from '@angular/core';
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
  DeleteForm!:FormGroup;
  resultResetPassword$!: Observable<any>;
  isDelete:boolean=false;


  constructor(private UserDataService: UserDataService,private AuthService: AuthService,
     private formBuilder: FormBuilder,private router: Router){
    
  
  this.PasswordForm = this.formBuilder.group({
    password: ['', [Validators.required]]
  });

  this.DeleteForm = this.formBuilder.group({
    password: ['', [Validators.required]]
  });
  }

  


  ngOnInit(): void {
    this.refreshValue()
  }

  refreshValue(): void {
    this.UserDataService.getUserData().subscribe(data => {
      console.log(data)
      this.userdata = data;
    });
  }

  onChangePassword():void{
    this.AuthService.changePassword(this.PasswordForm.value.password).subscribe(x=>this.resultResetPassword$=of(x))
    //this.AuthService.removeToken()
    //this.router.navigateByUrl('/auth/login')
  }

  onDeleteAccount():void{
    console.log("test"+this.DeleteForm.value.password)
    this.AuthService.deleteAccount(this.DeleteForm.value.password).subscribe()
    this.AuthService.removeToken()
    this.router.navigateByUrl('/')
  }

  

}
