import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FeedComponent } from './feed/feed.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { SettingsComponent } from './settings/settings.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentComponent } from './comment/comment.component';
import { ResetCredentialsComponent } from './reset-credentials/reset-credentials.component';
import { LoginComponent } from './login/login.component';
import { LikeComponent } from './like/like.component';

import { HomeComponent } from './pages/home/home.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';



@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    UserProfileComponent,
    PostComponent,
    PostDetailComponent,
    SettingsComponent,
    NavbarComponent,
    LoginRegisterComponent,
    CommentComponent,
    ResetCredentialsComponent,
    LoginComponent,
    LikeComponent,
    LogoutComponent,
    HomeComponent,
    UserPageComponent,
    LoginPageComponent,
    PasswordResetComponent
   // RegisterComponent

  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
