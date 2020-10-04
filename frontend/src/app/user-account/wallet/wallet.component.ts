import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']

})
export class WalletComponent implements OnInit {

  points = 0;

  ngOnInit(): void {
    this.checkWallet();
  }

  /**
   * Checks the database for the current points the user has
   */
  checkWallet(): void {
    this.points = 0;
  }

}

