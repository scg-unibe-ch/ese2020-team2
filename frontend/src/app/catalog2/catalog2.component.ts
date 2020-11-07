import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { BehaviorSubject, Observable} from "rxjs";
import { map} from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../services/current-user';
import { Options, LabelType } from 'ng5-slider';
import {Approval} from "../models/approval";

@Component({
  selector: 'app-catalog2',
  templateUrl: './catalog2.component.html',
  styleUrls: ['./catalog2.component.css']
})
export class Catalog2Component implements OnInit {
  loggedIn$: BehaviorSubject<boolean>;
  products$: Observable<Product[]>;
  search: "";
  minValue: number = 0;
  maxValue: number = 50;
  options: Options = {
    floor: 0,
    ceil: 50,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private users: CurrentUser,
              private productsService: ProductsService) {

    this.loggedIn$ = authService.loggedIn$;
  }



  ngOnInit(): void {
    this.getAllProducts();
  }

  filterprice(minValue: number, maxValue: number) {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter( product => ( product.price >= minValue && product.price <= maxValue && product.status === "posted")
      )
    ));

  }


  getAllProducts(): void {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter(product => product.adminApproval == Approval.approved && product.visibleInMarket == true)));
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
      buyingUserId: JSON.parse(localStorage.getItem('user')).userId,
      sellerUserId: 1,
      deliveryAddress: "kk"}).subscribe();
  }
  refresh(): void {
    window.location.reload();
  }


  searchsite(search: string) {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
        products.filter( product => ( (product.title.includes(search) || product.description.includes(search) || product.price === parseInt(search)) && product.status === "posted"))
      )
    );

  }





}
