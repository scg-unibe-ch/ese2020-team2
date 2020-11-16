import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {find, map, pluck} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../../../../backend/src/models/user.model';
import {Purchase} from '../../../../backend/src/models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUser {
  UserId = JSON.parse(localStorage.getItem('user'))?.userId;
  currentUser: User;
  constructor(private httpClient: HttpClient) {}

    getCurrentUser(): Observable<User> {
      return this.httpClient.get<User[]>(environment.endpointURL + 'user/all').pipe(map(
        (users: User[]) => users.find(user => user.userName === localStorage.getItem('userName'))));
    }
  getCurrentUserProperty(property: string): Observable<any> {
    return this.httpClient.get<User[]>(environment.endpointURL + 'user/all').pipe(
      map((users: User[]) => users.find(user => user.userName === localStorage.getItem('userName'))),
      pluck(property));
  }
  getNotification(){
    return this.httpClient.get<Purchase[]>(environment.endpointURL + 'purchase/getAllSellerSold/'+  this.UserId)
    .pipe(map((purchases: Purchase[]) => purchases.filter(purchase => !(purchase.notificationCheck))
    ));
  }
  getNumberOfnotification(){
    return this.getNotification().subscribe(value =>value.length);
  }
}
