import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpClient: HttpClient) {}


  getPurchases(): Observable<Purchase[]> {
    return this.httpClient.get<Purchase[]>(environment.endpointURL + 'purchase/getAllBuyerPurchases/' +
      JSON.parse(localStorage.getItem('user')).userId)
 }

  /**
   * Gets all the purchases of the provided user from the backend
   *
   * @param userId the user which purchases should be fetched from the backend
   */
  getPurchasesByUserId(userId: number): Observable<Purchase[]> {
    return this.httpClient.get<Purchase[]>(environment.endpointURL + 'purchase/getAllBuyerPurchases/' +
      JSON.parse(localStorage.getItem('user')).userId)
  }

}
