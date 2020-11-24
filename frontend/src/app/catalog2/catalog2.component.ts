import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Product} from '../models/product.model';
import {ProductsService} from '../services/products.service';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from 'src/environments/environment';
import {CurrentUser} from '../services/current-user';
import {Options, LabelType} from 'ng5-slider';
import {Approval} from "../models/approval";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Type} from "../user-account/user-dashboard/edititem/edititem.component";

@Component({
  selector: 'app-catalog2',
  templateUrl: './catalog2.component.html',
  styleUrls: ['./catalog2.component.css']
})
export class Catalog2Component implements OnInit {
  loggedIn$: BehaviorSubject<boolean>;
  products$: Observable<Product[]>;
  ratingArray = [];
  starCount = 5;
  userId: number;
  sortby: string = "";
  search: string = "";
  location: string = "";
  filterps: string = "";
  filtersl: string = "";
  quantity: number[];
  loopnumber: number;
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
  a: number;


  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private users: CurrentUser,
              private productsService: ProductsService,
              private snackBar: MatSnackBar) {

    this.loggedIn$ = authService.loggedIn$;

    if (this.loggedIn$.value == true) {
      this.userId = JSON.parse(localStorage.getItem('user')).userId;
    }

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArray.push(index);
    }
  }


  changefiltersl(filtervalue: string) {
    this.filtersl = filtervalue;
  };

  changefilterps(filtervalue: string) {
    this.filterps = filtervalue;
  };

  changeminValue(value: number) {
    this.minValue = value;
  }

  changemaxValue(value: number) {
    this.maxValue = value;
  }

  changesearch(search: string) {
    this.search = search;
  }

  changesortby(sortby: string) {
    this.sortby = sortby;
  }

  changelocation(location: string) {
    this.location = location
  }

  ngOnInit(): void {
    this.getAllProducts();


  }


  filter(minValue: number, maxValue: number, filtersl: string, filterps: string, sortby: string, location: string, search: string) {
    if (search == "" && sortby == "") {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.price <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
            )).sort(x => x.isPremier ? -1 : 1)   
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.price <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
              && product.location.toLowerCase().includes(location.toLowerCase())
            )).sort(x => x.isPremier ? -1 : 1)   
          )
        )
      }
    } else if (search == "" && sortby == "maxprice") {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.price <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
            )).sort((a, b) => a.price < b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)  
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products => products.filter(product => (product.price >= minValue &&
            product.price <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps && product.location.toLowerCase().includes(location.toLowerCase())
          )).sort((a, b) => a.price < b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)  
          )
        )
      }
    } else if (search == "" && sortby == "lowestprice") {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products => products.filter(product => (product.price >= minValue &&
            product.price <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
          )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)  
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products => products.filter(product => (product.price >= minValue &&
            product.price <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps && product.location.toLowerCase().includes(location.toLowerCase())
          )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)  
          )
        )
      }
    } else if (sortby == "lowestprice") {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.price <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
            )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1) 
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products => products.filter(product => (product.price >= minValue && product.price <= maxValue
            && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps && product.location.toLowerCase().includes(location.toLowerCase())
          )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1) 
          )
        )
      }
    } else if (sortby == "maxprice") {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.price <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
            )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)  
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products => products.filter(product => (product.price >= minValue && product.price
            <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps && product.location.toLowerCase().includes(location.toLowerCase())
          )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)  
          )
        )

      }
    } else {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.price <= maxValue && product.status == "available" && (product.sellOrLend !== filtersl && product.type !== filterps)
              && (product.title.includes(search) || product.description.includes(search) || product.price == parseInt(search))))
              .sort((a, b) => a.price < b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)  
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.price <= maxValue && product.status == "available" && (product.sellOrLend !== filtersl && product.type !== filterps)
              && (product.title.includes(search) || product.description.includes(search) || product.price == parseInt(search)) && product.location.toLowerCase().includes(location.toLowerCase())))
              .sort((a, b) => a.price < b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)  
          )
        )
      }
    }

  }


  getAllProducts(): void {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
      products.filter(product => product.adminApproval == Approval.approved && product.visibleInMarket == true)));
      this.filter(this.minValue, this.maxValue, this.filtersl, this.filterps, this.sortby, this.location, this.search);
    this.products$.subscribe(products => {this.a = products.length; this.quantity = Array(this.a).fill(1)})
  }


  wish() {

  }

  buy(product: Product): void {
    this.httpClient.post(environment.endpointURL + 'purchase/add/', {
      productId: product.productId,
      quantity: this.quantity,
      buyerUserId: JSON.parse(localStorage.getItem('user')).userId,
      sellerUserId: product.userId,
      deliveryAddress: "kk"
    }).subscribe();
  }

  refresh(): void {
    window.location.reload();
  }

  showIcon(index: number, rating: number) {
    if (rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    })
  }

  addProductToShoppingCart(product: Product, quantity: number): void {
    this.httpClient.post(environment.endpointURL + 'cart/add',
      {
        "productId": product.productId,
        "userId": JSON.parse(localStorage.getItem("user")).userId,
        "quantity": quantity,
        "buyerUserId": JSON.parse(localStorage.getItem("user")).userId,
        "sellerUserId": product.userId,
        "shoppingCart": true,
        "wishList": false
      }
    ).subscribe((res: any) => {
      this.openSnackBar("Product was added to the shopping cart", '');
    }, (error: any) => {
      this.openSnackBar(error.error, '');
    });
  }


  addProductToWishList(product: Product, quantity: number) {
    this.httpClient.post(environment.endpointURL + 'cart/add',
      {
        "productId": product.productId,
        "userId": JSON.parse(localStorage.getItem("user")).userId,
        "quantity": quantity,
        "buyerUserId": JSON.parse(localStorage.getItem("user")).userId,
        "sellerUserId": product.userId,
        "wishList": true,
        "shoppingCart": false
      }
    ).subscribe((res: any) => {
      this.openSnackBar("Product was added to the wish list", '');
    }, (error: any) => {
      this.openSnackBar(error.error, '');
    });
  }
}
