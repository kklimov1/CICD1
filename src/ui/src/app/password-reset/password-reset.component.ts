import { Component } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { User, UsersService } from '../Services/users.service';
import { PasswordResetService } from 'app/Services/password-reset.service';
import * as bcrypt from 'bcryptjs';
import {Router} from "@angular/router"


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private resetService: PasswordResetService,
    private router: Router
  ) {}

  user?: User;
  updateStatus?: boolean;
  formState: string = 'findUser';
  securityQuestion: string = "";

  forgotPassForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required]
  });

  // get a user object with the security question
  forgotPassClick(): void {
    this.resetService.getSecurityQuestion(this.forgotPassForm.value.username!, this.forgotPassForm.value.email!).subscribe(
      user => {
        this.user = user;
        if (this.user != null) {
          this.update();
        } else {
          alert("Incorrect username or email");
        }
      }
    )
    
  }

  // hopefully this makes it so that once the request is resolved the form will change
  update(){
    if (this.user?.securityQuestion != null) {
      this.securityQuestion = this.user.securityQuestion;
      this.formState = 'updatePassword';
    }
  }

  passUpdated() {
    if (this.updateStatus == true) {
      alert('Returning to login page. Login with new password.');
      this.goToLoginPage();
    } else {
      alert('Invalid answer to security question.');
      this.formState = 'findUser';
    }
  }

  // need to figure out how to get and display the security question
  resetPassForm = this.formBuilder.group({
    securityAnswer: ['', Validators.required],
    newPassword: ['', Validators.required]
  });

  updatePasswordClick(): void{
    if (this.user != null) {
      this.user.securityAnswer = this.resetPassForm.value.securityAnswer!
      let pass = bcrypt.hashSync(this.resetPassForm.value.newPassword!, 10);
      this.user.password = pass;
      // send it to post request
      this.resetService.postUpdatePassword(this.user).subscribe(
        updateStatus => {
          this.updateStatus = updateStatus;
          this.passUpdated();
        }
      )
    }
  }

  goToLoginPage() {
    this.router.navigate(['/login'])
  }


}
