import { Component, OnInit } from '@angular/core';
import {AuthService} from "./../auth/auth.service";
import {Role} from "./../models/role";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn$=false;

  constructor(private authService: AuthService) {
    //Subscribes to the loggIn$ observable
    authService.loggedIn$.subscribe((nextValue) => {
      this.loggedIn$ = nextValue;  // this will happen on every change
    })
  }

   /**
   * Checks if user is logged in and updates the login status of the user
   */
  ngOnInit() {
    this.authService.login = !!(localStorage.getItem('userToken'));
  }
  get isAdmin() {
    return this.authService.hasRole(Role.Admin);
  }
}
