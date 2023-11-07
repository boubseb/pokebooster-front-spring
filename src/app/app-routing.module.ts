import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { BrowseComponent } from './core/components/browse/browse.component';

const routes: Routes = [
  { path: '', redirectTo: 'browse', pathMatch: 'full' }, // Redirect to login
  {path:'browse',component:BrowseComponent},
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'open-boosters',  loadChildren: () => import('./open-boosters/open-boosters.module').then(m => m.OpenBoostersModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
