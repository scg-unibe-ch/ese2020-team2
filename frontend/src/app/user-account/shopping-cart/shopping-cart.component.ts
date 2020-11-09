import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../services/products.service";
import {Observable} from "rxjs";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private shoppingCart = [2,1,3,4,5];
  shoppingCart$: Observable<Product[]>;
  private products: Product[];
  quantity = 1;

  constructor(private httpClient: HttpClient,
              private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getShoppingCart();
  }

  getShoppingCart(): void {
    this.shoppingCart$ = this.productsService.getProductsByMultipleIds(this.shoppingCart);
  }


}
