import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../models/product.model";
import {BehaviorSubject, Observable} from "rxjs";
import {defaultIfEmpty, filter} from "rxjs/operators";
import {Approval} from "../../models/approval";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { environment } from 'src/environments/environment';
import {Review} from "../../models/review.model";

@Component({
  selector: 'app-detailed-product',
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.css']
})
export class DetailedProductComponent implements OnInit {

  productId: number;
  product$: Observable<Product>;
  loggedIn$: BehaviorSubject<boolean>;
  product: Product;
  reviews$: Observable<Review[]>;

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.loggedIn$ = authService.loggedIn$;
  }


  /**
   * Gets the id of the product, that should be displayed in detail, from the url and loads the product.
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id']; // (+) converts string 'id' to a number
    });

    this.loadProductDetails(this.productId);
  }

  /**
   * Gets the product, but only if it is approved and set to visible in the market
   *
   * If the product is not approved or visibleInMarket the user gets rerouted to an error page.
   * The rerouting also happens if the product does not exist (error 404).
   *
   * @param productId the id of the product that should be displayed in detail
   */
  loadProductDetails(productId){
    this.product$ = this.productsService.getProductById(productId).pipe(
      filter(product => product.adminApproval == Approval.approved && product.visibleInMarket == true),
      defaultIfEmpty(null))

    this.product$.subscribe(result => {
      if(result === null) {
        this.router.navigate(['/error/not-found'])
      }
      else {
        this.product = result
      }},
    error => {
      if (error.status ==404) {
        this.router.navigate(['/error/not-found'])
      }})
  }

  wish() {

  }

  buy(product: Product): void {
    this.httpClient.post(environment.endpointURL + 'purchase/add/', {
      productId: product.productId,
      quantity: 1,
      buyingUserId: JSON.parse(localStorage.getItem('user')).userId,
      deliveryAddress: "kk"});
  }

  refresh(): void {
    window.location.reload();
}



}
