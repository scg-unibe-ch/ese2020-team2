import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Purchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class SoldService {

  constructor(private httpClient: HttpClient) {}


  UserId = JSON.parse(localStorage.getItem('user')).userId;

  getSells() : Observable<Purchase[]> {
    return this.httpClient.get<Purchase[]>(environment.endpointURL + 'purchase/getAllSellerSoldProducts/' + this.UserId)
 }

 getlends() : Observable<Purchase[]> {
  return this.httpClient.get<Purchase[]>(environment.endpointURL + 'purchase/getAllSellerLendServices/' + this.UserId)
}
}
