import { Component } from '@angular/core';
import { CookieService } from 'app/Services/cookie-service.service';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(public cookieService: CookieService, private route: ActivatedRoute, private router: Router) {}

  logout(): void { 
    this.cookieService.deleteCookie();
    if (this.cookieService.getCurrentUser() == undefined) {
      this.router.navigate(['']);
    }
  }

}
