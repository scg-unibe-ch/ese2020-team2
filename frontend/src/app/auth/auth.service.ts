import {Injectable, OnInit} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {

  loggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('userToken'));

  getUsersStatus(): Observable<boolean> {
    if (!!localStorage.getItem('userToken')) {
      this.loggedInSubject.next(true);
    }
    else {
      this.loggedInSubject.next(false)
    }
    return this.loggedInSubject.asObservable();
  }

}
