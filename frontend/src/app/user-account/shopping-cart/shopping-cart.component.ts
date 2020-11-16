
import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../services/products.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../../models/product.model";
import {CurrentUser} from "../../services/current-user";
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder } from '@angular/forms';
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
  private shoppingCart = [2,1,3,4,5];
  shoppingCart$: Observable<Product[]>;
  quantity = 1;
  points$: Observable<number>;
  loggedIn$: BehaviorSubject<boolean>;
  userForm = this.fb.group(
    {
      country: [""],
      street: [""],
      city: [""],
      pinCode: [""],
    }
  );

  countrys: Country[] = [
    {value: 'panama', display: 'Panama'},{value: 'France', display: 'France'},{value: 'Russia', display: 'Russia'},
    {value: 'Ukraine', display: 'Ukraine  '},{value: 'Switzerland', display: 'Switzerland'},{value: 'Italy', display: 'Italy'},

 ];

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private fb: FormBuilder,
              private productsService: ProductsService,
              private users: CurrentUser) {
                this.loggedIn$ = authService.loggedIn$;
                if (this.loggedIn$.value == true){
                  this.userForm.controls.street.setValue(
                  (JSON.parse(localStorage.getItem('user')).street));
                  this.userForm.controls.city.setValue(
                    (JSON.parse(localStorage.getItem('user')).city));
                    this.userForm.controls.pinCode.setValue(
                      (JSON.parse(localStorage.getItem('user')).pinCode));
                      this.userForm.controls.country.setValue(
                        (JSON.parse(localStorage.getItem('user')).country));
                
              }};

  

  

  ngOnInit(): void {
    this.getShoppingCart();
    this.points$ = this.users.getCurrentUserProperty('moneyInWallet');

  }

  getShoppingCart(): void {
    this.shoppingCart$ = this.productsService.getProductsByMultipleIds(this.shoppingCart);
  }
  updateaddress() {
    this.httpClient.post(environment.endpointURL + 'user/register',
      this.userForm.value).subscribe((res: any) => {
      this.openSnackBar('You successfully registered!', '');
    }, (error: any) => {
      this.openSnackBar('Registering was not possible, please try again', '');
    }),this.router.navigate(['login', {queryParams: { registered: 'true' } }]);

  };

  get street() { return this.userForm.get("street") };
  get pinCode() { return this.userForm.get("pinCode") };
  get country() {return this.userForm.get("country")};
  get city() { return this.userForm.get("city") };



}