import {Component} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Role} from "./models/role";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent {
  numberOfNotification = 0;
  loggedIn$: BehaviorSubject<boolean>;
  hidden = false;
  constructor(private authService: AuthService) {

    //Gets the loggIn$ observable
    this.loggedIn$ = authService.loggedIn$
  }

   get isAdmin() {
    return (this.authService.hasRole(Role.Admin) && this.authService.isAuthenticated());
  }

  toggleBadgeVisibility() {
    if(!this.hidden)
    this.hidden = !this.hidden;
  }
}
