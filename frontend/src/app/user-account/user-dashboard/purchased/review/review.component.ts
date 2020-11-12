import {Component, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../../../services/products.service";
import {AuthService} from "../../../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {defaultIfEmpty, filter} from "rxjs/operators";
import {Approval} from "../../../../models/approval";
import {Product} from "../../../../models/product.model";
import {environment} from "../../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EventEmitter} from "events";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  productId: number;
  product$: Observable<Product>;
  loggedIn$: BehaviorSubject<boolean>;
  product: Product;
  userId: number;
  review: string;
  purchaseId: number;
  ratingArray = [];
  rating: number = 0;
  starCount: number = 5;

  constructor(private httpClient: HttpClient,
              private productsService: ProductsService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public snackBar: MatSnackBar) {

    this.loggedIn$ = authService.loggedIn$;
  }

  /**
   * Gets the id of the product, that should be displayed in detail, from the url and loads the product.
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id'];
      this.purchaseId = +params['purchaseId'];
      this.userId = +params['buyerId']
    });
    this.loadProductDetails(this.productId);

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArray.push(index);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
    })}


  /**
   * Gets the product, but only if it is approved and set to visible in the market
   *
   * If the product is not approved the user gets rerouted to an error page.
   * The rerouting also happens if the product does not exist (error 404).
   *
   * @param productId the id of the product that should be displayed in detail
   */
  loadProductDetails(productId){
    this.product$ = this.productsService.getProductById(productId).pipe(
      filter(product => product.adminApproval == Approval.approved),
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

  submitReview() {
    this.httpClient.post(environment.endpointURL + 'review/add',
      {
        "buyerUserId": +localStorage.getItem('userId'),
        "sellerUserId": this.product.userId,
        "productId": this.product.productId,
        "purchaseId": this.purchaseId,
        "reviewText": this.review,
        "rating": this.rating,
      }
    ).subscribe((res: any) => {
      this.openSnackBar("The post of the review was successful", '');
    }, (error: any) => {
      this.openSnackBar(error.error, '');
    });

  }


    addReview() {

  }

  cancelReview() {


  }

  onRating(rating:number) {
    console.log(rating)
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: 3000
    });
    this.rating = rating;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}

