import { Component, OnInit } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']

})
export class WalletComponent {

  points = '';
  constructor(private httpClient: HttpClient) {}

  /**
   * !!!! Does not work yet!!!!!
   * Checks the database for the current points the user has
   */
  checkWallet(): void {
    this.httpClient.get(environment.endpointURL + '/' + localStorage.getItem('userToken')).subscribe((instances: any) => {
    this.points = instances.map((instance: any) => {
      this.points = instance.user.moneyInWallet;
    });
  });
}

}

