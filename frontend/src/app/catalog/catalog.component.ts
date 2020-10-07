import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  loggedIn$ = false;

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
}
