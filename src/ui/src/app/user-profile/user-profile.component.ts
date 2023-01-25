import { Component, Input} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CookieService } from 'app/Services/cookie-service.service';
import { User } from 'app/model/user';
import { UsersService } from 'app/Services/users.service';
import { UserAuth } from 'app/userAuth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent { 
  strOut?: string;
  @Input() activeUser = false;

  @Input() userId = -1;

  editUser = false;

  tempUser?: User;
  
  imageLink: string = "";

  profilePic: string | undefined | null = "assets/profilepic.jpg";

  currentUser: User = new User('', this.userId);
  loggedInUser: User | undefined = new User('', this.userId);

  constructor (
    private userService: UsersService, 
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router : Router) {}

  ngOnInit() {
    this.loggedInUser = this.cookieService.getCurrentUser();
    if(this.router.url.includes("user")){
      this.route.params.subscribe((routeParams = {}) => {
        this.getUser(routeParams["id"]);
      });
    }else{
      let id = this.loggedInUser ? <number>this.loggedInUser.userId : 1;
      this.getUser(id);
    }

  }

  getUser(userId: number){
    this.userService.getUser(userId).subscribe((response:User) => {
      this.currentUser = response;

      if (this.currentUser.image !== "" && this.currentUser.image !== null) {
        this.profilePic = this.currentUser.image;
      } else {
        this.currentUser.image = "assets/profilepic.jpg";
        this.profilePic = this.currentUser.image;
      }

      this.checkActiveUser();
    })
  }

  checkActiveUser(){
    if(this.loggedInUser && this.loggedInUser.userId == this.currentUser.userId){
      this.activeUser = true;
    }else{
      this.activeUser = false;
    }
    
  }

  
  editMode(): void {
    this.editUser = true;
  }

  cancel(): void {
    this.editUser = false;
  }

  save(uName: string, fName: string, lName: string, newDesc: string, image: string): void {

    let newUser = new User('', -1);
    if (this.currentUser != undefined ) {
    newUser.userId = this.currentUser.userId;}
    
    newUser.username = uName;
    newUser.firstName = fName;
    newUser.lastName = lName;
    newUser.bio = newDesc;
    newUser.image = image;
      
    this.currentUser = newUser;

    if (this.currentUser.image !== "" && this.currentUser.image !== null) {
      this.profilePic = this.currentUser.image;
    } else {
      this.profilePic = "assets/profilepic.jpg"
    }

    this.userService.updateUser(newUser).subscribe();

    /*
    this.userService.getUser(this.userId!).subscribe(user => {
      this.tempUser = user;
      this.cookieService.deleteCookie();
      this.cookieService.setUser(this.tempUser)
    })
    */
    this.editUser = false; 
  }

  editPic(): void{
    let link = prompt("Add a link to change your profile picture!");
    if(link != null){
      if (this.imageLink.length > 1000){
        alert("Image link exceeds max character length of 1000");
      }else{
        this.imageLink = link;
      }
    } else {
      this.imageLink = "assets/profilepic.jpg";
      console.log("null image!");
    }
    console.log(this.imageLink);
  }
}