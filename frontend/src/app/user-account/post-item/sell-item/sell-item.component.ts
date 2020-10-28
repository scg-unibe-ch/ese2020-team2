import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CurrentUser} from "../../../services/current-user";
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from 'src/environments/environment';

export interface Type {
  value: string;
  display: string;
}
export interface DeliveryPossible {
  value: boolean;
  display: string;
}
export interface PiecesAvailable {
  value: number;
  display: number;
}
export interface PriceDur {
  value: string;
  display: string;
}

@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrls: ['./sell-item.component.css']
})
export class SellItemComponent implements OnInit {

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
      userName: [localStorage.getItem('userName')],
      price: [, Validators.required],
      description: ["", Validators.required],
      location: ["", Validators.required],
      sellOrlend: ["sell", Validators.required],
      status: ["posted"],
      deliveryPossible: [, Validators.required],
      piecesAvailable: [, Validators.required],
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


 piecesAvailables: PiecesAvailable[] = [
  {value: 1, display: 1},
  {value: 2, display: 2},
  {value: 3, display: 3},
  {value: 4, display: 4},
  {value: 5, display: 5},
  {value: 6, display: 6},
  {value: 7, display: 7},
  {value: 8, display: 8},
  {value: 9, display: 9},
  {value: 10, display: 10},
  {value: 15, display: 15},
  {value: 20, display: 20},
  {value: 30, display: 30},
  {value: 40, display: 40},
  {value: 50, display: 50},
  {value: 100, display: 100},

];

prices: PriceDur[] = [
  {value: 'hour', display: '/Hour'},
  {value: 'day', display: '/Day'}
];

  

  ngOnInit(): void {
  }

  
  get typ() { return this.formular.get("type") };
  get title() { return this.formular.get("title") };
  get price() { return this.formular.get("price") };
  get description() { return this.formular.get("description") };
  get location() { return this.formular.get("location") };
  get sellOrlend() { return this.formular.get("sellOrlend") };
  get status() { return this.formular.get("status") };
  get deliveryPossible() { return this.formular.get("deliveryPossible") };
  get piecesAvailable() { return this.formular.get("piecesAvailable") };


  post() {
    this.httpClient.post(environment.endpointURL + 'product/add',
      this.formular.value).subscribe((res: any) => {
      this.openSnackBar('You successfully posted!', '');
    }, (error: any) => {
      this.openSnackBar('Posting was not possible, please try again', '');
    }); 
}
clear() {
  this.formular.reset();
  this.formular.controls['userName'].setValue(localStorage.getItem('userName'));
  this.formular.controls['status'].setValue("posted");
  //this.username.setValue("");
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 8000,
  });
}
}
