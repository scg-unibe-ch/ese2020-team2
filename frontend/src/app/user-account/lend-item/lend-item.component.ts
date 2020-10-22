import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {CurrentUser} from "../../services/current-user";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  selector: 'app-lend-item',
  templateUrl: './lend-item.component.html',
  styleUrls: ['./lend-item.component.css']
})
export class LendItemComponent implements OnInit {
  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private users: CurrentUser,
    private httpClient: HttpClient,
    private fb: FormBuilder) { }
    selectedValue: string;

  formular = this.fb.group(
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
      pricedur: ["",],
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

  

  ngOnInit(): void {
  }

  get visibleInMarket() { return this.formular.get("visibleInMarket") };
  get disapprovalMsg() { return this.formular.get("disapprovalMsg") };
  get productId() { return this.formular.get("productId") };
  get userName() { return this.formular.get("userName") };
  get adminApproval() { return this.formular.get("adnminApproval") };
  get typ() { return this.formular.get("type") };
  get title() { return this.formular.get("title") };
  get price() { return this.formular.get("price") };
  get description() { return this.formular.get("description") };
  get location() { return this.formular.get("location") };
  get sellOrlend() { return this.formular.get("sellOrlend") };
  get status() { return this.formular.get("status") };
  get deliveryPossible() { return this.formular.get("deliveryPossible") };


  post() {
    this.httpClient.post(environment.endpointURL + 'product/add',
      this.formular.value).subscribe((res: any) => {
      this.openSnackBar('You successfully posted!', '');
    }, (error: any) => {
      this.openSnackBar('Posting was not possible, please try again', '');
    })
}
clear() {
  this.formular.reset();
  //this.username.setValue("");
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 8000,
  });
}
}
