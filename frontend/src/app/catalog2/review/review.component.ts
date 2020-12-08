import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../services/products.service";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {defaultIfEmpty, filter, finalize, map} from "rxjs/operators";
import {Approval} from "../../models/approval";
import {Product} from "../../models/product.model";
import {environment} from "../../../environments/environment";
import {Review} from "../../models/review.model";
import {PurchaseService} from "../../services/purchase.service";
import {SnackBarService} from "../../services/snackBar.service";
import {DetailedProductComponent} from "../detailed-product/detailed-product.component";

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
  reviewText: string;
  rating: number;
  purchasedProducts: number[];
  ratingArray = [];
  starCount = 5;
  review$: Observable<Review[]>;
  reviewExists: boolean;
  reviewId: number;
  reviews$: Observable<Review[]>;
  showReview = false;

  constructor(private httpClient: HttpClient,
              private productsService: ProductsService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public snackBar: SnackBarService,
              public purchaseService: PurchaseService,
              private detailedProduct: DetailedProductComponent) {

    this.loggedIn$ = authService.loggedIn$;
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArray.push(index);
    }
  }

  /**
   * Gets the id of the product, that should be displayed in detail, from the url and loads the product.
   */
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id'];
    });
    this.loadProductDetails(this.productId);
    this.loadReview(this.productId);
    this.loadAllReviewsOfProduct(this.productId);
    this.purchaseService.getPurchasesByUserId(JSON.parse(localStorage.getItem('user')).userId)
      .subscribe(purchases => {this.purchasedProducts = purchases.map(purchase => purchase.productId)});

  }



  /**
   * Gets the product, but only if it is approved and set to visible in the market
   *
   * If the product is not approved the user gets rerouted to an error page.
   * The rerouting also happens if the product does not exist (error 404).
   *
   * @param productId the id of the product that should be displayed in detail
   */
  loadProductDetails(productId: number) {
    this.product$ = this.productsService.getProductById(productId).pipe(
      filter(product => product.adminApproval == Approval.approved),
      defaultIfEmpty(null))

    this.product$.subscribe(result => {
        if (result === null) {
          this.router.navigate(['/error/not-found'])
        } else {
          this.product = result
        }
      },
      error => {
        if (error.status == 404) {
          this.router.navigate(['/error/not-found'])
        }
      })
  }

  /**
   * Loads all the reviews from the backend
   *
   * @param productId, a number representing the product
   */
  loadReview(productId: number) {

    this.review$ = this.httpClient.get<Review[]>(environment.endpointURL + 'review/getProductReviews/' + productId).pipe(map(reviews =>
      reviews.filter(review => review.buyerUserId == JSON.parse(localStorage.getItem('user')).userId)));

    this.review$.pipe(map(reviews => reviews[0])).subscribe(review => {
      if (review == undefined) {
        this.reviewText = '';
        this.rating = 0;
        this.reviewExists = false;
      } else {
        this.reviewText = review.reviewText;
        this.rating = review.rating;
        this.reviewId = review.reviewId;
        this.reviewExists = true;
      }
    })
  }

  /**
   * Adds a review to the backend
   */
  submitReview() {
    this.httpClient.post(environment.endpointURL + 'review/add',
      {
        "buyerUserId": JSON.parse(localStorage.getItem('user')).userId,
        "sellerUserId": this.product.userId,
        "buyerUserName": JSON.parse(localStorage.getItem('user'))?.userName,
        "productId": this.product.productId,
        "reviewText": this.reviewText,
        "rating": this.rating,
      }
    ).pipe(finalize(() => {
      this.toggleReview();
      this.ngOnInit();
      this.detailedProduct.ngOnInit();}))
      .subscribe((res: any) => {
      this.snackBar.open("The post of the review was successful", '', 3000, "success");
    }, (error: any) => {
      this.snackBar.open(error.error, '', 3000, "warning");
    });
  }

  /**
   * Allows the user to edit the review he already posted
   */
  editReview() {
    this.httpClient.put(environment.endpointURL + 'review/edit/' + this.reviewId,
      {
        "productId": this.productId,
        "reviewText": this.reviewText,
        "rating": this.rating,
      }
    ).pipe(finalize(() => {
      this.toggleReview();
      this.ngOnInit();
      this.detailedProduct.ngOnInit();}))
      .subscribe((res: any) => {},
      (error: any) => {
      if (error.status === 200) {
        this.snackBar.open("The edit of the review was successful", '', 3000, "success");
      } else {
        this.snackBar.open(error.error.text, '', 3000, "warning");
      }});
  }

  /**
   * Deletes a Review that was already posted
   */
  deleteReview(): void {
    this.httpClient.request('DELETE', environment.endpointURL + 'review/delete/' + this.reviewId, {
      body: {
        productId: this.productId
      }}).pipe(finalize(() => {
      this.toggleReview();
      this.ngOnInit();
      this.detailedProduct.ngOnInit();}))
      .subscribe((res: any) => {
      this.snackBar.open("The deletion of the review was successful", '', 3000, "success");
    }, (error: any) => {
      this.snackBar.open(error.error.text, '', 3000, "warning");
    })
  }

  /**
   * Loads all the reviews of a product
   * @param productId, a number representing the product
   */
  loadAllReviewsOfProduct(productId): void {
    this.reviews$ = this.httpClient.get<Review[]>(environment.endpointURL + 'review/getProductReviews/' + productId)
  }

  /**
   * Shows the user what rating he choose
   *
   * @param rating, a number representing the rating the user choose
   */
  onRating(rating: number) {
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', 2000, "info");
    this.rating = rating;
  }

  /**
   * Fills out the right amount of stars in the rating
   *
   * @param index, a number representing the place of the stars in the star rating
   */
  updateIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  /**
   * Updates the visual representation of the star rating
   *
   * @param index, a number representing the place of the stars in the star rating
   * @param rating, a number representing the rating the user choose
   */
  showIcon(index: number, rating: number) {
    if (rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  /**
   * Open or closes the review field
   */
  toggleReview() {
    this.showReview = !this.showReview;
  }
}
