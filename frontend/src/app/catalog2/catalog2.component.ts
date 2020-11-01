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
import { CurrentUser } from '../services/current-user';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-catalog2',
  templateUrl: './catalog2.component.html',
  styleUrls: ['./catalog2.component.css']
})
export class Catalog2Component implements OnInit {
  loggedIn$ = false;
  products$: Observable<Product[]>;
  buyingUserId = localStorage.getItem('user');
  userId = 5;
  UserId = parseInt(this.buyingUserId[10]);
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
    private productsService: ProductsService) { authService.loggedIn$.subscribe((nextValue) => {
      this.loggedIn$ = nextValue;  // this will happen on every change
    })}



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


searchsite(search: string) {
  this.products$ = this.productsService.getProducts().pipe(map(products =>
    products.filter( product => ( (product.title.includes(search) || product.description.includes(search) || product.price === parseInt(search)) && product.status === "posted"))
  )
);

}





  }
