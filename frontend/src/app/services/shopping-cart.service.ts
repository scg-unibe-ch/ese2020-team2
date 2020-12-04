import {Injectable, OnInit} from '@angular/core';
import {Product} from "../models/product.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SnackBarService} from "./snackBar.service";
import {ShoppingCart} from "../models/shoppingCart.model";
import {finalize, map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ShoppingCartPurchase} from "../models/shoppingCartPurchase.model";
import {CurrentUser} from "./current-user";
import {ShoppingCartComponent} from "../user-account/shopping-cart/shopping-cart.component";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService implements OnInit {
  shoppingCartPurchases$: Observable<ShoppingCartPurchase[]>;
  shoppingCartPurchases: ShoppingCartPurchase[];
  shoppingCart$: Observable<ShoppingCart[]>;
  shoppingCart: ShoppingCart[];
  userAddress: string;

  constructor(public httpClient: HttpClient,
              public snackBar: SnackBarService,
              private users: CurrentUser) { }


  ngOnInit() {

    this.getShoppingCartForService();
    this.CreateShoppingCartPurchases();
    this.getAddressAsString();
  }

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
      this.snackBar.open("Product was added to the shopping cart", '', 3000, "success");
    }, (error: any) => {
      if (error.status === 200) {
        this.snackBar.open("Product was added to the shopping cart", '', 3000, "success");
      } else {
        this.snackBar.open(error.error, '', 3000, "warning");
      }});
  }


   getAddressAsString() {
    this.users.getCurrentUser().subscribe(user => {
      this.userAddress = [user.firstName, user.lastName, user.street, user.pinCode, user.city, user.country]
        .filter(Boolean).join(", ")
    })
  }

  getShoppingCartForService(): void {
    this.shoppingCart$ = this.getShoppingCart()
    this.shoppingCart$.subscribe(shoppingCart => {this.shoppingCart = shoppingCart})
  }


  buyShoppingCartProducts(): void {
    this.ngOnInit()
    this.shoppingCartPurchases$.pipe(finalize(() => this.ngOnInit()))
      .subscribe(data => {
        this.shoppingCartPurchases = data;
        this.httpClient.post(environment.endpointURL + 'purchase/addCart/', this.shoppingCartPurchases).subscribe(
          (res: any) => {},
          (error: any) => {
            if (error.status === 200) {
              this.snackBar.open("❤️❤️❤️ Thanks for shopping! ❤️❤️❤️", '', 2000, "success");
              this.shoppingCart.forEach(shoppingCartProduct => {this.removeShoppingCartProduct(shoppingCartProduct)})
            } else {
              this.snackBar.open(error.error, '', 3000, "warning");
            }})
        })
  }

   CreateShoppingCartPurchases() {
    this.shoppingCartPurchases$ = this.shoppingCart$.pipe(map(data => {
      return data.map(element => {
        return new ShoppingCartPurchase(
          element.product.productId,
          element.quantity,
          JSON.parse(localStorage.getItem('user')).userId,
          element.product.userId,
          this.userAddress,
          element.deliveryRequested
        )})}))
  }

  removeShoppingCartProduct(shoppingCartProduct: ShoppingCart): void {
    if (shoppingCartProduct.wishList === false) {
      this.deleteShoppingCartProduct(shoppingCartProduct)
    } else {
      this.httpClient.put(environment.endpointURL + 'cart/edit/' + shoppingCartProduct.cartId, {
        shoppingCart: false
      }).subscribe((res: any) => {
        },
        (error: any) => {
          if (error.status === 200) {
            this.snackBar.open("Removed product from shopping cart", '', 2000, "success");
          } else {
            this.snackBar.open(error.error.text, '', 2000, "warning");
          }})
    }
    this.ngOnInit();
  }


  deleteShoppingCartProduct(shoppingCartProduct: ShoppingCart): void {
    this.httpClient.delete(environment.endpointURL + 'cart/delete/' + shoppingCartProduct.cartId).subscribe((res: any) => {
      },
      (error: any) => {
        if (error.status === 200) {
          this.snackBar.open("Removed product from shopping cart", '', 2000, "success");
        } else {
          this.snackBar.open(error.error.text, '', 2000, "warning");
        }})
  }







}
