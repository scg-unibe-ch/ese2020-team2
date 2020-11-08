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
  search: string = "";
  filtervalue: string = "";
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



  changefiltervalue(filtervalue: string){
    this.filtervalue = filtervalue;
  };

  
  ngOnInit(): void {
    this.getAllProducts();
  }

  filter(minValue: number, maxValue: number, filtervalue: string, search:string ) {
    if (search == "" && filtervalue == ""){
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter( product => ( product.price >= minValue && product.price <= maxValue && product.status === "available" 
       ))
      )
    );
    }
    else if (search == ""){
      this.products$ = this.productsService.getProducts().pipe(map(products =>
        products.filter( product => ( product.price >= minValue && product.price <= maxValue && product.status === "available" && (product.sellOrLend === filtervalue || product.type === filtervalue)
         ))
        )
      );
    }
    else if (filtervalue == ""){
      this.products$ = this.productsService.getProducts().pipe(map(products =>
        products.filter( product => ( product.price >= minValue && product.price <= maxValue && product.status === "available" 
        && (product.title.includes(search) || product.description.includes(search) || product.price === parseInt(search)) ))
        )
      );
    }
    else {
      this.products$ = this.productsService.getProducts().pipe(map(products =>
        products.filter( product => ( product.price >= minValue && product.price <= maxValue && product.status === "available" && (product.sellOrLend === filtervalue || product.type === filtervalue)
        && (product.title.includes(search) || product.description.includes(search) || product.price === parseInt(search)) ))
        )
      );
    }

  }


  getAllProducts(): void {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter(product => product.adminApproval == Approval.approved && product.visibleInMarket == true)));
  }


  wish() {

  }

  buy(product: Product): void {
    this.httpClient.post(environment.endpointURL + 'purchase/add/', {
      productId: product.productId,
      quantity: 1,
      buyerUserId: JSON.parse(localStorage.getItem('user')).userId,
      sellerUserId: product.userId,
      deliveryAddress: "kk"}).subscribe();
  }
  refresh(): void {
    window.location.reload();
  }




}
