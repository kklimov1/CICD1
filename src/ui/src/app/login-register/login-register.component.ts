import { Component } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { User, UsersService } from '../Services/users.service';
import * as bcrypt from 'bcryptjs';
import {Router} from "@angular/router"
import { CookieService } from 'app/Services/cookie-service.service';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {

  user?: User;

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: [''], // email should be required
    firstName: [''],
    lastName: [''],
    bio: [''],
    securityQuestion: ['', Validators.required],
    securityAnswer: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private usersService : UsersService,
    private router: Router,
    private cookieService: CookieService
  ){}

  onSubmit(): void{
    let pass = bcrypt.hashSync(this.registerForm.value.password!, 10);
    // let pass = this.registerForm.value.password!;
    this.usersService.createUser(this.registerForm.value.username!, pass, this.registerForm.value.email!, 
      this.registerForm.value.firstName!, this.registerForm.value.lastName!, this.registerForm.value.bio!, 
      this.registerForm.value.securityQuestion!, this.registerForm.value.securityAnswer!).subscribe(user =>{
      this.cookieService.setCurrentUser(user);
      this.router.navigate(['/home']);
      console.log("posted user: "+ JSON.stringify(user));
    }, err =>{
      alert('this username has already been taken');
    })
    this.registerForm.reset();
  }
}