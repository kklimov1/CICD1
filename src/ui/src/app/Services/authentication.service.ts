import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { UserAuth } from 'app/userAuth';
import { catchError, retry } from 'rxjs/operators';
//import { User, UsersService } from 'app/Services/users.service';
import { User } from 'app/user';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'app/Services/users.service';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = "http://localhost:8080"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient ,
    private userService: UsersService ) { }

  errorHandler(error: any){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) { errorMessage = error.error.message}
    else { errorMessage = `${error.status} ${error.message}`};

    return throwError(errorMessage);
  }

/*
  authenticateUser(username: string, password: string): Observable<User[]> {
    let userAuth: UserAuth = new UserAuth(username, password);
    
    return this.http.post<User[]>(this.baseUrl + "/auth/login", JSON.stringify(userAuth), this.httpOptions).pipe(
        catchError(this.errorHandler)
        );
    }*/

    authenticateUser(username: string, password: string): Observable<User> {
      let userAuth: UserAuth = new UserAuth(username, password);
      
      return this.http.post<User>(this.baseUrl + "/auth/login", JSON.stringify(userAuth), this.httpOptions).pipe(
          catchError(this.errorHandler)
          );        
      }


  }



