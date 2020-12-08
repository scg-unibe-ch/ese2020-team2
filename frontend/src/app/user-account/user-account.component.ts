import { Component, OnInit } from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../backend/src/models/user.model";
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';
import {CurrentUser} from '../services/current-user';
import { PostItemComponent } from './post-item/post-item.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit{
  title = 'angular-material-tab-router';
  navLinks: any[];
  activeLinkIndex = -1;
  listOfNotification$:Observable<Purchase[]>;
  listOfNot:Array<Purchase>= new Array;
  showNotification: boolean;
  constructor(private currentUser:CurrentUser,
              private router:Router,
              public matDialog: MatDialog,
              private notificationService: NotificationService) {

    this.updateIndex()

    this.navLinks = [
      {
          label: 'Post Item',
          link: './postItem',
          index: 0
      }, {
          label: 'Dashboard',
          link: './dashboard',
          index: 1
      },
  ];
  }
  openNotifications() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "50%";
    dialogConfig.width = "38%";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(NotificationModalComponent, dialogConfig);
  }

  ngOnInit(){
    this.getNotification()
    //this.listOfNotification$.subscribe(list => this.listOfNot=list)
    this.listOfNotification$.subscribe(purchases => {this.showNotification = purchases.length >= 1})
  }

  getNotification(){
    this.listOfNotification$ = this.notificationService.getNotification()
  }

  updateIndex(){
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  }
}

