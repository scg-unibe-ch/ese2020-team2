import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
export class SoldComponent implements OnInit, AfterViewInit {

  sells$: Observable<Purchase[]>;
  sells: Purchase[];

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private soldService: SoldService,
    private snackBar: SnackBarService,
    private users: CurrentUser) {

}

  ngOnInit(): void {

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


  dataSource = new MatTableDataSource<Purchase>();
  displayedColumns = ["purchase.purchaseId", "purchase.product.title", "purchase.product.type",
    "purchase.quantity", "purchase.product.price", "purchase.user.userName", "purchase.deliveryRequested",
    "purchase.paymentType", "purchase.deliveryAddress", "actions"];

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
    this.sells$ = this.soldService.getSells()
    this.sells$.subscribe(purchases => {
      console.log(purchases);
      this.dataSource = new MatTableDataSource(purchases);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
