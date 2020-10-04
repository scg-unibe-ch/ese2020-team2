import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoList } from './models/todo-list.model';
import { TodoItem } from './models/todo-item.model';
import { environment } from '../environments/environment';
import {UserLoginComponent} from "./user-login/user-login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  userName = '';
  password = '';

  userToken: string;
  loggedIn = false;

  @ViewChild(UserLoginComponent) userLoginComponent:UserLoginComponent;

  ngOnInit() {
    this.loggedIn = this.userLoginComponent.getUsersStatus();
  }
}
