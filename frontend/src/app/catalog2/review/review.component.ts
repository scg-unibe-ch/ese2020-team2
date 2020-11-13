import {ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../services/products.service";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable, scheduled} from "rxjs";
import {defaultIfEmpty, filter, map, startWith} from "rxjs/operators";
import {Approval} from "../../models/approval";
import {Product} from "../../models/product.model";
import {environment} from "../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Review} from "../../models/review.model";
import {PurchaseService} from "../../services/purchase.service";

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
              public snackBar: MatSnackBar,
              public purchaseService: PurchaseService) {

    this.loggedIn$ = authService.loggedIn$;
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



    for (let index = 0; index < this.starCount; index++) {
      this.ratingArray.push(index);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
    })
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

  loadReview(productId: number) {

    this.review$ = this.httpClient.get<Review[]>(environment.endpointURL + 'review/getReview/' + productId).pipe(map(reviews =>
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
        this.openSnackBar("You already posted a review, but you can edit it.", '')
      }
    })
  }

  submitReview() {
    this.httpClient.post(environment.endpointURL + 'review/add',
      {
        "buyerUserId": JSON.parse(localStorage.getItem('user')).userId,
        "sellerUserId": this.product.userId,
        "buyerUserName": JSON.parse(localStorage.getItem('user')).userName,
        "productId": this.product.productId,
        "reviewText": this.reviewText,
        "rating": this.rating,
      }
    ).subscribe((res: any) => {
      this.openSnackBar("The post of the review was successful", '');
    }, (error: any) => {
      this.openSnackBar(error.error, '');
    });
    //window.location.reload();

  }


  editReview() {
    this.httpClient.put(environment.endpointURL + 'review/edit/' + this.reviewId,
      {
        "reviewText": this.reviewText,
        "rating": this.rating,
      }
    ).subscribe((res: any) => {
      this.openSnackBar("The edit of the review was successful", '');
    }, (error: any) => {
      this.openSnackBar(error.error.text, '');
    });
    //window.location.reload();

  }

  deleteReview(): void {
    this.httpClient.delete(environment.endpointURL + 'review/delete/' + this.reviewId).subscribe((res: any) => {
      this.openSnackBar("The deletion of the review was successful", '');
    }, (error: any) => {
      this.openSnackBar(error.error.text, '');
    })
    window.location.reload();
  }

  cancelReview() {
    this.router.navigate(['account'])
  }

  loadAllReviewsOfProduct(productId): void {
    this.reviews$ = this.httpClient.get<Review[]>(environment.endpointURL + 'review/getProductReviews/' + productId)
  }

  onRating(rating: number) {
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: 2000
    });
    this.rating = rating;
  }

  updateIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  showIcon(index: number, rating: number) {
    if (rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  toggleReview() {
    this.showReview = !this.showReview;
  }
}
