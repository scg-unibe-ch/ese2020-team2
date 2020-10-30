import {BehaviorSubject} from 'rxjs';
import {Injectable, OnInit} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})

/**
 * Keeps track if the user is logged in
 */
export class AuthService implements OnInit{

  loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this.CheckAccessToSecuredEndpoint();
  }

  ngOnInit() {
    this.CheckAccessToSecuredEndpoint();
  }

  /**
   * Checks if the user can access a secure endpoint that can only be accessed by users by providing their token.
   */
  CheckAccessToSecuredEndpoint() {
    this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
      this.login = true;
    }, (error: any) => {
      this.login = false
    });
  }

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
  public isAuthenticated(): Promise<boolean> {

    //this.CheckAccessToSecuredEndpoint();
    return this.loggedIn$.toPromise();
  }

  /**
   * Checks if the user has the required role
   *
   * @param role, the role the user should have to access
   * @return boolean, true if the user has the required role
   */
  hasRole(role: string) {
    return this.isAuthenticated() && JSON.parse(localStorage.getItem('user'))?.role === role;
  }

}
