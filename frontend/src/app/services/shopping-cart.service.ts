import { Injectable, OnInit } from '@angular/core';
import { Product } from "../models/product.model";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { SnackBarService } from "./snackBar.service";
import { ShoppingCart } from "../models/shoppingCart.model";
import { finalize, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ShoppingCartPurchase } from "../models/shoppingCartPurchase.model";
import { CurrentUser } from "./current-user";

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

  /**
   * Gets the all the products in the current user's shopping cart
   */
  getShoppingCart(): Observable<ShoppingCart[]> {
    return this.httpClient.get<ShoppingCart[]>(environment.endpointURL + 'cart/getAll/' + JSON.parse(localStorage.getItem('user')).userId)
      .pipe(map(shoppingCarts => shoppingCarts.filter(shoppingCart => shoppingCart.shoppingCart === true)))
  }

  /**
   * Adds the given product in the shopping cart of the current user.
   * 
   * Informs with a snackBar if the product was putted on the shopping cart
   * @param product that the user whats to put in the shopping cart
   * @param quantity of the product that the user wants to put in the shoppin cart
   */
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
      }
    });
  }

  /**
   * Gets the user's adresse information
   */
  getAddressAsString() {
    this.users.getCurrentUser().subscribe(user => {
      this.userAddress = [user.firstName, user.lastName, user.street, user.pinCode, user.city, user.country]
        .filter(Boolean).join(", ")
    })
  }
  /**
   * Gets the value in the shopping cart of the user in the shoppingCart variable
   */
  getShoppingCartForService(): void {
    this.shoppingCart$ = this.getShoppingCart()
    this.shoppingCart$.subscribe(shoppingCart => { this.shoppingCart = shoppingCart })
  }

  /**
   * Purchase each element in the shoppin cart of the user and romoves it from the shopping cart
   */
  buyShoppingCartProducts(): void {
    this.ngOnInit()
    this.shoppingCartPurchases$.pipe(finalize(() => {
      this.ngOnInit();
    }))
      .subscribe(data => {
        this.shoppingCartPurchases = data;
        this.httpClient.post(environment.endpointURL + 'purchase/addCart/', this.shoppingCartPurchases).subscribe(
          (res: any) => { },
          (error: any) => {
            if (error.status === 200) {
              this.shoppingCart.forEach(shoppingCartProduct => { this.removeShoppingCartProduct(shoppingCartProduct, false) })
              this.snackBar.open("❤️❤️❤️ Thanks for shopping! ❤️❤️❤️", '', 2000, "success");
            } else {
              this.snackBar.open(error.error, '', 3000, "warning");
            }
          })
      })
  }

  /**
   * Creates the ShoppingCartPurchases to facilitate the buying of the product
   */
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
        )
      })
    }))
  }

  /**
   * Removes the given poducts from the shopping cart and displays a messages, if the given boolean is true
   * @param shoppingCartProduct to remove from the shopping Cart of the current user
   * @param message 
   */
  removeShoppingCartProduct(shoppingCartProduct: ShoppingCart, message: boolean): void {
    if (shoppingCartProduct.wishList === false) {
      this.deleteShoppingCartProduct(shoppingCartProduct, message)
    } else {
      this.httpClient.put(environment.endpointURL + 'cart/edit/' + shoppingCartProduct.cartId, {
        shoppingCart: false
      }).subscribe(
        (res: any) => { },
        (error: any) => {
          if (error.status === 200 && message) {
            this.snackBar.open("Removed product from shopping cart", '', 2000, "success");
          } else {
            if (message) {
              this.snackBar.open(error.error.text, '', 2000, "warning");
            }
          }
        })
    }
    this.ngOnInit();
  }

  /**
   * Delites the product from the shopping cart
   * 
   * It can display a message if the given boolean is true
   * @param shoppingCartProduct that we want to delete
   * @param message true if we want to display a message
   */
  deleteShoppingCartProduct(shoppingCartProduct: ShoppingCart, message: boolean): void {
    this.httpClient.delete(environment.endpointURL + 'cart/delete/' + shoppingCartProduct.cartId).subscribe((res: any) => { },
      (error: any) => {
        if (error.status === 200 && message) {
          this.snackBar.open("Removed product from shopping cart", '', 2000, "success");
        } else {
          if (message) {
            this.snackBar.open(error.error.text, '', 2000, "warning");
          }
        }
      })
    this.ngOnInit();
  }







}
