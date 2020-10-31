import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../models/product.model";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter, finalize, map, switchMap} from "rxjs/operators";
import {Approval} from "../models/approval";
import {exitCodeFromResult} from "@angular/compiler-cli";
import { CurrentUser } from '../services/current-user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detailed-product',
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.css']
})
export class DetailedProductComponent implements OnInit {

  productId: number;
  product$: Observable<Product>;
  product: Product;
  loggedIn$ = false;
  sub: any;
  buyingUserId = localStorage.getItem('user');
  userId = 5;
  UserId = parseInt(this.buyingUserId[10]);



  constructor(private httpClient: HttpClient,
    private authService: AuthService,
    private users: CurrentUser,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService) { authService.loggedIn$.subscribe((nextValue) => {
      this.loggedIn$ = nextValue;  // this will happen on every change
    })}

  
  /**
   * Gets the id of the product, that should be displayed in detail, from the url and loads the product.
   */



  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id']; // (+) converts string 'id' to a number
    });
    this.productsService.getProducts().pipe(map(products =>
      products.filter(product => product.productId === this.productId))).subscribe(products => {
      this.product = products.pop();
    })
  }



  wish() {

  }

  buy(product: Product): void {
    this.httpClient.post(environment.endpointURL + 'purchase/add/', {
      productId: product.productId,
      quantity: 1,
      buyingUserId: this.UserId,
      deliveryAddress: "kk"}).subscribe();
  }
  refresh(): void {
    window.location.reload();
}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  /**
   * Gets the product, but only if it is approved and set to visible in the market
   *
   * @param productID the id of the product that should be displayed in detail
   */
  loadProductDetails(productID){
      this.product$ = this.productsService.getProductById(productID).pipe(
      filter(product => product.adminApproval == Approval.approved && product.visibleInMarket == true),
      defaultIfEmpty(null))

   
  }

}
