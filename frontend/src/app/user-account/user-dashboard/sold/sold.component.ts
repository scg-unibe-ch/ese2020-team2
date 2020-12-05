import { HttpClient } from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { SoldService } from 'src/app/services/sold.service';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';
import {map} from "rxjs/operators";
import { Purchase } from 'src/app/models/purchase.model';
import {environment} from '../../../../environments/environment';
import {SnackBarService} from "../../../services/snackBar.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit {

  sells$: Observable<Purchase[]>;
  sells: Purchase[];

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private soldService: SoldService,
    private snackBar: SnackBarService,
    private users: CurrentUser) {

}

  ngOnInit(): void {
    this.sells$ = this.soldService.getSells()
    this.sells$.subscribe(sells => this.sells = sells);
  }

  checkNotification(sell:Purchase){
    this.httpClient.put(environment.endpointURL + 'purchase/edit/'+ sell.purchaseId,
      {
        "notificationCheck": true,
      }
    ).subscribe((res: any) => {}, (error: any) => {
      if(error.status === 200) {
        this.snackBar.open("Product was marked as seen", '', 3000, "info");
      } else {
        this.snackBar.open(error.error, '', 3000, "warning");
      }});
  }

  dataSource: MatTableDataSource<Purchase> = new MatTableDataSource<Purchase>();
  displayedColumns = ["productId", "title", "type", "price", "sellOrLend", "deliveryPossible", "productRating", "isPremier",
    "visibleInMarket", "piecesAvailable", "adminApproval", "disapprovalMsg", "actions"];


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
    this.sells$ = this.sells$ = this.soldService.getSells();
    this.sells$.subscribe(purchases => {
      this.dataSource = new MatTableDataSource(purchases);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

}
