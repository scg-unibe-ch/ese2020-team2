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

  getNotification(){
    return this.httpClient.get<Purchase[]>(environment.endpointURL + 'purchase/getAllSellerSold/'+
    JSON.parse(localStorage.getItem('user'))?.userId)
      .pipe(map((purchases: Purchase[]) => purchases.filter(purchase => purchase.notificationCheck === "new")
      ));
  }
  getNumberOfnotification(){
    return this.getNotification().subscribe(value =>value.length);
  }
  checkNotification(purchase:Purchase){
    this.httpClient.put(environment.endpointURL + 'purchase/edit/' + purchase.getPurchaseId(), {"notificationCheck":true})
  }
}
