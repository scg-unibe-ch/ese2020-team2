import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import { Purchase } from 'src/app/models/purchase.model';
import { environment } from 'src/environments/environment';
import {Approval} from "../../../models/approval";
import {Review} from "../../../models/review.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ReviewComponent} from "../../../catalog2/review/review.component";

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css']
})
export class PurchasedComponent implements OnInit, AfterViewInit {

  purchases$: Observable<Purchase[]>;
  review = "";
  productsIds: number[];


  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private purchaseService: PurchaseService,
    private users: CurrentUser) {



}

ngOnInit(): void {
  this.purchases$ = this.purchaseService.getPurchases();


  this.getReviewsOfUser();
  }

  getReviewsOfUser() {
    this.httpClient.get<Review[]>(environment.endpointURL + 'review/getBuyerReviews/' + JSON.parse(localStorage.getItem('user')).userId)
      .subscribe(reviews => {this.productsIds = reviews.map(review => review.productId)});
  }



  dataSource = new MatTableDataSource<Purchase>();
  displayedColumns = ["purchaseId", "quantity", "buyerUserId", "createdAt", "actions"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.purchases$ = this.purchaseService.getPurchases();
    this.purchases$.subscribe(purchases => {
      this.dataSource = new MatTableDataSource(purchases);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }





}

