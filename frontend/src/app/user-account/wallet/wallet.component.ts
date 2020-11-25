import { Component, OnInit, AfterViewInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CurrentUser} from '../../services/current-user';
import {Observable} from 'rxjs';
import { timeStamp } from 'console';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']

})
export class WalletComponent implements OnInit {

  currentUser$: Observable<any>;


  constructor(private httpClient: HttpClient,
              private users: CurrentUser) {
    this.currentUser$ = this.users.getCurrentUser();
  }

    ngOnInit() {
     this.checkCurrentUser();
      
 }

  /**
   * Checks the database for the current user
   */
  checkCurrentUser(): void {
     this.currentUser$ = this.users.getCurrentUser();


  }

}

