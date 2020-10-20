import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit {

  productList: ProductList;
  products: Product[];

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private users: CurrentUser) {

}

  
  ngOnInit(): void {
    this.productList = this.productsService.getProducts();
    this.products = this.productList.products.filter(
      product => product.status === "sold").filter(
        product => product.userName === localStorage.getItem('userName')
      );
  }

  
  

}
