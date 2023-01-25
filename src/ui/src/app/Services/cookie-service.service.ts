import { Injectable } from '@angular/core';
import { User } from 'app/model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  user?: User;
  constructor() { }

  setCurrentUser(u: User): void {
    this.user = u;
  }

  getCurrentUser(): User | undefined {
    return this.user;
  }

  deleteCookie(): void {
    this.user = undefined;
  }
}
