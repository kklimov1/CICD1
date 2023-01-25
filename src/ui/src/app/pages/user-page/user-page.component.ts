import { Component } from '@angular/core';
import { Post } from 'app/Services/posts.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

    //This will compare if the logged in user is the same as the current user profile
    active = false;

    //This value will be grabbed from the session cookie
    userId = 1;

    constructor () {
  
    }
}
