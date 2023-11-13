import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {AuthRoutingModule} from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    RegisterComponent,
    LoginComponent
  ]
})
export class AuthModule { }
