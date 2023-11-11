import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { PokedollarsService } from 'src/app/core/services/pokedollars.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
  LoginForm: FormGroup;
  constructor(private AuthService:AuthService,private router:Router,private formBuilder: FormBuilder,private PokedollarsService:PokedollarsService){
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
        if (response.access_token) {
          // this.AuthService.setToken(response.access_token);
          // this.PokedollarsService.setUserMoney(response.money);
          // this.AuthService.setPseudo(username);
          // Redirect to a protected route upon successful login
          this.router.navigateByUrl('/open-boosters');
        } else {
          // Handle login error
          console.error('Login failed:', response.message);
        }
      },
      (error) => {
        // Handle login error
        console.error('Login failed:', error);
      }
    );
  }




}
