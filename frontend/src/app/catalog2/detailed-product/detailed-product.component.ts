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
import {Location} from '@angular/common';
import {SnackBarService} from "../../services/snackBar.service";
import {WishListService} from "../../services/wish-list.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import { ProductImage } from '../../../../../backend/src/models/productImage.model';

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
  ratingArray = [];
  starCount = 5;
  quantity = 1;
  userId: number;
  url: string;

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
              private snackBar: SnackBarService,
              private location: Location,
              public wishListService: WishListService,
              public shoppingCartService: ShoppingCartService) {

    this.loggedIn$ = authService.loggedIn$;

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArray.push(index);
    }
  }


  /**
   * Gets the id of the product, that should be displayed in detail, from the url and loads the product.
   */
  ngOnInit() {
    this.loggedIn$ = this.authService.loggedIn$;
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id']; // (+) converts string 'id' to a number
    });
    this.getimage(this.productId);
    this.loadProductDetails(this.productId);
  }

  backClicked() {
    this.location.back();
  }
  getimage(id: number) {
    this.httpClient.get(environment.endpointURL + 'image/get/' + id).subscribe((data: ProductImage) => this.url = data[0]?.filePath
  );

}

  /**
   * Gets the product, but only if you are the admin or it is approved and simultaneously set to visible in the market
   *
   * If the product is not approved or visibleInMarket the user gets rerouted to an error page.
   * The rerouting also happens if the product does not exist (error 404) for users and admins.
   *
   * @param productId the id of the product that should be displayed in detail
   */
  loadProductDetails(productId){
    if(JSON.parse(localStorage.getItem('user')).role === 'user') {
      this.product$ = this.productsService.getProductById(productId).pipe(
        filter(product => product.adminApproval == Approval.approved && product.visibleInMarket == true),
        defaultIfEmpty(null))
    } else {
      this.product$ = this.productsService.getProductById(productId).pipe(defaultIfEmpty(null))
    }
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

  showIcon(index: number, rating: number) {
    if (rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
