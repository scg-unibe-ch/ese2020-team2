import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Product} from '../models/product.model';
import {ProductsService} from '../services/products.service';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CurrentUser} from '../services/current-user';
import {Approval} from "../models/approval";
import {WishListService} from "../services/wish-list.service";
import {ShoppingCartService} from "../services/shopping-cart.service";
import { Options } from "@angular-slider/ngx-slider";
import { of } from 'rxjs';
import { max } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog2',
  templateUrl: './catalog2.component.html',
  styleUrls: ['./catalog2.component.scss']
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
    ceil: 100,
    translate: (value: number): string => {
      return '$' + value;
    },
    combineLabels: (minValue: string, maxValue: string): string => {
      return 'from ' + minValue + ' up to ' + maxValue;
    }

  };
  a: number;
  url: Object;


  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private users: CurrentUser,
              private productsService: ProductsService,
              public wishListService: WishListService,
              public shoppingCartService: ShoppingCartService) {

    this.loggedIn$ = authService.loggedIn$;
    if (this.loggedIn$.value == true){
    this.userId = JSON.parse(localStorage.getItem('user')).userId;
  }


    for (let index = 0; index < this.starCount; index++) {
      this.ratingArray.push(index);
    }
  }


  ngOnInit(): void {
    this.getAllProducts();
    this.getimage();
    this.authService.CheckAccessToSecuredEndpoint()
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



  filter(minValue: number, maxValue: number, filtersl: string, filterps: string, sortby: string, location: string, search: string) {
    if (search == "" && sortby == "") {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.price <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
            )).sort(x => x.isPremier ? -1 : 1)
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.price <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
              && product.location.toLowerCase().includes(location.toLowerCase())
            )).sort(x => x.isPremier ? -1 : 1)
          )
        )
      }
    } else if (search == "" && sortby == "maxprice") {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.price <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
            )).sort((a, b) => a.price < b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products => products.filter(product => (product.price >= minValue &&
            product.price <= maxValue && product.status == "available" && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.sellOrLend !== filtersl && product.type !== filterps && product.location.toLowerCase().includes(location.toLowerCase())
          )).sort((a, b) => a.price < b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)
          )
        )
      }
    } else if (search == "" && sortby == "lowestprice") {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products => products.filter(product => (product.price >= minValue &&
            product.price <= maxValue && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
          )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products => products.filter(product => (product.price >= minValue &&
            product.price <= maxValue && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps && product.location.toLowerCase().includes(location.toLowerCase())
          )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)
          )
        )
      }
    } else if (sortby == "lowestprice") {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.price <= maxValue && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
            )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products => products.filter(product => (product.price >= minValue && product.price <= maxValue
            && product.status == "available" && product.sellOrLend !== filtersl && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.type !== filterps && product.location.toLowerCase().includes(location.toLowerCase())
          )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)
          )
        )
      }
    } else if (sortby == "maxprice") {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.price <= maxValue && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.status == "available" && product.sellOrLend !== filtersl && product.type !== filterps
            )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products => products.filter(product => (product.price >= minValue && product.price
            <= maxValue && product.status == "available" && product.sellOrLend !== filtersl && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.type !== filterps && product.location.toLowerCase().includes(location.toLowerCase())
          )).sort((a, b) => a.price > b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)
          )
        )

      }
    } else {
      if (location == "") {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.price <= maxValue && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.status == "available" && (product.sellOrLend !== filtersl && product.type !== filterps)
              && (product.title.includes(search) || product.description.includes(search) || product.price == parseInt(search))))
              .sort((a, b) => a.price < b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)
          )
        )
      } else {
        this.products$ = this.productsService.getProducts().pipe(map(products =>
            products.filter(product => (product.price >= minValue && product.price <= maxValue && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.status == "available" && (product.sellOrLend !== filtersl && product.type !== filterps)
              && (product.title.includes(search) || product.description.includes(search) || product.price == parseInt(search)) && product.location.toLowerCase().includes(location.toLowerCase())))
              .sort((a, b) => a.price < b.price ? 1 : -1).sort(x => x.isPremier ? -1 : 1)
          )
        )
      }
    }
  }


  getAllProducts(): void {
      this.filter(this.minValue, this.maxValue, this.filtersl, this.filterps, this.sortby, this.location, this.search);
    this.products$.subscribe(products => {this.a = products.length; this.quantity = Array(this.a).fill(1)})
  }

  getimage() {
    this.httpClient.get(environment.endpointURL + 'image/get/2').subscribe(url => {
      this.url = url
        
    })
  }

  showIcon(index: number, rating: number) {
    if (rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
