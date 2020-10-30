import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProductList } from '../models/product-list.model';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';
import { ProductsService } from '../services/products.service';
import {BehaviorSubject, Observable} from "rxjs";
import {filter, map} from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../services/current-user';

@Component({
  selector: 'app-catalog2',
  templateUrl: './catalog2.component.html',
  styleUrls: ['./catalog2.component.css']
})
export class Catalog2Component implements OnInit {
  loggedIn$: BehaviorSubject<boolean>;  products$: Observable<Product[]>;
  buyingUserId = localStorage.getItem('user');
  userId = 5;
  UserId = JSON.parse(this.buyingUserId);

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private users: CurrentUser,
              private productsService: ProductsService)
  {
    this.loggedIn$ = authService.loggedIn$
  }



  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter(product => product.status === "posted")));
  }




  filterlend() {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter( product => product.sellOrlend === "lend" && product.status === "posted" && product.adminApproval === "approved")
    )
  );
  }

  filtersell() {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter( product => product.sellOrlend === "sell" && product.status === "posted" && product.adminApproval === "approved")
    )
  );

  }
  filterproducts() {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter( product => product.type === "product" && product.status === "posted" && product.adminApproval === "approved")
    )
  );

  }
  filterservices() {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter( product => product.type === "service" && product.status === "posted" && product.adminApproval === "approved")
    )
  );
  }

  wish() {

  }

  buy(product: Product): void {
    this.httpClient.post(environment.endpointURL + 'purchase/add/', {
      productId: product.productId,
      quantity: 1,
      buyingUserId: this.UserId,
      deliveryAddress: "kk"}).subscribe();
  }
  refresh(): void {
    window.location.reload();
}


  }
