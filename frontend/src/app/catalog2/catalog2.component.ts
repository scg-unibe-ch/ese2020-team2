import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductList } from '../models/product-list.model';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-catalog2',
  templateUrl: './catalog2.component.html',
  styleUrls: ['./catalog2.component.css']
})
export class Catalog2Component implements OnInit {

  productList: ProductList;
  products: Product[];



  constructor(private httpClient: HttpClient,
    private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productList = this.productsService.getProducts();
    this.products = this.productList.products;
  }


}
