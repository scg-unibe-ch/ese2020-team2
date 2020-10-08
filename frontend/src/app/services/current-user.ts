import { Injectable } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../../../../backend/src/models/user.model";

@Injectable({
  providedIn: "root"
})
export class CurrentUser {

  currentUser: User
  constructor(private httpClient: HttpClient) {}

    getCurrentUser(): User {
      this.httpClient.get(environment.endpointURL + 'user/all')
        .subscribe((res: any) => {
          this.currentUser = res.find(user=> user.userName === localStorage.getItem('userName'));
        }, (error: any) => {
          this.currentUser = null;
        });
      return this.currentUser;
    }

}
