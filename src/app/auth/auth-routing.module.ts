import { NgModule } from '@angular/core';
import {  RouterModule,Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NoAuthGuard } from '../core/guards/noauth.guard';


const routes: Routes = [
  { path: 'auth/login', component: LoginComponent,canActivate: [NoAuthGuard] },
  { path: 'auth/register', component: RegisterComponent,canActivate: [NoAuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
