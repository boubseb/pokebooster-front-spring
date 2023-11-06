import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
    {path: '', component: NavMenuComponent,canActivate: [AuthGuard]} 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OpenBoostersRoutingModule {}