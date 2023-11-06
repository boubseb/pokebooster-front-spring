import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  {path:'register',component: RegisterComponent},
  { path: 'open-boosters',  loadChildren: () => import('./open-boosters/open-boosters.module').then(m => m.OpenBoostersModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
