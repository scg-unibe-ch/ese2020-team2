import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lent',
  templateUrl: './lent.component.html',
  styleUrls: ['./lent.component.css']
})
export class LentComponent implements OnInit {

  productList: ProductList;
  products: Product[];

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private users: CurrentUser) {

}

  
  ngOnInit(): void {
    this.productList = this.productsService.getProducts();
    this.products = this.productList.products.filter(
      product => product.status === "lent").filter(
        product => product.userName === localStorage.getItem('userName')
      );
  }



  
  remove(){
    
  }
  

}
