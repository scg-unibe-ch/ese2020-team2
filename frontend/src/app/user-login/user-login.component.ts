import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {AuthService} from "../auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BehaviorSubject, Observable} from "rxjs";
import {SnackBarService} from "../services/snackBar.service";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {AppComponent} from "../app.component";


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
  resetPassword = false;
  question = '';
  anwer = '';
  test:any;

  secureEndpointResponse = '';
  hide= true;
  loggedIn$: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private authService: AuthService,
              public snackBar: SnackBarService,
              private app: AppComponent) {

    this.loggedIn$ = authService.loggedIn$
  }


  ngOnInit() {
    this.checkUserStatus()
  }


  /**
   * Checks the user status
   */
  checkUserStatus(): void{
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    this.authService.CheckAccessToSecuredEndpoint();
  }

  /**
   * logs the user in and displays a message if login was successful or not
   */
   login(): void {
     this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.userName,
      password: this.password,
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      localStorage.setItem('user', JSON.stringify(res.user));
       this.router.navigate(['/catalog']);
       this.snackBar.open('You successfully logged in!', '', 3000, "success")
       this.checkUserStatus();
       this.app.ngOnInit();
     }, (error: any) => {
       this.checkUserStatus();
       this.snackBar.open('Login was not successful, please check username and password', '',
         3000, "warning")
     });
  }


  /**
   * Loges the user out and shows a message if logout was successful
   */
  public logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('user');
    localStorage.clear()
    this.checkUserStatus();
    this.snackBar.open('You successfully logged out!', '', 3000, "success");
  }
changeResetPasword(){
  this.resetPassword=!(this.resetPassword)
}
getQuestions(){
  //var list=this.httpClient.get(environment.endpointURL + 'user/existanceOf/'+ this.userName);
  //list.subscribe(item=> userId=item.userId);
  //if(userId==null){
  //this.snackBar.open('It does not exist an user with the given userName', '', 3000);
  //}// else
    this.router.navigate(['resetPassword/'+this.userName])
 // list.subscribe(item=>this.test=item.toString)
}

toForgotPassword(){
  this.changeResetPasword()
}
toLogIn(){this.changeResetPasword()}
}
