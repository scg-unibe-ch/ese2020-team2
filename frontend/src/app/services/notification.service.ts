import { Injectable } from '@angular/core';
import {Purchase} from "../models/purchase.model";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) {}

  /**
   * Return all the purchases marked as new.
   * 
   * Normaly they rapresent a new sold/rented product, because of that they are notifications
   */
  getNotification(){
    return this.httpClient.get<Purchase[]>(environment.endpointURL + 'purchase/getAllSellerSold/'+
    JSON.parse(localStorage.getItem('user'))?.userId)
      .pipe(map((purchases: Purchase[]) => purchases.filter(purchase => purchase.notificationCheck === "new")
      ));
  }
  /**
   * Return the count of the purchases marked as new
   */
  getNumberOfnotification(){
    return this.getNotification().subscribe(value =>value.length);
  }

  /**
   * Updatees on the database the status of a given purchase
   * @param purchase 
   */
  checkNotification(purchase:Purchase){
    this.httpClient.put(environment.endpointURL + 'purchase/edit/' + purchase.getPurchaseId(), {"notificationCheck":true})
  }
}
