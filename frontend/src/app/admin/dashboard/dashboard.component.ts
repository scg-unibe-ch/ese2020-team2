import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../models/product.model";
import {TodoList} from "../../models/todo-list.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TodoItem} from "../../models/todo-item.model";
import {ProductList} from "../../models/product-list.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private httpClient: HttpClient,
              private productsService: ProductsService) {
  }
}
