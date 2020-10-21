import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProductList } from '../models/product-list.model';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-catalog2',
  templateUrl: './catalog2.component.html',
  styleUrls: ['./catalog2.component.css']
})
export class Catalog2Component implements OnInit {
  loggedIn$ = false;
productList: ProductList;
  products: Product[];

  ngOnInit(): void {
    this.productList = this.productsService.getProducts();
    this.products = this.productList.products.filter(
      product => product.status === "posted")
  }

  


  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private productsService: ProductsService) { authService.loggedIn$.subscribe((nextValue) => {
      this.loggedIn$ = nextValue;  // this will happen on every change
    })}

 


}
