import { Component, OnInit } from '@angular/core';
import {AuthService} from "./../auth/auth.service";
import {Role} from "./../models/role";
import {BehaviorSubject} from "rxjs";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedIn$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.loggedIn$ = authService.loggedIn$
  }

  get isAdmin() {
    return this.authService.hasRole(Role.Admin);
  }
}
