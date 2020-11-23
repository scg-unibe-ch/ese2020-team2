import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Role} from "./models/role";
import {BehaviorSubject} from "rxjs";
import { Observable } from 'rxjs';
import { Purchase } from './models/purchase.model';
import {CurrentUser} from './services/current-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent implements OnInit {
  loggedIn$: BehaviorSubject<boolean>;
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


  getNoftification(){
    this.listOfNotification$ = this.currentUser.getNotification()
  }
}
