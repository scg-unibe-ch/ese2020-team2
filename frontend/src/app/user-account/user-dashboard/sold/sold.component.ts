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

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit {

  productList: ProductList;
  sells$: Observable<Purchase[]>;

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private soldService: SoldService,
    private users: CurrentUser) {

}

  ngOnInit(): void {
    this.sells$ = this.soldService.getSells().pipe(map(sells =>
      sells.filter(purchase => purchase.paymentType === 'wallet points')
    )
  );
    
  }
}
