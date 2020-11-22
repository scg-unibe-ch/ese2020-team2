import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";
import {FormBuilder} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {CurrentUser} from "../../services/current-user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BehaviorSubject, Observable} from "rxjs";
import {ShoppingCart} from "../../models/shoppingCart.model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Product} from "../../models/product.model";

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
              private snackBar: MatSnackBar) {

    this.loggedIn$ = authService.loggedIn$;
  };

  ngOnInit(): void {
    this.getWishList();
    this.calculatePrices();

  }

  getWishList(): void {
    this.wishList$ = this.httpClient.get<ShoppingCart[]>(environment.endpointURL + 'cart/getAll/' + JSON.parse(localStorage.getItem('user')).userId).
    pipe(map(shoppingCarts => shoppingCarts.filter(shoppingCart => shoppingCart.wishList === true)));
  }

  calculatePrices(): void {
    this.wishList$.subscribe(shoppingCart => this.totalPrice = shoppingCart.reduce((sum, current) => sum + current.product.price * current.quantity, 0))

  }

  moveWishListProductToShoppingCart(wishListProduct: ShoppingCart) {
    this.httpClient.put(environment.endpointURL + 'cart/edit/' + wishListProduct.cartId , {
      "wishList": false,
      "shoppingCart": true,
      "quantity": wishListProduct.quantity
    }).subscribe((res: any) => {},
      (error: any) => {
        if(error.status === 200) {
          this.openSnackBar("Product moved to shopping cart", '');
        } else {
          this.openSnackBar(error.error.text, '');
        }
      })
    this.ngOnInit();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
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
            this.openSnackBar("Removed product from wish list", '');
          } else {
            this.openSnackBar(error.error.text, '');
          }
        })
    }
    this.ngOnInit();
  }

  deleteShoppingCartProduct(wishList: ShoppingCart): void {
    this.httpClient.delete(environment.endpointURL + 'cart/delete/' + wishList.cartId).subscribe((res: any) => {},
      (error: any) => {
        if(error.status === 200) {
          this.openSnackBar("Removed product from wish list", '');
        } else {
          this.openSnackBar(error.error.text, '');
        }
      })
    this.ngOnInit();
  }

  editWishListProduct(wishList: ShoppingCart, quantity: number): void {
    this.httpClient.put(environment.endpointURL + 'cart/edit/' + wishList.cartId , {
      quantity: quantity
    }).subscribe((res: any) => {},
      (error: any) => {
        if(error.status === 200) {
          this.openSnackBar("Quantity updated", '');
        } else {
          this.openSnackBar(error.error.text, '');
        }
      })
    this.ngOnInit();
  }
}
