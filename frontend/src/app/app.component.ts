import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoList } from './models/todo-list.model';
import { TodoItem } from './models/todo-item.model';
import { environment } from '../environments/environment';
import {UserLoginComponent} from "./user-login/user-login.component";
import{FormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {runModuleAsObservableFork} from "@angular-devkit/build-angular/src/utils";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent {
  loggedIn$ = false;

  constructor(private authService: AuthService) {

    authService.loggedIn$.subscribe((nextValue) => {
      this.loggedIn$ = nextValue;  // this will happen on every change
    })
  }
}
