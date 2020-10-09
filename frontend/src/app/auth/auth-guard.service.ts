import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**
 * Provides an authentication for route guards
 */
export class AuthGuardService implements CanActivate {

  loggedIn$ = false;

  constructor(private auth: AuthService, private router: Router) {
    auth.loggedIn$.subscribe((nextValue) => {
      this.loggedIn$ = nextValue;  // this will happen on every change
    })
  }

  /**
   * Checks if an user can access a given route, if not he is rerouted to the login page
   *
   * @return true, if user is logged in, false if user is not logged in.
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.router.parseUrl('/login');
    return false;
  }
}
