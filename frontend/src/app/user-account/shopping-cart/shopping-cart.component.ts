import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../services/products.service";
import {BehaviorSubject, Observable} from "rxjs";
import {CurrentUser} from "../../services/current-user";
import {AuthService} from 'src/app/auth/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {environment} from 'src/environments/environment';
import {finalize, map} from "rxjs/operators";
import {ShoppingCart} from "../../models/shoppingCart.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ShoppingCartPurchase} from "../../models/shoppingCartPurchase.model";

export interface Country {
  value: string;
  display: string;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart$: Observable<ShoppingCart[]>;
  quantity = [];
  points$: Observable<number>;
  loggedIn$: BehaviorSubject<boolean>;
  userId: number;
  userToken: any;
  city$: Observable<any>;
  street$: Observable<any>;
  pinCode$: Observable<any>;
  country$: Observable<any>;
  shoppingCart: ShoppingCart[];
  totalPrice: number;
  shoppingCartPurchases$: Observable<ShoppingCartPurchase[]>;
  shoppingCartPurchases: ShoppingCartPurchase[];
  userAddress: string;
  userForm = this.fb.group(
    {
      country: ["", Validators.required],
      street: ["", Validators.required],
      city: ["", Validators.required],
      pinCode: ["", Validators.required],
    }
  );
  countrys: Country[] = [
    {value: 'panama', display: 'Panama'}, {value: 'France', display: 'France'}, {value: 'Russia', display: 'Russia'},
    {value: 'Ukraine', display: 'Ukraine  '}, {value: 'Switzerland', display: 'Switzerland'}, {
      value: 'Italy',
      display: 'Italy'
    },
  ];


  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private fb: FormBuilder,
              private productsService: ProductsService,
              private users: CurrentUser,
              private snackBar: MatSnackBar) {

    this.loggedIn$ = authService.loggedIn$;
  }

  ngOnInit(): void {
    this.getShoppingCart();
    this.calculatePrices();
    this.CreateShoppingCartPurchases();
    this.users.getCurrentUser().subscribe(user => {
      this.userAddress = [user.firstName, user.lastName, user.street, user.pinCode, user.city, user.country]
        .filter(Boolean).join(", ")})


    this.points$ = this.users.getCurrentUserProperty('moneyInWallet');
    if (this.loggedIn$.value == true) {
      this.userId = JSON.parse(localStorage.getItem('user')).userId;
      this.city$ = this.users.getCurrentUserProperty('city');
      this.street$ = this.users.getCurrentUserProperty('street');
      this.pinCode$ = this.users.getCurrentUserProperty('pinCode');
      this.country$ = this.users.getCurrentUserProperty('country');
    }
  }

  calculatePrices(): void {
    this.shoppingCart$.subscribe(shoppingCart => this.totalPrice = shoppingCart.reduce(
      (sum, current) => sum + current.product.price * current.quantity, 0))

  }

  getShoppingCart(): void {
    this.shoppingCart$ = this.httpClient.get<ShoppingCart[]>(environment.endpointURL + 'cart/getAll/' + JSON.parse(localStorage.getItem('user')).userId).pipe(map(shoppingCarts => shoppingCarts.filter(shoppingCart => shoppingCart.shoppingCart === true)));
    this.shoppingCart$.subscribe(shoppingCart => {
      this.shoppingCart = shoppingCart
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
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
            this.openSnackBar("Removed product from shopping cart", '');
          } else {
            this.openSnackBar(error.error.text, '');
          }})
    }
    this.ngOnInit();
  }

  deleteShoppingCartProduct(shoppingCartProduct: ShoppingCart): void {
    this.httpClient.delete(environment.endpointURL + 'cart/delete/' + shoppingCartProduct.cartId).subscribe((res: any) => {
      },
      (error: any) => {
        if (error.status === 200) {
          this.openSnackBar("Removed product from shopping cart", '');
        } else {
          this.openSnackBar(error.error.text, '');
        }})
    this.ngOnInit();
  }

  moveShoppingCartProductToWishList(shoppingCartProduct: ShoppingCart): void {
    this.httpClient.put(environment.endpointURL + 'cart/edit/' + shoppingCartProduct.cartId, {
      "wishList": true,
      "shoppingCart": false,
      "quantity": shoppingCartProduct.quantity
    }).subscribe((res: any) => {
      },
      (error: any) => {
        if (error.status === 200) {
          this.openSnackBar("Product moved to wish list", '');
        } else {
          this.openSnackBar(error.error.text, '');
        }})
    this.ngOnInit();
  }

  editShoppingCartProduct(shoppingCartProduct: ShoppingCart, quantity: number): void {
    this.httpClient.put(environment.endpointURL + 'cart/edit/' + shoppingCartProduct.cartId, {
      quantity: quantity
    }).subscribe((res: any) => {},
      (error: any) => {
        if (error.status === 200) {
          this.openSnackBar("Quantity updated", '');
        } else {
          this.openSnackBar(error.error.text, '');
        }})
    this.ngOnInit();
  }

  buyShoppingCartProducts(): void {
    this.shoppingCartPurchases$.subscribe(data => {
      this.shoppingCartPurchases = data;
      console.log(this.shoppingCartPurchases);
      this.httpClient.post(environment.endpointURL + 'purchase/addCart/', this.shoppingCartPurchases).subscribe(
        (res: any) => {},
        (error: any) => {
          if (error.status === 200) {
            this.openSnackBar("❤️❤️❤️ Thanks for shopping! ❤️❤️❤️", '');
          } else {
            this.openSnackBar(error.error.text, '');
          }})
      this.shoppingCart.forEach(shoppingCartProduct => {
        this.removeShoppingCartProduct(shoppingCartProduct)
      })})
  }

  private CreateShoppingCartPurchases() {
    this.shoppingCartPurchases$ = this.shoppingCart$.pipe(map(data => {
      return data.map(element => {
        return new ShoppingCartPurchase(
          element.product.productId,
          element.quantity,
          JSON.parse(localStorage.getItem('user')).userId,
          element.product.userId,
          this.userAddress,
        )})}))
  }

  updateAddress() {
    this.httpClient.put(environment.endpointURL + 'user/editUser/' + this.userId,
      this.userForm.value).subscribe();
    this.ngOnInit();
  }

  notEnoughMoney() {
    this.openSnackBar("Sorry, you don't have enough money. Please remove some products.", '');
  }

  get street() {
    return this.userForm.get("street")
  }

  get pinCode() {
    return this.userForm.get("pinCode")
  }

  get country() {
    return this.userForm.get("country")
  }

  get city() {
    return this.userForm.get("city")
  }
}
