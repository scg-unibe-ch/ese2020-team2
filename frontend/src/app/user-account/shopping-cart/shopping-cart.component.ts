import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../services/products.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../../models/product.model";
import { AuthService } from 'src/app/auth/auth.service';
import { Validators, FormBuilder } from '@angular/forms';
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
street= "";
pinCode= "";
city= "";
country= "";
loggedIn$: BehaviorSubject<boolean>;
shoppingCart$: Observable<Product[]>;
private products: Product[];
quantity = 1;
userForm = this.fb.group(
{
country: ["",Validators.required],
street: ["",Validators.required],
city: ["",Validators.required],
pinCode: ["",Validators.required],
}
);

constructor(private httpClient: HttpClient,
private authService: AuthService,
private fb: FormBuilder,
private productsService: ProductsService) { 
this.loggedIn$ = authService.loggedIn$;
if (this.loggedIn$.value == true){
this.city = JSON.parse(localStorage.getItem('user')).city;
this.pinCode = JSON.parse(localStorage.getItem('user')).pinCode;
this.street = JSON.parse(localStorage.getItem('user')).street;
this.country = JSON.parse(localStorage.getItem('user')).country;
}
}
countrys: Country[] = [
{value: 'panama', display: 'Panama'},{value: 'France', display: 'France'},{value: 'Russia', display: 'Russia'},
{value: 'Ukraine', display: 'Ukraine '},{value: 'Switzerland', display: 'Switzerland'},{value: 'Italy', display: 'Italy'},

];

ngOnInit(): void {
this.getShoppingCart();
}

getShoppingCart(): void {
this.shoppingCart$ = this.productsService.getProductsByMultipleIds(this.shoppingCart);
}

}