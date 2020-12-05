import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CurrentUser} from "../../../services/current-user";
import {MatSnackBar} from "@angular/material/snack-bar";
import { environment } from 'src/environments/environment';
import {SnackBarService} from "../../../services/snackBar.service";

export interface Type {
  value: string;
  display: string;
}
export interface DeliveryPossible {
  value: boolean;
  display: string;
}
export interface IsPremier {
  value: boolean;
  display: string;
}
export interface PiecesAvailable {
  value: number;
  display: number;
}
export interface Location {
  value: string;
  display: string;
}

@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrls: ['./sell-item.component.css']
})
export class SellItemComponent implements OnInit {
  id: number;
  points$: number;
  pointsSub: any;
  url: string;
  file: File;


  constructor(
    private router: Router,
    public snackBar: SnackBarService,
    private users: CurrentUser,
    private httpClient: HttpClient,
    private fb: FormBuilder) {
    }
    selectedValue: string;

  formular = this.fb.group(
    {

      type: ["", Validators.required],
      title: ["", Validators.required],
      userName: [localStorage.getItem('userName')],
      price: [, Validators.required],
      description: ["", Validators.required],
      location: ["", Validators.required],
      sellOrLend: ["sell", Validators.required],
      deliveryPossible: [, Validators.required],
      isPremier: [, Validators.required],
      piecesAvailable: [, Validators.required],
      status: ["available"],
      userId: [JSON.parse(localStorage.getItem('user')).userId],
      visibleInMarket: [true,],
      sellerReview: []
    });


   types: Type[] = [
      {value: 'product', display: 'Product'},
      {value: 'service', display: 'Service'}
   ];

   deliverys: DeliveryPossible[] = [
    {value: true, display: 'YES'},
    {value: false, display: 'NO'}
 ];

 premiers: IsPremier[] = [
  {value: true, display: 'YES'},
  {value: false, display: 'NO'}
];

 locations: Location[] = [
  {value: 'bern', display: 'Bern'},
  {value: 'zürich', display: 'Zürich'},
  {value: 'lugano', display: 'Lugano'},
  {value: 'basel', display: 'Basel'},
  {value: 'genf', display: 'Genf'},
  {value: 'chur', display: 'Chur'}
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



  ngOnInit(): void {
    this.checkWallet();
    this.id = JSON.parse(localStorage.getItem('user')).userId;


  }


  get isPremier() { return this.formular.get("isPremier")};
  get type() { return this.formular.get("type") };
  get userId() { return this.formular.get("userId") };
  get title() { return this.formular.get("title") };
  get userName() { return this.formular.get("userName") };
  get price() { return this.formular.get("price") };
  get description() { return this.formular.get("description") };
  get status() { return this.formular.get("status") };
  get location() { return this.formular.get("location") };
  get sellOrLend() { return this.formular.get("sellOrLend") };
  get deliveryPossible() { return this.formular.get("deliveryPossible") };
  get piecesAvailable() { return this.formular.get("piecesAvailable") };
  get visibleInMarket() { return this.formular.get("visibleInMarket ") };
  get sellerReview() { return this.formular.get("sellerReview ") };

  post() {
    if (this.isPremier.value == true) {
      this.updatewallet();
    }
    this.httpClient.post(environment.endpointURL + 'product/add',
      this.formular.value).subscribe((res: any) => {
      this.snackBar.open('You successfully posted!', '', 3000, "success");
      this.router.navigate(['account/dashboard/posted'])
    }, (error: any) => {
      this.snackBar.open('Posting was not possible, please try again', '', 3000, "warning");
    });

}
  postimage() {
    const uploadData = new FormData();
    uploadData.append('productImage', this.file);
    uploadData.append('userId', "3");
    uploadData.append('productId', "4");


    this.httpClient.post(environment.endpointURL + 'image/add/',uploadData
    ).subscribe();
  }

updatewallet() {
  this.httpClient.put(environment.endpointURL + 'user/editUser/' + this.id,{
    moneyInWallet: this.points$ -5
  }
  ).subscribe();
};

refresh(): void {
  window.location.reload();
}

checkWallet(): void {
  this.pointsSub = this.users.getCurrentUserProperty('moneyInWallet').subscribe(
    (moneyInWallet: number) => {
      this.points$=moneyInWallet;
  }
  );


}

clear() {
  this.formular.reset();
  this.formular.controls['userName'].setValue(localStorage.getItem('userName'));
  //this.username.setValue("");
}

onSelectFile(event) { // called each time file input changes
  if (event.target.files && event.target.files[0]) {
    this.file = event.target.files[0]
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result as string;
    }
  }
}


}

