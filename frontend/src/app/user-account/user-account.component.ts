import { Component, OnInit } from "@angular/core";
import {environment} from "../../environments/environment";
import {TodoItem} from "../models/todo-item.model";
import {TodoList} from "../models/todo-list.model";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../backend/src/models/user.model";
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';
import {CurrentUser} from '../services/current-user';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit{

  listOfNotification$:Observable<Purchase[]>;
  listOfNot:Array<Purchase>= new Array;
  constructor(private currentUser:CurrentUser) {}

  ngOnInit(){
    this.getNoftification()
    this.listOfNotification$.subscribe(list => this.listOfNot=list)
  }

  getNoftification(){
    this.listOfNotification$ = this.currentUser.getNotification()
  }
}

