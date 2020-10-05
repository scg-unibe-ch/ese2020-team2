import { Component, OnInit } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']

})
export class WalletComponent implements OnInit {

  points = '';
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + '/' + localStorage.getItem('userToken')).subscribe((instances: any) => {
      this.points = instances.map((instance: any) => {
        return instance.user.username;
      });
    });
  }
  /**
   * Checks the database for the current points the user has
   */
  checkWallet(): void {
    this.points = 'aaa';
  }

}

