import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from "rxjs";
import {Role} from "../models/role";

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
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.auth.isAuthenticated()) {
      this.router.parseUrl('login');
      return false;
    }

    const roles = route.data.roles as Role[];
    if (roles && !roles.some(r => this.auth.hasRole(r))) {
      this.router.parseUrl('error/not-found');
      return false;
    }

    return true;
  }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isAuthenticated()) {
      return false;
    }

    const roles = route.data && route.data.roles as Role[];
    if (roles && !roles.some(r => this.auth.hasRole(r))) {
      return false;
    }

    return true;
  }
}
