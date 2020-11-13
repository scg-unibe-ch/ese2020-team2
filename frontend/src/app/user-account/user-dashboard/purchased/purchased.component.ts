import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import { Purchase } from 'src/app/models/purchase.model';
import { environment } from 'src/environments/environment';
import {Approval} from "../../../models/approval";
import {Review} from "../../../models/review.model";

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css']
})
export class PurchasedComponent implements OnInit {

  productList: ProductList;
  purchases$: Observable<Purchase[]>;
  review = "";
  showReviewField: boolean;
  productsIds: number[];

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private purchaseService: PurchaseService,
    private users: CurrentUser) {

}

ngOnInit(): void {
  this.purchases$ = this.purchaseService.getPurchases();
  this.getReviewsOfUser();
  }

  getReviewsOfUser() {
    this.httpClient.get<Review[]>(environment.endpointURL + 'review/getBuyerReviews/' + JSON.parse(localStorage.getItem('user')).userId)
      .subscribe(reviews => {this.productsIds = reviews.map(review => review.productId)});
  }


}

