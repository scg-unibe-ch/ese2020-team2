import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { SoldService } from 'src/app/services/sold.service';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';
import {map} from "rxjs/operators";
import { Purchase } from 'src/app/models/purchase.model';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit {

  productList: ProductList;
  sells$: Observable<Purchase[]>;
  listOfProduct:Purchase[];

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private soldService: SoldService,
    private users: CurrentUser) {

}

  ngOnInit(): void {
    this.sells$ = this.soldService.getSells().pipe(map(sells =>
      sells.filter(purchase => purchase.paymentType === 'wallet points')
    ));
    this.sells$.subscribe(list => list.forEach(element => {
      this.checkNotification(element.purchaseId)
    }));
    this.sells$.subscribe(list =>this.listOfProduct=list);
  }
  checkNotification(purchaseId:number){
    this.users.checkNotification(purchaseId)
  }
}
