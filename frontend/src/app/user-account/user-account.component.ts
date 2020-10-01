import { Component, OnInit } from "@angular/core";
import {UserLoginComponent} from "../user-login/user-login.component";

@Component({
  providers: [UserLoginComponent],
  selector: 'app-user-account',
  templateUrl: './user-account.component.html'
})
export class UserAccountComponent implements OnInit {

  constructor(private UserLoginComponent: UserLoginComponent ) { }

  ngOnInit(): void {
    this.UserLoginComponent.checkUserStatus();
  }

}

