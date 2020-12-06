import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Role} from "./models/role";
import {BehaviorSubject} from "rxjs";
import { Observable } from 'rxjs';
import { Purchase } from './models/purchase.model';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import {CurrentUser} from './services/current-user';
import {NotificationService} from "./services/notification.service";
import {SnackBarService} from "./services/snackBar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[AuthService]
})
export class AppComponent implements OnInit {
  loggedIn$: BehaviorSubject<boolean>;
  listOfNotification$:Observable<Purchase[]>;
  title = "frontend";
  userName$: Observable<String>;
  points$: Observable<number>;
  userToken: string;
  userName: string;


  constructor(public authService: AuthService,
              private currentUser:CurrentUser,
              public matDialog: MatDialog,
              private notificationService: NotificationService,
              private snackBar: SnackBarService,
              ) {
    this.loggedIn$ = this.authService.loggedIn$
    this.userName$ = this.currentUser.getCurrentUserProperty("userName");
    this.points$ = this.currentUser.getCurrentUserProperty("moneyInWallet")
  }

  ngOnInit(){
    this.getNotification()
    this.userName$ = this.currentUser.getCurrentUserProperty("userName");
    this.points$ = this.currentUser.getCurrentUserProperty("moneyInWallet")
  }
   get isAdmin() {
    return (this.authService.hasRole(Role.Admin) && this.authService.isAuthenticated());
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "50%";
    dialogConfig.width = "38%";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  getNotification(){
    this.listOfNotification$ = this.notificationService.getNotification()
  }

  /**
   * Loges the user out and shows a message if logout was successful
   */
  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('user');
    localStorage.clear()
    this.checkUserStatus();
    this.snackBar.open('You successfully logged out!', '', 3000, "success");
    window.location.reload();

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
}
