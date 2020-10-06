import {BehaviorSubject} from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService {
  loggedIn$ = new BehaviorSubject<boolean>(this.login);

  set login(value: boolean) {
    this.loggedIn$.next(value); // this will make sure to tell every subscriber about the change.
  }

  public isAuthenticated(): boolean {
    return !!(localStorage.getItem('userToken'));
  }

}
