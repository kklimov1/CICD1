import { Injectable } from '@angular/core';
import { Post } from './posts.service';
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';
import { User } from 'app/model/user';
import { Observable } from 'rxjs';
import { first } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersService {

  strOut?: string = "new user here:";

  constructor(private http: HttpClient) { }
  baseUrl: string = "http://localhost:8080";
  userUrl: string = "/users";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  createUser(username: string, password: string, email: string, firstName: string, lastName: string, bio: string, 
    securityQuestion:string, securityAnswer: string){
    let newUser = new User(username, null, password, email, firstName, lastName, bio, securityQuestion, securityAnswer);
    return this.http.post<User>(this.baseUrl + this.userUrl, JSON.stringify(newUser), this.httpOptions);
  }
  public getUser(id : number) : Observable<User> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("userId", id);
    
    return this.http.get<User>(this.baseUrl + this.userUrl, {params:queryParams});
  }

  public searchUsers(filter: string) : Observable<User[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("filter", filter);

    return this.http.get<User[]>(this.baseUrl + this.userUrl + "/search", {params:queryParams});
  }

  public updateUser(user : User) : Observable<User> {

    console.log(user.userId);
    console.log(user.username);
 
    return this.http.put<User>(this.baseUrl + this.userUrl + "/update", user, this.httpOptions);
  }
}

export { User };

