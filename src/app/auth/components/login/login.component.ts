import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/core/services/shared.service';
import { PokedollarsService } from 'src/app/core/services/pokedollars.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
  LoginForm: FormGroup;
  constructor(private AuthService:AuthService,private router:Router,private formBuilder: FormBuilder,
    private SharedService: SharedService,private PokedollarsService: PokedollarsService,private dialogRef: MatDialogRef<LoginComponent> ){

    this.LoginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit():void{

  }


  onLogin(username:string,password:string):void {
    this.AuthService.login(username,password).subscribe(
      (response: any) => {
        console.log(response)
        if (response.access_token) {
          this.AuthService.setToken(response.access_token);
          this.SharedService.setAuthenticationStatus(true);
          this.PokedollarsService.getUserData();
          this.router.navigateByUrl('/open-boosters');
          this.dialogRef.close();
        } else {
          // Handle login error
          console.error('Login failed:', response.message);
        }
      },
      (error) => {
        // Handle login error
        console.error('Login failed:', error);
      },
    );
  }

  onClose() {
    this.dialogRef.close();
  }




}
