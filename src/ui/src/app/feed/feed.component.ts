import { Component, OnInit, Output } from '@angular/core';
import { Post, PostsService } from '../Services/posts.service';
import { User } from 'app/model/user';
import { CookieService } from 'app/Services/cookie-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {

  posts: Post[] = [];
  currentUser: User | undefined;
  showNewPostArea: boolean = true;
  params!: Params;
  isUserPage: boolean = false;
  isFeedPage: boolean = false;

  imageLink: string = "";
  constructor(private postsService: PostsService, private cookieService: CookieService, private router: Router, private activeRoute: ActivatedRoute) {
  }

  createPost(text: string): void{
    if(this.currentUser == undefined){
     this.currentUser = this.cookieService.getCurrentUser()
    }
    if(this.currentUser == undefined){
      alert("Must be signed in to create posts");
    }
    else if(text != "" || this.imageLink != ""){
      if(text.length > 1000){
        alert("Message exceeds max character length of 1000");
      }else{
        this.postsService.createPost(text, this.imageLink, this.currentUser).subscribe(post => {
          console.log("Returned Post: ", post);
          this.posts.push(post);
        });
      }

      (<HTMLInputElement>document.getElementById("newPostText")).value = "";
      this.imageLink = "";
    }
  }

  addImageLink(): void{
    let link = prompt("add a link to an image");
    if(link != null){
      if (this.imageLink.length > 1000){
        alert("Image link exceeds max character length of 1000");
      }else{
        this.imageLink = link;
      }
    }
  }

  removeImageLink(): void{
    this.imageLink = "";
  }

  ngOnInit(): void {
    this.currentUser = this.cookieService.getCurrentUser();
    if(this.router.url.includes("user")){
      this.activeRoute.params.subscribe((routeParams = {}) => {
        this.pageChanged(routeParams);
        this.params = routeParams;
      });
      this.isUserPage = true;
      this.isFeedPage = false;
    }

    else{
      this.postsService.getPosts()
      .subscribe((posts) => {
        this.posts = posts;
      });
      this.isFeedPage = true;
      this.isUserPage = false;
    }
  }

  pageChanged(routeParams: Params){
    this.postsService.getPostsFromUser(routeParams["id"])
      .subscribe((posts) => {
        this.posts = posts;
      });
    this.showNewPostArea = true;
  }

  removePost(post: Post): void {
    this.posts.splice(this.posts.indexOf(post), 1);
  }

  @Output() removePostFromFeed = this.removePost.bind(this);


}
