import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";
import {FormBuilder} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {CurrentUser} from "../../services/current-user";
import {BehaviorSubject, Observable} from "rxjs";
import {ShoppingCart} from "../../models/shoppingCart.model";
import {environment} from "../../../environments/environment";
import {SnackBarService} from "../../services/snackBar.service";
import {WishListService} from "../../services/wish-list.service";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  wishList$: Observable<ShoppingCart[]>;
  loggedIn$: BehaviorSubject<boolean>;
  quantity = [];
  totalPrice: number;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private fb: FormBuilder,
              private productsService: ProductsService,
              private users: CurrentUser,
              private snackBar: SnackBarService,
              private wishListService: WishListService) {

    this.loggedIn$ = authService.loggedIn$;
  };

  ngOnInit(): void {
    this.wishList$ = this.wishListService.getWishList()
    this.calculatePrices();
  }

  calculatePrices(): void {
    this.wishList$.subscribe(shoppingCart => this.totalPrice = shoppingCart
      .reduce((sum, current) => sum + current.product.price * current.quantity, 0))
  }

  moveWishListProductToShoppingCart(wishListProduct: ShoppingCart) {
    this.httpClient.put(environment.endpointURL + 'cart/edit/' + wishListProduct.cartId , {
      "wishList": false,
      "shoppingCart": true,
      "quantity": wishListProduct.quantity
    }).subscribe((res: any) => {},
      (error: any) => {
        if(error.status === 200) {
          this.snackBar.open("Product moved to shopping cart", '', 3000);
        } else {
          this.snackBar.open(error.error.text, '', 3000);
        }})
    this.ngOnInit();
  }


  removeShoppingCartProduct(wishList: ShoppingCart): void {
    if(wishList.shoppingCart === false) {
      this.deleteShoppingCartProduct(wishList)
    } else {
      this.httpClient.put(environment.endpointURL + 'cart/edit/' + wishList.cartId , {
        wishList: false
      }).subscribe((res: any) => {},
        (error: any) => {
          if(error.status === 200) {
            this.snackBar.open("Removed product from wish list", '', 3000);
          } else {
            this.snackBar.open(error.error.text, '', 3000);
          }})}
    this.ngOnInit();
  }

  deleteShoppingCartProduct(wishList: ShoppingCart): void {
    this.httpClient.delete(environment.endpointURL + 'cart/delete/' + wishList.cartId).subscribe((res: any) => {},
      (error: any) => {
        if(error.status === 200) {
          this.snackBar.open("Removed product from wish list", '', 3000);
        } else {
          this.snackBar.open(error.error.text, '', 3000);
        }})
    this.ngOnInit();
  }

  editWishListProduct(wishList: ShoppingCart, quantity: number): void {
    this.httpClient.put(environment.endpointURL + 'cart/edit/' + wishList.cartId , {
      quantity: quantity
    }).subscribe((res: any) => {},
      (error: any) => {
        if(error.status === 200) {
          this.snackBar.open("Quantity updated", '', 3000);
        } else {
          this.snackBar.open(error.error.text, '', 3000);
        }})
    this.ngOnInit();
  }

}
