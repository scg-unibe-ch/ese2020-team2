import { Component, OnInit } from "@angular/core";
import {environment} from "../../environments/environment";
import {TodoItem} from "../models/todo-item.model";
import {TodoList} from "../models/todo-list.model";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../backend/src/models/user.model";
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';
import {CurrentUser} from '../services/current-user';
import { PostItemComponent } from './post-item/post-item.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';

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
  constructor(private currentUser:CurrentUser, private router:Router) {
    this.navLinks = [
      {
          label: 'Wallet',
          link: './wallet',
          index: 0
      }, {
          label: 'Post Item',
          link: './postItem',
          index: 1
      }, {
          label: 'Dashboard',
          link: './dashboard',
          index: 2
      }, 
  ];
  }

  ngOnInit(){
    this.updateIndex()
    this.getNoftification()
    this.listOfNotification$.subscribe(list => this.listOfNot=list)
  }

  getNoftification(){
    this.listOfNotification$ = this.currentUser.getNotification()
  }
  updateIndex(){
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  }
}

