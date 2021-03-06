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


  getSells() : Observable<Purchase[]> {
    return this.httpClient.get<Purchase[]>(environment.endpointURL + 'purchase/getAllSellerSoldProducts/' +
      JSON.parse(localStorage.getItem('user')).userId)
 }

 getlends() : Observable<Purchase[]> {
  return this.httpClient.get<Purchase[]>(environment.endpointURL + 'purchase/getAllSellerLendServices/' +
    JSON.parse(localStorage.getItem('user')).userId)
}
}
