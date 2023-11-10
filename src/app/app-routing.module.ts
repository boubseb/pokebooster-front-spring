import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { BrowseComponent } from './core/components/browse/browse.component';
import { CollectionComponent } from './core/components/collection/collection.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'browse', pathMatch: 'full' }, // Redirect to login
  {path:'browse',component:BrowseComponent},
  {path:'collection',component:CollectionComponent,canActivate: [AuthGuard]},
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'open-boosters',  loadChildren: () => import('./open-boosters/open-boosters.module').then(m => m.OpenBoostersModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
