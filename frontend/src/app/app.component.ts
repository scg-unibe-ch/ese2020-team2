import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Role} from "./models/role";
import {BehaviorSubject} from "rxjs";
import { Observable } from 'rxjs';
import { Purchase } from '../../../backend/src/models/purchase.model';
import {CurrentUser} from './services/current-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent implements OnInit {
  numberOfNotification = 0;
  loggedIn$: BehaviorSubject<boolean>;
  hidden = false;
  listOfNotification$:Observable<Purchase[]>;
  constructor(private authService: AuthService, private currentUser:CurrentUser) {

    this.loggedIn$ = authService.loggedIn$
  }
  ngOnInit(){
    this.getNoftification()
  }
   get isAdmin() {
    return (this.authService.hasRole(Role.Admin) && this.authService.isAuthenticated());
  }

  toggleBadgeVisibility() {
    if(!this.hidden)
    this.hidden = !this.hidden;
  }
  getNoftification(){
    this.listOfNotification$ = this.currentUser.getNotification()
  }
}
