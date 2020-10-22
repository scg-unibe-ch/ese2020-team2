import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from "../../../../environments/environment";
import {Product} from "../../../models/product.model";
import {ProductList} from "../../../models/product-list.model";
import {Observable} from "rxjs";
import {TodoItem} from "../../../models/todo-item.model";
import {TodoList} from "../../../models/todo-list.model";
import {ProductsService} from "../../../services/products.service";
import {map} from "rxjs/operators";
import {Approval} from "../../../models/approval";

@Component({
  selector: 'app-dashboard-product-list',
  templateUrl: './dashboard-product-list.component.html',
  styleUrls: ['./dashboard-product-list.component.css'],
})
export class DashboardProductListComponent {

  productList$: Observable<Product[]>;
  filter = null;
  Approval = Approval;

  constructor(private httpClient: HttpClient,
              private productsService: ProductsService) {}


  ngOnInit(): void {
    this.productList$ = this.productsService.getProducts();
  }

  /**
   * Filters all the products regarding their approval status.
   *
   * @param approval, can be pending, rejected, approved and null (for no filter)
   */
  filterProducts(approval: Approval): void{
    if (approval !== null) {
      this.productList$ = this.productsService.getProducts().pipe(map(products =>
        products.filter(product => product.adminApproval === approval)))
    }
    else {
      this.productList$ = this.productsService.getProducts()
    }
  }

  /**
   * Updates the product regarding it's approval and the disapproval message.
   *
   * If the product is approved, the disapproval message gets deleted.
   *
   * @param product, the product that was edited
   */
  onProductUpdate(product: Product): void{
    if(product.adminApproval === Approval.approved) {
      product.disapprovalMsg = '';
    }
    this.httpClient.put(environment.endpointURL + 'product/edit/' + product.productId, {
      adminApproval: product.adminApproval,
      disapprovalMsg: product.disapprovalMsg,
    }).subscribe();

    this.filterProducts(this.filter)
  }

}



