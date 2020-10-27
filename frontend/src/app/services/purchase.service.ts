import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  productList: Observable<Purchase[]>;

  constructor(private httpClient: HttpClient) {}

  getPurchases(Userid: number) : Observable<Purchase[]> {
     return this.httpClient.get<Purchase[]>(environment.endpointURL + '/getAllUserPurchases/${Userid}')
  }

}