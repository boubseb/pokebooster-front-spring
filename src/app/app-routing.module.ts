import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { BrowseComponent } from './core/components/browse/browse.component';
import { CollectionComponent } from './core/components/collection/collection.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/noauth.guard';
import { UserProfilComponent } from './core/components/user-profil/user-profil.component';
import { ListPostComponent } from './trade/components/list-post/list-post.component';

const routes: Routes = [
  { path: '', redirectTo: 'browse', pathMatch: 'full' }, // Redirect to home
  {path:'browse',component:BrowseComponent},
  {path:'profil',component:UserProfilComponent,canActivate:[AuthGuard]},
  {path:'collection',component:CollectionComponent,canActivate: [AuthGuard]},
  {path:'trade',component:ListPostComponent,canActivate: [AuthGuard]},
  { path: 'auth/login', component: LoginComponent,canActivate: [NoAuthGuard] },
  { path: 'auth/register', component: RegisterComponent,canActivate: [NoAuthGuard] },
  { path: 'open-boosters',  loadChildren: () => import('./open-boosters/open-boosters.module').then(m => m.OpenBoostersModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
