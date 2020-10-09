import { Component, OnInit, AfterViewInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User, UserAttributes} from "../../../../../backend/src/models/user.model";
import {CurrentUser} from "../../services/current-user";
import {BehaviorSubject, from, Subject} from "rxjs";
import {Observable} from "rxjs";
import {map, pluck} from "rxjs/operators";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']

})
export class WalletComponent implements OnInit{

  points$: Observable<any>;


  constructor(private httpClient: HttpClient,
              private users: CurrentUser) {
    this.points$ = this.users.getCurrentUserProperty("moneyInWallet");
  }

    ngOnInit() {
     this.checkWallet();
 }


  /**
   * Checks the database for the current points the user has
   */
  checkWallet(): void {
     this.points$ = this.users.getCurrentUserProperty("moneyInWallet");


  }

}

