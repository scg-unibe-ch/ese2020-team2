import { Component, OnInit } from "@angular/core";
import {environment} from "../../environments/environment";
import {TodoItem} from "../models/todo-item.model";
import {TodoList} from "../models/todo-list.model";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../../backend/src/models/user.model";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit{

  user = '';
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + '' + localStorage.getItem('userToken')).subscribe((instances: any) => {
      this.user = instances.map((instance: any) => {
        return instance.userName;
      });
    });
  }


}

