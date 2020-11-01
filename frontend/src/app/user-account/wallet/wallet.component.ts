import { Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CurrentUser} from '../../services/current-user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']

})
export class WalletComponent implements OnInit {

  points$: Observable<any>;


  constructor(private httpClient: HttpClient,
              private users: CurrentUser) {
    this.points$ = this.users.getCurrentUserProperty('moneyInWallet');
  }

    ngOnInit() {
     this.checkWallet();
 }


  /**
   * Checks the database for the current points the user has
   */
  checkWallet(): void {
     this.points$ = this.users.getCurrentUserProperty('moneyInWallet');


  }

}

