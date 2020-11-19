import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';
import {finalize, map} from "rxjs/operators";
import {Observable} from "rxjs";
import { Routes } from '@angular/router';
import { EdititemComponent } from '../edititem/edititem.component';
import { environment } from 'src/environments/environment';
import {TodoItem} from "../../../models/todo-item.model";


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
    this.getAllProducts()
  }

  /**
   *
   */
  getAllProducts(): void {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
        products.filter( product => product.userId === JSON.parse(localStorage.getItem('user')).userId)
      )
    );
  }

  /**
   * Deletes a product and updates the product list from the backend.
   *
   * @param product, that will be deleted
   */
  onProductDelete(product: Product): void{
    this.httpClient.delete(environment.endpointURL + 'product/delete/' + product.productId).pipe(
      finalize(() => this.getAllProducts())).subscribe()
  }
  changeVisibleInMarket(product: Product): void {
    product.visibleInMarket= !(product.visibleInMarket);
    this.httpClient.put(environment.endpointURL + 'product/edit/' + product.productId, {
     visibleInMarket: product.visibleInMarket
    }).subscribe();
  }


}
