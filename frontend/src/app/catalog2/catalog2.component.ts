import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProductList } from '../models/product-list.model';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';
import { ProductsService } from '../services/products.service';
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog2',
  templateUrl: './catalog2.component.html',
  styleUrls: ['./catalog2.component.css']
})
export class Catalog2Component implements OnInit {
  loggedIn$ = false;
  products$: Observable<Product[]>;



  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter(product => product.visibleInMarket === true)));
  }




  filterlend() {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter( product => product.sellOrlend === "lend" )
    )
  );
  }

  filtersell() {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter( product => product.sellOrlend === "sell" )
    )
  );
  }
  filterproducts() {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter( product => product.type === "product" )
    )
  );
  }
  filterservices() {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter( product => product.type === "service" )
    )
  );
  }

  wish() {

  }

  buy(purchase: Purchase): void {
    this.httpClient.put(environment.endpointURL + 'purchase/add/', {
      userId: localStorage.getItem('userName'),
      userId:
      productId:
      quantity:
    }).subscribe();
  }


  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private productsService: ProductsService) { authService.loggedIn$.subscribe((nextValue) => {
      this.loggedIn$ = nextValue;  // this will happen on every change
    })}




}
