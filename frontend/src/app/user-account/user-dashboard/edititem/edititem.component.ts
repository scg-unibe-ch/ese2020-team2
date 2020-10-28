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

export interface Type {
  value: string;
  display: string;
}
export interface DeliveryPossible {
  value: boolean;
  display: string;
}
export interface SellOrLend {
  value: string;
  display: string;
}
export interface PriceDur {
  value: string;
  display: string;
}

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EdititemComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private productsService: ProductsService,
    public snackBar: MatSnackBar) {
  }

  productId: number;
  sub: any;
  product: Product;

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.productId = +params['id']; // (+) converts string 'id' to a number
    });
    this.productsService.getProducts().pipe(map(products =>
      products.filter(product => product.productId === this.productId))).subscribe(products => {
      this.product = products.pop();
    })
  }





  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  editformular = this.fb.group(
    {
      type: ["", Validators.required],
      title: ["", Validators.required],
      userName: ["dkdkd"],
      price: [0, Validators.required],
      description: ["", Validators.required],
      location: ["", Validators.required],
      sellOrlend: ["", Validators.required],
      status: ["posted"],
      deliveryPossible: [false, Validators.required],
    });





  types: Type[] = [
    {value: 'product', display: 'Product'},
    {value: 'service', display: 'Service'}
  ];

  deliverys: DeliveryPossible[] = [
    {value: true, display: 'YES'},
    {value: false, display: 'NO'}
  ];


  contracts: SellOrLend[] = [
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
  get sellOrlend() { return this.editformular.get("sellOrlend") };
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
  this.httpClient.put(environment.endpointURL + 'product/edit/' + product.productId, {
    adminApproval: Approval.pending,
    typ: product.type,
    title: product.title,
    price: product.price,
    description: product.description,
    location: product.location,
    sellOrlend: product.sellOrlend,
    deliveryPossible: product.deliveryPossible,
  }).subscribe();
}

clear() {
  this.editformular.reset();
  //this.username.setValue("");
}

}
