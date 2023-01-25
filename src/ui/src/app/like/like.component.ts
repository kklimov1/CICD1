import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RequestUser, RequestPost, RequestLike, LikeService } from 'app/Services/likes.service';
import { Post, PostsService } from 'app/Services/posts.service';
import { PostComponent } from 'app/post/post.component';
import { CookieService } from 'app/Services/cookie-service.service';
import { User } from 'app/model/user';


@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})



export class LikeComponent {
  remote: LikeService;
  cookie: CookieService
  likeCount: number | undefined;
  hasLiked: boolean | undefined;
  currentUser: User | undefined;
  posts: Post[] = [];

  userId: number = -1;
  postId: number = -1; // same
  likeId: number = -1;

  @Input()
  postItem!: Post;

  constructor(remote: LikeService, private postsService: PostsService, cookie: CookieService) {
    this.remote = remote;
    this.cookie = cookie;
  }

   
  // this object structure is still spaghetti, all of this is really to test end to end atm
  user: RequestUser = new RequestUser(this.userId);
  post: RequestPost = new RequestPost(this.postId);
  like: RequestLike = new RequestLike(this.user, this.post);

  ngOnInit(): void {
    if (this.postItem.postId  != null) {
      this.postId = this.postItem.postId;
    } 
    this.getActiveUser();
    this.doGetUserLikePost();
    this.doGetLikeCount();   
  }


  getActiveUser() {
    this.currentUser = this.cookie.getCurrentUser();
  }

  
  doPostRequest() {
    if (this.postItem.postId  != null) {
      this.postId = this.postItem.postId;
    } 
    if (this.currentUser?.userId != null) {
      this.userId = this.currentUser?.userId
    }
    this.user = new RequestUser(this.userId);
    this.post = new RequestPost(this.postId);
    this.like = new RequestLike(this.user, this.post);
    
    this.remote.doPostLikePostAsUser(this.like).subscribe(() =>
    this.doGetLikeCount()
    );
  }


  doGetLikeCount() {
    if (this.postItem.postId  != null) {
      this.postId = this.postItem.postId;
    } 
    if (this.currentUser?.userId != null) {
      this.userId = this.currentUser?.userId
    }
    this.user = new RequestUser(this.userId);
    this.post = new RequestPost(this.postId);
    this.like = new RequestLike(this.user, this.post);
    
    this.remote.doGetLikeCountForPost(this.like).subscribe(
      (likeCount: number | undefined) => 
      this.likeCount = likeCount
    );
  }


  doGetUserLikePost() {
    if (this.postItem.postId  != null) {
      this.postId = this.postItem.postId;
    } 
    if (this.currentUser?.userId != null) {
      this.userId = this.currentUser?.userId
    }
    this.user = new RequestUser(this.userId);
    this.post = new RequestPost(this.postId);
    this.like = new RequestLike(this.user, this.post);
    this.remote.doGetLikeForPostUser(this.like).subscribe(
      (hasLiked: boolean | undefined) => this.hasLiked = hasLiked
    );
  }


  // delete is a bit wierd, return will be assigned to hasLiked changing it 
  // back to false if a like has been deleted
  doDeleteUserLikePost() {
    if (this.postItem.postId  != null) {
      this.postId = this.postItem.postId;
    } 
    if (this.currentUser?.userId != null) {
      this.userId = this.currentUser?.userId
    }
    this.user = new RequestUser(this.userId);
    this.post = new RequestPost(this.postId);
    this.like = new RequestLike(this.user, this.post);
    this.remote.doDeleteLikeForPostUser(this.like).subscribe(() =>
      this.doGetLikeCount()
    );
  }


  // TODO: 
  // this works now, I shouyld clean up some of the mess in here but ill just finish 
  // plugging in functionality and move on to helping or doing something else
  handleButtonClick(postId: any) {
    this.postId = postId * 1;
    if (this.currentUser?.userId != null) {
      this.userId = this.currentUser?.userId
    }
    this.user = new RequestUser(this.userId);
    this.post = new RequestPost(this.postId);
    this.like = new RequestLike(this.user, this.post);
    if (this.userId == -1){
      alert("Must be logged in to like posts.")
    } else {
      if (this.hasLiked == false) {
        this.doPostRequest();
        // this causes the user to have to hit the button twice for it to update
        // for simplicity I will assume the request worked and update the button immediately
        //this.doGetUserLikePost();
        this.hasLiked = true;
      } else {
        this.doDeleteUserLikePost();
        // this causes the user to have to hit the button twice for it to update
        // for simplicity I will assume the request worked and update the button immediately
        //his.doGetUserLikePost();
        this.hasLiked = false;
      }
    }
  }
}


