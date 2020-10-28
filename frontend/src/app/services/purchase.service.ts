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
  buyingUserId = localStorage.getItem('user');
userId = 5;
UserId = parseInt(this.buyingUserId[10]);

  getPurchases() : Observable<Purchase[]> {
    return this.httpClient.get<Purchase[]>(environment.endpointURL + 'purchase/getAllUserPurchases/' + this.UserId)
 }
}
