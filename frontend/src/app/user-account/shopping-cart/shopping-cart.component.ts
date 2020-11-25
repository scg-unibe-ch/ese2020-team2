
import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../services/products.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../../models/product.model";
import {CurrentUser} from "../../services/current-user";
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {Review} from "../../models/review.model";
import {finalize, map, reduce} from "rxjs/operators";
import {ShoppingCart} from "../../models/shoppingCart.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Approval} from "../../models/approval";

export interface Country {
  value: string;
  display: string;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
  shoppingCart$: Observable<ShoppingCart[]>;
  quantity = [];
  points$: Observable<number>;
  loggedIn$: BehaviorSubject<boolean>;

  userForm = this.fb.group(
    {
      country: ["", Validators.required],
      street: ["", Validators.required],
      city: ["", Validators.required],
      pinCode: ["", Validators.required],
    }
  );

  countrys: Country[] = [
    {value: 'panama', display: 'Panama'},{value: 'France', display: 'France'},{value: 'Russia', display: 'Russia'},
    {value: 'Ukraine', display: 'Ukraine  '},{value: 'Switzerland', display: 'Switzerland'},{value: 'Italy', display: 'Italy'},

 ];
  userId: number;
  userToken: any;
  city$: Observable<any>;
  street$: Observable<any>;
  pinCode$: Observable<any>;
  country$: Observable<any>;
  shoppingCartProducts: ShoppingCart[];
  totalPrice: number;

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private fb: FormBuilder,
              private productsService: ProductsService,
              private users: CurrentUser,
              private snackBar: MatSnackBar) {

                this.loggedIn$ = authService.loggedIn$;
                };


  refresh(): void {
    window.location.reload();
  }



  ngOnInit(): void {
    this.getShoppingCart();
    this.calculatePrices();

    this.points$ = this.users.getCurrentUserProperty('moneyInWallet');
    if (this.loggedIn$.value == true){
      this.userId = JSON.parse(localStorage.getItem('user')).userId;
      this.city$ = this.users.getCurrentUserProperty('city');
      this.street$ = this.users.getCurrentUserProperty('street');
      this.pinCode$ = this.users.getCurrentUserProperty('pinCode');
      this.country$ = this.users.getCurrentUserProperty('country');
  }
  }

  calculatePrices(): void {
    this.shoppingCart$.subscribe(shoppingCart => this.totalPrice = shoppingCart.reduce((sum, current) => sum + current.product.price * current.quantity, 0))

  }

  getShoppingCart(): void {
    this.shoppingCart$ = this.httpClient.get<ShoppingCart[]>(environment.endpointURL + 'cart/getAll/' + JSON.parse(localStorage.getItem('user')).userId).
    pipe(map(shoppingCarts => shoppingCarts.filter(shoppingCart => shoppingCart.shoppingCart === true)));
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }

  removeShoppingCartProduct(shoppingCartProduct: ShoppingCart): void {
    if(shoppingCartProduct.wishList === false) {
      this.deleteShoppingCartProduct(shoppingCartProduct)
    } else {
      this.httpClient.put(environment.endpointURL + 'cart/edit/' + shoppingCartProduct.cartId , {
        shoppingCart: false
      }).subscribe((res: any) => {},
        (error: any) => {
          if(error.status === 200) {
            this.openSnackBar("Removed product from shopping cart", '');
          } else {
            this.openSnackBar(error.error.text, '');
          }
        })
    }
    this.ngOnInit();
  }

  deleteShoppingCartProduct(shoppingCartProduct: ShoppingCart): void {
    this.httpClient.delete(environment.endpointURL + 'cart/delete/' + shoppingCartProduct.cartId).subscribe((res: any) => {},
      (error: any) => {
        if(error.status === 200) {
          this.openSnackBar("Removed product from shopping cart", '');
        } else {
          this.openSnackBar(error.error.text, '');
        }
      })
    this.ngOnInit();
  }

  moveShoppingCartProductToWishList(shoppingCartProduct: ShoppingCart): void {
    this.httpClient.put(environment.endpointURL + 'cart/edit/' + shoppingCartProduct.cartId, {
      "wishList": true,
      "shoppingCart": false,
      "quantity": shoppingCartProduct.quantity
    }).subscribe((res: any) => {},
      (error: any) => {
        if(error.status === 200) {
          this.openSnackBar("Product moved to wish list", '');
        } else {
          this.openSnackBar(error.error.text, '');
        }
      })
    this.ngOnInit();
  }

  editShoppingCartProduct(shoppingCartProduct: ShoppingCart, quantity: number): void {
    this.httpClient.put(environment.endpointURL + 'cart/edit/' + shoppingCartProduct.cartId , {
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

  buyShoppingCartProducts(): void {
    this.shoppingCart$.pipe(
      finalize(() => {this.ngOnInit()})).
    subscribe(shoppingCartProducts => shoppingCartProducts.forEach(shoppingCart => this.buyShoppingCartProduct(shoppingCart)));
    this.openSnackBar("Thanks for shopping! ❤️❤️❤️", '')

  }

  buyShoppingCartProduct(shoppingCart: ShoppingCart): void {
    this.httpClient.post(environment.endpointURL + 'purchase/add/', {
      productId: shoppingCart.product.productId,
      quantity: shoppingCart.quantity,
      buyerUserId: JSON.parse(localStorage.getItem('user')).userId,
      sellerUserId: shoppingCart.product.userId,
      deliveryAddress: "kk",
    }).subscribe();

    this.httpClient.put(environment.endpointURL + 'cart/edit/' + JSON.parse(localStorage.getItem('user')).userId +'/'+ shoppingCart.product.productId , {
      shoppingCart: false
    }).subscribe();
  }


  updateaddress() {
    this.httpClient.put(environment.endpointURL + 'user/editUser/' + this.userId,
      this.userForm.value).subscribe();
    this.ngOnInit();


  };

  setaddress(){
  }

  get street() { return this.userForm.get("street") };
  get pinCode() { return this.userForm.get("pinCode") };
  get country() {return this.userForm.get("country")};
  get city() { return this.userForm.get("city") };


  notEnoughMoney() {
    this.openSnackBar("Sorry, you don't have enough money. Please remove some products.", '');
  }
}
