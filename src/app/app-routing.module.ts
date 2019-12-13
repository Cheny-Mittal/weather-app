import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppGuard } from './guards/app/app.guard';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {path:"", component: HomeComponent, canActivate: [AppGuard]},
  {path:"add", component: AddCardComponent, canActivate: [AppGuard]},
  {path:"details/:city", component: DetailsComponent, canActivate: [AppGuard]},
  {path:"login", component: LoginComponent, canActivate: [AuthGuard]},
  {path:"signup", component: SignupComponent, canActivate: [AuthGuard]},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
