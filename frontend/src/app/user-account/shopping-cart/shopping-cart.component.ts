import {Component, Inject, OnInit} from '@angular/core';
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
import {SnackBarService} from "../../services/snackBar.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ModalComponent} from "../../modal/modal.component";
import {AddressModalComponent} from "./address-modal/address-modal.component";
import { ProductImage } from '../../../../../backend/src/models/productImage.model';
import {Router} from "@angular/router";

export interface Country {
  value: string;
  display: string;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart$: Observable<ShoppingCart[]>;
  quantity: number[];
  deliveryRequested: boolean[];
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
  urls = Array.apply(null, Array(100));
  userForm = this.fb.group(
    {
      country: ["", Validators.required],
      street: ["", Validators.required],
      city: ["", Validators.required],
      pinCode: ["", Validators.required],
      role: ["admin"]
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
              private snackBar: SnackBarService,
              private shoppingCartService: ShoppingCartService,
              private matDialog: MatDialog,
              private router: Router) {

    this.shoppingCart$ = this.shoppingCartService.getShoppingCart()
    this.loggedIn$ = authService.loggedIn$;

    matDialog.afterAllClosed.subscribe(() => {
          this.ngOnInit();})

  }

  ngOnInit(): void {

    this.getShoppingCart();
    this.calculatePrices();
    this.CreateShoppingCartPurchases();
    this.getAddressAsString();
    this.getUserMoney();


    if (this.loggedIn$.value == true) {
      this.userId = JSON.parse(localStorage.getItem('user')).userId;
      this.city$ = this.users.getCurrentUserProperty('city');
      this.street$ = this.users.getCurrentUserProperty('street');
      this.pinCode$ = this.users.getCurrentUserProperty('pinCode');
      this.country$ = this.users.getCurrentUserProperty('country');
    }

  }

  getimage(id: number) {
    this.httpClient.get(environment.endpointURL + 'image/get/' + id).subscribe((data: ProductImage) => this.urls[id] = data[0].filePath
  );

}


  private getUserMoney() {
    this.points$ = this.users.getCurrentUserProperty('moneyInWallet');
  }

  private getAddressAsString() {
    this.users.getCurrentUser().subscribe(user => {
      this.userAddress = [user.firstName, user.lastName, user.street, user.pinCode, user.city, user.country]
        .filter(Boolean).join(", ")
    })
  }

  calculatePrices(): void {
    this.shoppingCart$.subscribe(shoppingCart => this.totalPrice = shoppingCart.reduce(
      (sum, current) => sum + current.product.price * current.quantity, 0))

  }

  getShoppingCart(): void {
    this.shoppingCart$ = this.shoppingCartService.getShoppingCart()
    this.shoppingCart$.subscribe(shoppingCart => {
      this.shoppingCart = shoppingCart;
      const productIds = shoppingCart.map(shoppingCart => shoppingCart.productId)
      this.quantity = shoppingCart.map(shoppingCart => shoppingCart.quantity)
      this.deliveryRequested = shoppingCart.map(shoppingCart => shoppingCart.deliveryRequested)
      for (var i = 0; i < productIds.length; i++) {
        this.getimage(productIds[i]);
    }
    })
  }

  removeShoppingCartProduct(shoppingCartProduct: ShoppingCart, message: boolean): void {
    if (shoppingCartProduct.wishList === false) {
      this.deleteShoppingCartProduct(shoppingCartProduct, message)
    } else {
      this.httpClient.put(environment.endpointURL + 'cart/edit/' + shoppingCartProduct.cartId, {
        shoppingCart: false
      }).subscribe(
        (res: any) => {},
        (error: any) => {
          if (error.status === 200 && message) {
            this.snackBar.open("Removed product from shopping cart", '', 2000, "success");
            this.ngOnInit();
          } else {
            if(message) {
              this.snackBar.open(error.error.text, '', 2000, "warning");
            }}
          this.ngOnInit();
        })
    }
  }

  deleteShoppingCartProduct(shoppingCartProduct: ShoppingCart, message: boolean): void {
    this.httpClient.delete(environment.endpointURL + 'cart/delete/' + shoppingCartProduct.cartId).subscribe(
      (res: any) => {},
      (error: any) => {
        if (error.status === 200 && message) {
          this.snackBar.open("Removed product from shopping cart", '', 2000, "success");
          this.ngOnInit();
        } else {
          if(message) {
            this.snackBar.open(error.error.text, '', 2000, "warning");
          }}
        this.ngOnInit();
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
        if (error.status === 200) {
          this.snackBar.open("Product moved to wish list", '', 2000, "info");
        } else {
          this.snackBar.open(error.error.text, '',2000, "warning");
        }})
    this.ngOnInit();
  }

  editShoppingCartProduct(shoppingCartProduct: ShoppingCart, quantity: number, deliveryRequested: boolean): void {
    this.httpClient.put(environment.endpointURL + 'cart/edit/' + shoppingCartProduct.cartId, {
      quantity: quantity,
      deliveryRequested: deliveryRequested,
    }).subscribe((res: any) => {},
      (error: any) => {
        if (error.status === 200) {
          this.ngOnInit();
          this.snackBar.open("Shopping card has been updated", '', 2000, "info");
        } else {
          this.snackBar.open(error.error.text, '', 2000, "warning");
        }})
  }

  buyShoppingCartProducts(): void {
    this.ngOnInit()
    this.shoppingCartPurchases$.pipe(finalize(() => {
      this.ngOnInit();
    }))
      .subscribe(data => {
        this.shoppingCartPurchases = data;
        this.httpClient.post(environment.endpointURL + 'purchase/addCart/', this.shoppingCartPurchases).subscribe(
          (res: any) => {},
          (error: any) => {
            if (error.status === 200) {
              this.shoppingCart.forEach(shoppingCartProduct => {this.removeShoppingCartProduct(shoppingCartProduct, false)})
              this.snackBar.open("❤️❤️❤️ Thanks for shopping! ❤️❤️❤️", '', 2000, "success");
              this.ngOnInit();
            } else {
              this.snackBar.open(error.error, '', 3000, "warning");
            }
            this.router.navigate(['/shopping-cart'])
          })
      })
    this.ngOnInit();

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
          element.deliveryRequested
        )})}))
  }

  updateAddress() {
    this.httpClient.put(environment.endpointURL + 'user/editUser/' + this.userId,
      this.userForm.value).subscribe();
    this.ngOnInit();
  }

  notEnoughMoney() {
    this.snackBar.open("Sorry, you don't have enough money. Please remove some products.", '',
      2000, "warning");
  }

  openModal() {
    this.shoppingCartService.ngOnInit();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "65%";
    dialogConfig.width = "50%";
    const modalDialog = this.matDialog.open(AddressModalComponent, dialogConfig);
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

