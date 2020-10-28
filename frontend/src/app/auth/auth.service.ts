import {BehaviorSubject} from 'rxjs';
import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {Role} from "../models/role";

@Injectable({providedIn: 'root'})

/**
 * Keeps track if the user is logged in
 */
export class AuthService {
  private user: User;

  loggedIn$ = new BehaviorSubject<boolean>(this.login);

  /**
   * It will make sure to tell every subscriber about the change.
   *
   * @param value, true or false depending if user is logged in or not.
   */
  set login(value: boolean) {
    this.loggedIn$.next(value); // this will make sure to tell every subscriber about the change.
  }

  /**
   * Checks if a user is logged in
   *
   * @return ture or false, depending if user is logged in or not
   */
  public isAuthenticated(): boolean {
    return !!(localStorage.getItem('userToken'));
  }

  hasRole(role: string) {
    return this.isAuthenticated() && JSON.parse(localStorage.getItem('user')).role === role;
  }




}
