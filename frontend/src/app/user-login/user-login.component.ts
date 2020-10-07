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
  styleUrls: ['./user-login.component.css'],
  providers:[AuthService]

})
export class UserLoginComponent implements OnInit {

  userName = '';
  password = '';
  infoMessage = '';
  userToken: string;
  loggedIn = false;
  loggedIn$ = false;


  secureEndpointResponse = '';
  hide= true;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar) {

    //Subscribes to the loggIn$ observable
    authService.loggedIn$.subscribe((nextValue) => {
      this.loggedIn$ = nextValue;  // this will happen on every change
    })
  }

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
  async login(): Promise<void> {
    this.loginRequest();

    this.checkUserStatus();

    //gives the user a message if login was successful not successful
    if (!this.loggedIn) {
      this.openSnackBar('Login was not possible, please check username and password', '')
    }

  }

  loginRequest(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.userName,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      this.authService.login = true;
      this.loggedIn = true;

      //gives the user a message if login was successful
      this.openSnackBar('Login was successful', '')
    });
  }


ngOnInit() {
  this.checkUserStatus();
  this.route.queryParams
      .subscribe(params => {
        if(params.registered === 'true') {
            this.infoMessage = 'Registration Successful! Please Login!';
        }
      });
}


  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

    this.authService.login = false;
    //this.loggedIn = false;

    this.checkUserStatus();
    //gives the user a message if logout was successful
    if (!this.loggedIn) {
      this.openSnackBar('You successfully logged out!', '')
    }
    else {
      this.openSnackBar('Something went wrong,! You are still logged in', '')
    }
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
