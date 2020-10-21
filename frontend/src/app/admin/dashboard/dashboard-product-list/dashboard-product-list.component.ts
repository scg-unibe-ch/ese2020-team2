import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from "../../../../environments/environment";
import {Product} from "../../../models/product.model";
import {ProductList} from "../../../models/product-list.model";
import {Observable} from "rxjs";
import {TodoItem} from "../../../models/todo-item.model";
import {TodoList} from "../../../models/todo-list.model";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-dashboard-product-list',
  templateUrl: './dashboard-product-list.component.html',
  styleUrls: ['./dashboard-product-list.component.css'],
})
export class DashboardProductListComponent {

  productList$: Observable<Product[]>;


  constructor(private httpClient: HttpClient,
              private productsService: ProductsService) {}


  ngOnInit(): void {
    this.productList$ = this.productsService.getProducts();
  }


  onProductUpdate(product: Product): void{
    this.httpClient.put(environment.endpointURL + 'product/edit/' + product.productId, {
      adminApproval: product.adminApproval,
      disapprovalMsg: product.disapprovalMsg,
    }).subscribe();
  }

}



