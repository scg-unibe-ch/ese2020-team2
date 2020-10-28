import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {CurrentUser} from "../../../services/current-user";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface Type {
  value: string;
  display: string;
}
export interface DeliveryPossible {
  value: boolean;
  display: string;
}
export interface Duration {
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

  lendformular = this.fb.group(
    {



      type: ["", Validators.required],
      title: ["", Validators.required],
      userName: [localStorage.getItem('userName')],
      price: [, Validators.required],
      description: ["", Validators.required],
      location: ["", Validators.required],
      sellOrlend: ["lend", Validators.required],
      duration: ["", Validators.required],
      status: ["posted"],
      deliveryPossible: [, Validators.required],
      piecesAvailable: [1, Validators.required],

    });


  
   types: Type[] = [
      {value: 'product', display: 'Product'},
      {value: 'service', display: 'Service'}
   ];

   deliverys: DeliveryPossible[] = [
    {value: true, display: 'YES'},
    {value: false, display: 'NO'}
 ];


durations: Duration[] = [
  {value: '/hour', display: '/Hour'},
  {value: '/day', display: '/Day'}
];

prices: PriceDur[] = [
  {value: 'hour', display: '/Hour'},
  {value: 'day', display: '/Day'}
];

  

  ngOnInit(): void {
  }

  
  get typ() { return this.lendformular.get("type") };
  get title() { return this.lendformular.get("title") };
  get price() { return this.lendformular.get("price") };
  get description() { return this.lendformular.get("description") };
  get location() { return this.lendformular.get("location") };
  get duration() { return this.lendformular.get("duration") };
  get sellOrlend() { return this.lendformular.get("sellOrlend") };
  get status() { return this.lendformular.get("status") };
  get deliveryPossible() { return this.lendformular.get("deliveryPossible") };
  get piecesAvailable() { return this.lendformular.get("piecesAvailable") };


  post() {
    this.httpClient.post(environment.endpointURL + 'product/add',
      this.lendformular.value).subscribe((res: any) => {
      this.openSnackBar('You successfully posted!', '');
    }, (error: any) => {
      this.openSnackBar('Posting was not possible, please try again', '');
    }); 
}
clear() {
  this.lendformular.reset();
  this.lendformular.controls['userName'].setValue(localStorage.getItem('userName'));
  this.lendformular.controls['status'].setValue("posted");
  //this.username.setValue("");
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 8000,
  });
}
}
