import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import { Purchase } from '../../../models/purchase.model';
import { SoldService } from 'src/app/services/sold.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lent',
  templateUrl: './lent.component.html',
  styleUrls: ['./lent.component.css']
})
export class LentComponent implements OnInit {

  listOfProduct:Purchase[];
  lent$: Observable<Purchase[]>;

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private soldService: SoldService,
    private snackBar: MatSnackBar,
    private users: CurrentUser) {

}


  ngOnInit(): void {
    this.lent$ = this.soldService.getlends().pipe(map(sells =>
      sells.filter(purchase => purchase.paymentType === 'wallet points')
    ));
    this.lent$.subscribe(list => this.listOfProduct = list);
  
  }


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
