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
import { environment } from 'src/environments/environment';
import { ProductImage } from '../../../../backend/src/models/productImage.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedIn$: BehaviorSubject<boolean>;
  products$: Observable<Product[]>;
  ratingArray = [];
  starCount = 5;
  //userId: number;
  sortby: string = "";
  search: string = "";
  location: string = "";
  filterps: string = "";
  filtersl: string = "";
  quantity: number[];
  loopnumber: number;
  minValue: number = 0;
  maxValue: number = 50;
  userId$: Observable<number>;
  a: number;
  urls = Array.apply(null, Array(100));





  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private users: CurrentUser,
    private productsService: ProductsService,
    public wishListService: WishListService,
    public shoppingCartService: ShoppingCartService) {

this.loggedIn$ = authService.loggedIn$;
    if (this.loggedIn$.value == true){
      this.userId$ = this.users.getCurrentUserProperty("userId")
    }

for (let index = 0; index < this.starCount; index++) {
this.ratingArray.push(index);
}
}

ngOnInit(): void {
  this.getAllProducts();
  this.userId$ = this.users.getCurrentUserProperty("userId")

}



getimage(id: number) {
  this.httpClient.get(environment.endpointURL + 'image/get/' + id).subscribe((data: ProductImage) => this.urls[id] = data[0].filePath
);
}


getAllProducts(): void {
  this.products$ = this.productsService.getProducts().pipe(map(products => products.filter(product => (product.status == "available"
  && product.adminApproval == Approval.approved && product.visibleInMarket == true && product.isPremier == true
  ))
  ))
  this.products$.subscribe(products => {this.a = products.length; this.quantity = Array(this.a).fill(1);
    const productIds = products.map(products => products.productId)
    for (var i = 0; i < productIds.length; i++) {
      this.getimage(productIds[i]);
      //Do something
  }})

}




showIcon(index: number, rating: number) {
if (rating >= index + 1) {
return 'star';
} else {
return 'star_border';
}
}
}

