import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import { CurrentUser } from 'src/app/services/current-user';
import {Observable} from "rxjs";
import {find, map} from "rxjs/operators";
import {Product} from "../../../models/product.model";
import {ProductsService} from "../../../services/products.service";
import {environment} from "../../../../environments/environment";
import {Approval} from "../../../models/approval";
import {SnackBarService} from "../../../services/snackBar.service";

export interface Type {
  value: string;
  display: string;
}
export interface DeliveryPossible {
  value: boolean;
  display: string;
}
export interface sellOrLend {
  value: string;
  display: string;
}
export interface PriceDur {
  value: string;
  display: string;
}

export interface IsPremier {
  value: boolean;
  display: string;
}

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EdititemComponent implements OnInit {
  id: any;
  points$: number;
  pointsSub: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private users: CurrentUser,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private productsService: ProductsService,
    public snackBar: SnackBarService) {


  }

  productId: number;
  sub: any;
  product: Product;



  ngOnInit() {
    this.checkWallet();
    this.id = JSON.parse(localStorage.getItem('user')).userId;
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id']; // (+) converts string 'id' to a number
    });
    this.productsService.getProducts().pipe(map(products =>
      products.filter(product => product.productId === this.productId))).subscribe(products => {
      this.product = products.pop();
    })
  }

  updatewallet() {
    this.httpClient.put(environment.endpointURL + 'user/editUser/' + this.id,{
      moneyInWallet: this.points$ -5
    }
    ).subscribe();
  };


  checkWallet(): void {
    this.pointsSub = this.users.getCurrentUserProperty('moneyInWallet').subscribe(
      (moneyInWallet: number) => {
        this.points$ = moneyInWallet;
    }
    );
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editformular = this.fb.group(
    {
      type: ["", Validators.required],
      title: ["", Validators.required],
      userName: [this.users.getCurrentUserProperty("userName")],
      price: [0, Validators.required],
      description: ["", Validators.required],
      location: ["", Validators.required],
      sellOrLend: ["", Validators.required],
      deliveryPossible: [false, Validators.required],
      isPremier: [true, Validators.required]
    });





  premiers: IsPremier[] = [
      {value: true, display: 'YES'},
      {value: false, display: 'NO'}
    ];

  types: Type[] = [
    {value: 'product', display: 'Product'},
    {value: 'service', display: 'Service'}
  ];

  deliverys: DeliveryPossible[] = [
    {value: true, display: 'YES'},
    {value: false, display: 'NO'}
  ];


  contracts: sellOrLend[] = [
    {value: 'sell', display: 'Sell'},
    {value: 'lend', display: 'Lend'}
  ];

  prices: PriceDur[] = [
    {value: 'hour', display: '/Hour'},
    {value: 'day', display: '/Day'}
  ];

  get visibleInMarket() { return this.editformular.get("visibleInMarket") };
  get disapprovalMsg() { return this.editformular.get("disapprovalMsg") };
  //get productId() { return this.editformular.get("productId") };
  get userName() { return this.editformular.get("userName") };
  get adminApproval() { return this.editformular.get("adnminApproval") };
  get typ() { return this.editformular.get("type") };
  get title() { return this.editformular.get("title") };
  get price() { return this.editformular.get("price") };
  get description() { return this.editformular.get("description") };
  get location() { return this.editformular.get("location") };
  get sellOrLend() { return this.editformular.get("sellOrLend") };
  get status() { return this.editformular.get("status") };
  get deliveryPossible() { return this.editformular.get("deliveryPossible") };


    /**
   * Updates the product regarding how the user edited the product
   *
   * If the product is edited, the approval is changed to pending
   *
   * @param product, the product that was edited
   */

confirm(product: Product): void {
  if (product.isPremier == true) {
    this.updatewallet();
  }
  this.httpClient.put(environment.endpointURL + 'product/edit/' + product.productId, {
    adminApproval: Approval.pending,
    typ: product.type,
    title: product.title,
    price: product.price,

    isPremier: product.isPremier,
    description: product.description,
    location: product.location,
    sellOrLend: product.sellOrLend,
    deliveryPossible: product.deliveryPossible,
  }).subscribe();
      this.router.navigate(['account/dashboard/posted']);

    }

clear() {
  this.editformular.reset();

}

}
