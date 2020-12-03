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
  constructor(private authService: AuthService, private currentUser:CurrentUser,
    public matDialog: MatDialog) {

    this.loggedIn$ = authService.loggedIn$
  }
  ngOnInit(){
    this.getNoftification()
    this.loggedIn$ = this.authService.loggedIn$
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

  getNoftification(){
    this.listOfNotification$ = this.currentUser.getNotification()
  }
}
