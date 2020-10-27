import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css']
})
export class PurchasedComponent implements OnInit {

  productList: ProductList;
  products$: Observable<Product[]>;

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private users: CurrentUser) {

}


  ngOnInit(): void {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
        products.filter( product => product.status === "purchased" && product.userName === localStorage.getItem('userName') )
      )
    );
  }

}
