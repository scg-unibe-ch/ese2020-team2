import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../services/products.service";
import {Observable} from "rxjs";
import {Product} from "../../models/product.model";
import {CurrentUser} from "../../services/current-user";

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

  constructor(private httpClient: HttpClient,
              private productsService: ProductsService,
              private users: CurrentUser) { }

  ngOnInit(): void {
    this.getShoppingCart();
    this.points$ = this.users.getCurrentUserProperty('moneyInWallet');

  }

  getShoppingCart(): void {
    this.shoppingCart$ = this.productsService.getProductsByMultipleIds(this.shoppingCart);
  }




}
