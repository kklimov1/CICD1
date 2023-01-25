import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
  }

  baseUrl: string = 'http://localhost:8080/likes';

  // Like a post - needs a user_id and a post_id
  // need to map this to something that can associate a post id and user id with the operation
  // This works end to end now
  doPostLikePostAsUser(like: RequestLike) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post<RequestLike>(this.baseUrl, JSON.stringify(like), options)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // Get - get like count for a post
  // This works end to end now
  doGetLikeCountForPost(like: RequestLike): Observable<number> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get<number>(this.baseUrl + '/count/' + like.post.postId, options)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // Get - get if a user liked a post already or not
  doGetLikeForPostUser(like: RequestLike): Observable<boolean> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get<boolean>(this.baseUrl + '/' + like.user.userId + '/' + like.post.postId, options)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }


  // Delete - allow a user to remove their like from a post
  // also needs to be parameters
  doDeleteLikeForPostUser(like: RequestLike): Observable<boolean> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete<boolean>(this.baseUrl + '/' + like.user.userId + '/' + like.post.postId, options)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // error handling
  errorHandl(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // get client side error
      errorMessage = error.error.message;
    } else {
      // get server side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
   }


}

// all of this spaghetti down here is to match the expected input of the server...
export class RequestUser {
  constructor(userId: number) {
    this.userId = userId;
  }
  userId: number | undefined;
}
  
export class RequestPost {
  constructor(postId: number) {
    this.postId = postId;
  }
  postId: number | undefined;
}

// the actual class structure I need to pass in the JSON body
export class RequestLike {
  constructor(user: RequestUser, post: RequestPost) {
    this.user = user;
    this.post = post;
  }
  user: RequestUser;
  post: RequestPost;
}


  


