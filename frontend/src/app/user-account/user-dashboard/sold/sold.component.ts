import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { SoldService } from 'src/app/services/sold.service';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';
import {map} from "rxjs/operators";
import { Purchase } from 'src/app/models/purchase.model';
import {environment} from '../../../../environments/environment';
import { async } from 'rxjs/internal/scheduler/async';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css']
})
export class SoldComponent implements OnInit {

  
  sells$: Observable<Purchase[]>;
  listOfProduct:Purchase[];

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private soldService: SoldService,
    private snackBar: MatSnackBar,
    private users: CurrentUser) {

}

  ngOnInit(): void {
    this.sells$ = this.soldService.getSells().pipe(map(sells =>
      sells.filter(purchase => purchase.paymentType === 'wallet points')
    ));
    this.sells$.subscribe(list => this.listOfProduct = list);
  }
 /* ngOnDestroy(){
    this.updateLists()
  }
  private updateLists() {
    this.sells$.subscribe(list => list.forEach(element => {
      this.checkNotification(element);
    }));
  }
*/
  checkNotification(sell:Purchase){
    this.httpClient.put(environment.endpointURL + 'purchase/edit/'+ sell.purchaseId,
      {
        "notificationCheck": true,
      }
    ).subscribe((res: any) => {
      this.openSnackBar("Product was marked as ", '');
    }, (error: any) => {
      this.openSnackBar(error.error, '');
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
