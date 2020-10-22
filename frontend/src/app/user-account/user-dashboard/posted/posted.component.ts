import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import { Routes } from '@angular/router';
import { EdititemComponent } from '../edititem/edititem.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent implements OnInit {

  productList: ProductList;
  products$: Observable<Product[]>;
  product: Product;
  
  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private users: CurrentUser) {

}


  ngOnInit(): void {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
        products.filter( product => product.status === "posted" )
      )
    );
  }

  removeitem(product: Product): void {
    this.httpClient.put(environment.endpointURL + 'product/delete' + product.productId, {
    }).subscribe();
  }


}