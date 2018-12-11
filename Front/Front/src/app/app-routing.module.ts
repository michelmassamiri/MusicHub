import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: HomeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
