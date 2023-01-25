import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry, throwError, Observable, of } from 'rxjs';
import { Comment } from '../comment';
import { Like } from '../like';
import { User } from 'app/model/user';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  // making changes by adding like service in here
  constructor(private http: HttpClient) {}

  baseUrl: string = "http://localhost:8080";

  postsUrl: string = "/posts/feed";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  createPost(postText: string, imageLink: string, user: User){
    //make the post
    //NOTE: I added the username and empty arrays to satisfy the expanded constructor. -Travis M.
    let newPost = new Post(postText, imageLink, [], [], user.username, user);
    console.log("New Post: ", newPost);
    return this.http.post<Post>(this.baseUrl + "/posts", JSON.stringify(newPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHand1)
      );
  }

  deletePostById(postId: number) {
    return this.http.delete(this.baseUrl + "/posts/" + postId, this.httpOptions)
    .pipe(
      catchError(this.handleError<Post>('deletePost'))
    )
    // Deletion won't go through without a subscription
    .subscribe(() => {})
  }

  errorHand1(error: any){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }



  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + this.postsUrl)
    .pipe(
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  getPostsFromUser(userId: number): Observable<Post[]>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", userId);
    return this.http.get<Post[]>(this.baseUrl + "/posts/user", {params:queryParams})
    .pipe(
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}

export class Post{
  postId?: number;
  message: string;
  imageLink: string;
  datePosted?: string;
  user?: User;
  username?: string;
  userId?: number
  clicked?: boolean;
  comments: Comment[];
  likes: Like[];
  youtubeLink?: string;
  embedYoutube?: boolean;
  safeYoutubeLink?: SafeResourceUrl;

  constructor(message: string, imageLink: string, likes: Like[], comments: Comment[], username?: string, user?: User, userId?: number, datePosted?: string, postId?: number, clicked?: boolean, youtubeLink?: string, embedYoutube?: boolean, safeYoutubeLink?: SafeResourceUrl){
    this.postId = postId;
    this.message = message;
    this.imageLink = imageLink;
    this.datePosted = datePosted;
    this.user = user;
    this.userId = userId;
    this.clicked = clicked;
    this.likes = likes;
    this.comments = comments;
    this.username = username;
    this.youtubeLink = youtubeLink;
    this.embedYoutube = embedYoutube;
    this.safeYoutubeLink = safeYoutubeLink;
  }
}
