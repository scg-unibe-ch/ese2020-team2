import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CurrentUser } from '../services/current-user';
import { Approval } from "../models/approval";
import { WishListService } from "../services/wish-list.service";
import { ShoppingCartService } from "../services/shopping-cart.service";
import { Options } from "@angular-slider/ngx-slider";
import { of } from 'rxjs';
import { max } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductImage } from '../../../../backend/src/models/productImage.model';

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
  userId$: Observable<string>;
  sortby: string = "";
  search: string = "";
  location: string = "";
  filterps: string = "";
  filtersl: string = "";
  quantity: number[];
  loopnumber: number;
  minValue: number = 0;
  maxValue: number = 9999;
  ceil: number = 9999;

  options: Options = {
    floor: 0,
    ceil: this.ceil,
    translate: (value: number): string => {
      return '$' + value;
    },
    combineLabels: (minValue: string, maxValue: string): string => {
      return 'from ' + minValue + ' up to ' + maxValue;
    }

  };
  a: number;
  urls = Array.apply(null, Array(100));



  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private users: CurrentUser,
    private productsService: ProductsService,
    public wishListService: WishListService,
    public shoppingCartService: ShoppingCartService) {

    this.loggedIn$ = authService.loggedIn$;
    if (this.loggedIn$.value == true) {
      this.userId$ = this.users.getCurrentUserProperty("userId")
    }


    for (let index = 0; index < this.starCount; index++) {
      this.ratingArray.push(index);
    }
  }




  ngOnInit(): void {
    this.userId$ = this.users.getCurrentUserProperty("userId")
    this.getAllProducts();
    this.changeSliderOptions();
    this.authService.CheckAccessToSecuredEndpoint()
  }

  getimage(id: number) {
    this.httpClient.get(environment.endpointURL + 'image/get/' + id).subscribe((data: ProductImage) => this.urls[id] = data[0]?.filePath
    );
  }
  /**
   * Changes the ciel of the price filter (slider)
   */
  changeSliderOptions() {
    this.productsService.getProducts().subscribe(products => {
      const newOptions: Options = Object.assign({}, this.options);
      this.ceil = Math.max.apply(Math, products.filter(product =>
        product.visibleInMarket == true && product.adminApproval == "approved").map(
          function (o) { return o.price; }))
      
      this.ceil = Math.ceil(this.ceil / 10) * 10;
      if(!(this.ceil >= 0 && this.ceil <= 1000)){
        this.ceil = 100;
      }
      newOptions.ceil = this.ceil;
      this.options = newOptions;
      this.changemaxValue();
    })
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

  changemaxValue() {
    this.maxValue = this.ceil;
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
    this.products$.subscribe(products => {
      this.a = products.length; this.quantity = Array(this.a).fill(1);
      const productIds = products.map(products => products.productId)
      for (var i = 0; i < productIds.length; i++) {
        this.getimage(productIds[i]);
        //Do something
      }
    })
  }



  getimageparam(id: number) {
    return this.httpClient.get<ProductImage>(environment.endpointURL + 'image/get/' + id).pipe(map(products =>
      products.filePath));

  }




  showIcon(index: number, rating: number) {
    if (rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
