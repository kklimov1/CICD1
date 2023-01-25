import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { RegisterComponent } from './register/register.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ResetCredentialsComponent } from './reset-credentials/reset-credentials.component';
import { LoginComponent as LG } from './login/login.component';

import { HomeComponent } from './pages/home/home.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes : Routes = [
 // {path: 'credentials', component: ResetCredentialsComponent},
  //{path: 'login', component: LoginComponent},
 // {path: '', redirectTo: '/login', pathMatch: 'full'}
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component : LoginPageComponent },
  {path: 'home', component : HomeComponent},
  {path: 'post/:id', component : PostDetailComponent},
  {path: 'user/:id', component : UserPageComponent},
  {path: 'forgot-password', component : PasswordResetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
