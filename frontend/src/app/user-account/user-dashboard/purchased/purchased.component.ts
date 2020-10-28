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

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css']
})
export class PurchasedComponent implements OnInit {

  productList: ProductList;
  purchases$: Observable<Purchase[]>;

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private purchaseService: PurchaseService,
    private users: CurrentUser) {

}

  ngOnInit(): void {
    this.purchases$ = this.purchaseService.getPurchases().pipe(map(purchases =>
      purchases.filter(purchase => purchase.paymentType === 'wallet points')
    )
  );
    
  }
}

