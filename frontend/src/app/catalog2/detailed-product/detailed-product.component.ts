import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../models/product.model";
import {Observable} from "rxjs";
import {defaultIfEmpty, filter, finalize, switchMap} from "rxjs/operators";
import {Approval} from "../../models/approval";
import {exitCodeFromResult} from "@angular/compiler-cli";

@Component({
  selector: 'app-detailed-product',
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.css']
})
export class DetailedProductComponent implements OnInit {

  productId: number;
  product$: Observable<Product>;
  product: Product;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

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
   * @param productID the id of the product that should be displayed in detail
   */
  loadProductDetails(productID){
      this.product$ = this.productsService.getProductById(productID).pipe(
      filter(product => product.adminApproval == Approval.approved && product.visibleInMarket == true),
      defaultIfEmpty(null))

    this.product$.subscribe(result => {
      if(result == null) {
        this.router.navigate(['/error/not-found'])
      }})
  }

}
