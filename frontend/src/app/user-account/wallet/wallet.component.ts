import { Component, OnInit, AfterViewInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User, UserAttributes} from "../../../../../backend/src/models/user.model";
import {CurrentUser} from "../../services/current-user";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']

})
export class WalletComponent implements OnInit{

  points: number;

  constructor(private httpClient: HttpClient,
              private users: CurrentUser) {}

    ngOnInit() {
     this.checkWallet();
 }


  /**
   * Checks the database for the current points the user has
   */
    checkWallet(): void {
      setTimeout(()=> this.points = this.users.getCurrentUser().moneyInWallet,200);
    this.points = this.users.getCurrentUser().moneyInWallet;
  }

}

