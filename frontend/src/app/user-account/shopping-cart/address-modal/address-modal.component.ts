import { Component, OnInit } from '@angular/core';
import {ModalComponent} from "../../../modal/modal.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {FormBuilder, Validators} from "@angular/forms";
import {Country, ShoppingCartComponent} from "../shopping-cart.component";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../auth/auth.service";
import {ProductsService} from "../../../services/products.service";
import {CurrentUser} from "../../../services/current-user";
import {SnackBarService} from "../../../services/snackBar.service";
import {finalize, map} from "rxjs/operators";
import {ShoppingCartPurchase} from "../../../models/shoppingCartPurchase.model";
import {ShoppingCart} from "../../../models/shoppingCart.model";
import {ShoppingCartService} from "../../../services/shopping-cart.service";
import { MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.css']
})
export class AddressModalComponent implements OnInit  {
  loggedIn$: BehaviorSubject<boolean>;
  userId: number;
  city$: Observable<any>;
  street$: Observable<any>;
  pinCode$: Observable<any>;
  country$: Observable<any>;
  firstName$: Observable<any>;
  lastName$: Observable<any>;
  role$: Observable<any>;
  shoppingCartPurchases: ShoppingCartPurchase[];
  shoppingCart: ShoppingCart[];


  userForm = this.fb.group(
    {
      country: ["", Validators.required],
      street: ["", Validators.required],
      city: ["", Validators.required],
      pinCode: ["", Validators.required],
      role: this.users.getCurrentUserProperty('role'),
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
    }
  );
  countrys: Country[] = [
    {value: 'panama', display: 'Panama'}, {value: 'France', display: 'France'}, {value: 'Russia', display: 'Russia'},
    {value: 'Ukraine', display: 'Ukraine  '}, {value: 'Switzerland', display: 'Switzerland'}, {
      value: 'Italy',
      display: 'Italy'
    },
  ];

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              private httpClient: HttpClient,
              private authService: AuthService,
              private fb: FormBuilder,
              private productsService: ProductsService,
              private users: CurrentUser,
              private shoppingCartService: ShoppingCartService,
              ) {  }

  ngOnInit(): void {
      this.userId = JSON.parse(localStorage.getItem('user')).userId;
      this.city$ = this.users.getCurrentUserProperty('city');
      this.street$ = this.users.getCurrentUserProperty('street');
      this.pinCode$ = this.users.getCurrentUserProperty('pinCode');
      this.country$ = this.users.getCurrentUserProperty('country');
      this.firstName$ = this.users.getCurrentUserProperty('firstName');
      this.lastName$ = this.users.getCurrentUserProperty('lastName');
      this.role$ = this.users.getCurrentUserProperty('role');


  }

buyWithCurrentAddress() {
 this.shoppingCartService.buyShoppingCartProducts();
 this.shoppingCartService.ngOnInit()
}


  closeModal() {
    this.dialogRef.close();
  }


  updateAddressAndBuy(): void {
    this.httpClient.put(environment.endpointURL + 'user/editUser/' + this.userId, this.userForm.value)
      .subscribe((res: any) => {
    }, (error: any) => {
        if(error.status === 200) {
          this.shoppingCartService.buyShoppingCartProducts();
        }
      });
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

  get firstName() {
    return this.userForm.get("firstName")
  }

  get lastName() {
    return this.userForm.get("lastName")
  }

  get role() {
    return this.userForm.get("role")
  }
}
