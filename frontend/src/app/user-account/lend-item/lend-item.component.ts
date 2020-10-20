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
export interface Delivery {
  value: string;
  display: string;
}
export interface Contract {
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
      price: ["", Validators.required],
      description: ["", Validators.required],
      location: ["", Validators.required],
      contract: ["", Validators.required],
      delivery: ["", Validators.required],
      username: [this.users.getCurrentUser()],
      status: ["posted"],
      picture: [""],
      purchasedby: [""],
    });

  
   types: Type[] = [
      {value: 'product', display: 'Product'},
      {value: 'service', display: 'Service'}
   ];

   deliverys: Delivery[] = [
    {value: 'yes', display: 'YES'},
    {value: 'no', display: 'NO'}
 ];


contracts: Contract[] = [
  {value: 'sell', display: 'Sell'},
  {value: 'lend', display: 'Lend'}
];


  

  ngOnInit(): void {
  }



  get type() { return this.formular.get("type") };
  get title() { return this.formular.get("title") };
  get price() { return this.formular.get("price") };
  get description() { return this.formular.get("description") };
  get location() { return this.formular.get("location") };
  get contract() { return this.formular.get("contract") };
  get status() { return this.formular.get("status") };
  get delivery() { return this.formular.get("delivery") };
  get picture() { return this.formular.get("picture") };
  get purchasedby() { return this.formular.get("purchasedby") };


  post() {
    this.httpClient.post(environment.endpointURL + 'product/post',
      this.formular.value).subscribe((res: any) => {
      this.openSnackBar('You successfully posted!', '');
    }, (error: any) => {
      this.openSnackBar('Posting was not possible, please try again', '');
    })
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 8000,
  });
}
}
