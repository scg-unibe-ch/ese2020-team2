import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userName = '';
  password = '';
  infoMessage = '';
  userToken: string;
  loggedIn = false;
  loggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('userToken'));

  secureEndpointResponse = '';
  hide= true;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.checkUserStatus()
  }

  /**
   * Displays a message at the bottom of the screen
   *
   * @param message, a string with the message to deisplay
   * @param action
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }

  checkUserStatus(): void{
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
    this.authService.login = !!(this.userToken);
  }

   login(): void {
     this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.userName,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);

      this.checkUserStatus();
      this.openSnackBar('You successfully logged in!', '')
    }, (error: any) => {
       this.checkUserStatus();
       this.openSnackBar('Login was not successful, please check username and password', '')
     });

  }


  /**
   * Loges the user out
   */
  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

    this.checkUserStatus();
    this.openSnackBar('You successfully logged out!', '')
  }


  toForgotPassword(){

  }
  /**
   * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
   */
  accessSecuredEndpoint(): void {
    this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
      this.secureEndpointResponse = 'Successfully accessed secure endpoint. Message from server: ' + res.message;
    }, (error: any) => {
      this.secureEndpointResponse = 'Unauthorized';
    });
  }
}
