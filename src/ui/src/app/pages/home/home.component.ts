import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    //This will compare if the logged in user is the same as the current user profile
    active = true;

    //This value will be grabbed from the session cookie
    userId = 1;
  
    constructor () {
  
    }
}
