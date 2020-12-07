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
import {_isNumberValue} from "@angular/cdk/coercion";
import {NotificationService} from "../../../services/notification.service";
import {AppComponent} from "../../../app.component";
import Instance = WebAssembly.Instance;
import {UserAccountComponent} from "../../user-account.component";

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit, AfterViewInit {

  sells$: Observable<Purchase[]>;
  sells: Purchase[];
  filter = "";
  filter2 = "";

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private soldService: SoldService,
    private snackBar: SnackBarService,
    private users: CurrentUser,
              private userAccount: UserAccountComponent,
              private notificationService: NotificationService,
              private app: AppComponent) {

}

  ngOnInit(): void {

  }

  checkNotification(sell: Purchase, status: boolean){
    this.httpClient.put(environment.endpointURL + 'purchase/edit/'+ sell.purchaseId,
      {
        "notificationCheck": status,
      }
    ).subscribe((res: any) => {}, (error: any) => {
      if(error.status === 200) {
        this.ngAfterViewInit();
        this.app.ngOnInit();
        this.userAccount.ngOnInit()
        this.notificationService.getNotification();
      } else {
        this.snackBar.open(error.error, '', 3000, "warning");
      }});
  }


  dataSource = new MatTableDataSource<Purchase>();
  displayedColumns = ["createdAt", "purchaseId", "product.title", "product.type","product.sellOrLend",
    "quantity", "product.price", "buyer.userName", "deliveryRequested",
    "paymentType", "deliveryAddress", "buyer.email", "actions"];

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
    this.filterSellOrLend(this.filter, this.filter2);
    this.sells$.subscribe(purchases => {
      console.log(purchases);
      this.dataSource = new MatTableDataSource(purchases);
      this.dataSource.sortingDataAccessor =
        (data: any, sortHeaderId: string): string | number => {
          let value = null;
          if (sortHeaderId.includes('.')) {
            const ids = sortHeaderId.split('.');
            value = data;
            ids.forEach(function (x) {
              value = value? value[x]: null;
            });
          } else {
            value = data[sortHeaderId];
          }
          return _isNumberValue(value) ? Number(value) : value;
        };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })

  }

  DateParse(date: any){
    return new Date(Date.parse(date)).toLocaleString()
  }

  filterSellOrLend(filter: string, filter2: string): void {
    if (filter === "" && filter2 === "") {
      this.sells$ = this.soldService.getSells()
    }
    if (filter !== "" && filter2 === "") {
      this.sells$ = this.soldService.getSells()
        .pipe(map(sells => sells.filter(sell => sell.product.sellOrLend === filter)))
    }
    if (filter === "" && filter2 !== "") {
      this.sells$ = this.soldService.getSells()
        .pipe(map(sells => sells.filter(sell => sell.notificationCheck === filter2)))
    }
    if (filter !== "" && filter2 !== "") {
      this.sells$ = this.soldService.getSells()
        .pipe(map(sells => sells.filter(sell => sell.product.sellOrLend === filter && sell.notificationCheck === filter2)))
    }
  }



}
