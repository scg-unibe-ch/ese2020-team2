import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SnackBarService} from "./snackBar.service";
import {ShoppingCart} from "../models/shoppingCart.model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(public httpClient: HttpClient,
              public snackBar: SnackBarService) { }


  getShoppingCart(): Observable<ShoppingCart[]> {
    return this.httpClient.get<ShoppingCart[]>(environment.endpointURL + 'cart/getAll/' + JSON.parse(localStorage.getItem('user')).userId)
      .pipe(map(shoppingCarts => shoppingCarts.filter(shoppingCart => shoppingCart.shoppingCart === true)))
  }
  addProductToShoppingCart(product: Product, quantity: number): void {
    this.httpClient.post(environment.endpointURL + 'cart/add',
      {
        "productId": product.productId,
        "userId": JSON.parse(localStorage.getItem("user")).userId,
        "quantity": quantity,
        "buyerUserId": JSON.parse(localStorage.getItem("user")).userId,
        "sellerUserId": product.userId,
        "shoppingCart": true,
        "wishList": false
      }
    ).subscribe((res: any) => {
      this.snackBar.open("Product was added to the shopping cart", '', 3000);
    }, (error: any) => {
      this.snackBar.open(error.error, '', 3000);
    });
  }
}
