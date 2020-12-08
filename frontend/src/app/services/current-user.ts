import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { find, map, pluck } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../../../../backend/src/models/user.model';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUser {
  UserId: number;
  currentUser: User;
  constructor(private httpClient: HttpClient) {
    this.UserId = JSON.parse(localStorage.getItem('user'))?.userId;
  }
  /**
   * gives the current user's informations
   */
  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User[]>(environment.endpointURL + 'user/all').pipe(map(
      (users: User[]) => users.find(user => user.userName === localStorage.getItem('userName'))));
  }
  /**
   * Returns the current user's propriety given from the paramiter
   * @param property a string which rapresents the parameter wanted
   */
  getCurrentUserProperty(property: string): Observable<any> {
    return this.httpClient.get<User[]>(environment.endpointURL + 'user/all').pipe(
      map((users: User[]) => users.find(user => user.userName === localStorage.getItem('userName'))),
      pluck(property));
  }
}
