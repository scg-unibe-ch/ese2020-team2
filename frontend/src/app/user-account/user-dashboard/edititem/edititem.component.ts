import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/services/current-user';


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
    private router: Router,
    public snackBar: MatSnackBar,
    private users: CurrentUser,
    private httpClient: HttpClient,
    private fb: FormBuilder) { }
    selectedValue: string;

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
      pricedur: ["",],
    });

  ngOnInit(): void {
  }


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
  get productId() { return this.editformular.get("productId") };
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

}
