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
      this.loggedIn$ = nextValue;
    })
  }

  /**
   * Checks if an user can access a given route, if not he is rerouted to the login page
   *
   * @return true, if user is logged in, false if user is not logged in.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const roles = route.data.roles as Role[];
    if (roles && !roles.some(r => this.auth.hasRole(r))) {
      this.router.navigate(['/error/not-found']);
      return false;
    }

    return true;
  }

  /**
   * Checks if the user should be able to load this page.
   *
   * @param route, the route the user tries to access.
   */
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    const roles = route.data && route.data.roles as Role[];
    if (roles && !roles.some(r => this.auth.hasRole(r))) {
      this.router.navigate(['/error/not-found']);
      return false;
    }

    return true;
  }
}
