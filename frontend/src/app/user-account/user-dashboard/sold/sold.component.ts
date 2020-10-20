import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit {

  productList: ProductList;
  products: Product[];

  ngOnInit(): void {
    this.productList = this.productsService.getProducts();
    this.products = this.productList.products;
  }

  


  constructor(private httpClient: HttpClient,
    private productsService: ProductsService) {}

 

}
