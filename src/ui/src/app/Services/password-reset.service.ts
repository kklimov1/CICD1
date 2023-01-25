import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';
import { User, RecoverUser } from 'app/model/user';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) {}

  baseUrl: string = "http://localhost:8080/users/recover";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getSecurityQuestion(username: string, email: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('username', username);
    queryParams = queryParams.append('email', email)
    return this.http.get<User>(this.baseUrl, {params: queryParams});
  }

  postUpdatePassword(user: User) {
    return this.http.post<boolean>(this.baseUrl, JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
    
    //return false;
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
