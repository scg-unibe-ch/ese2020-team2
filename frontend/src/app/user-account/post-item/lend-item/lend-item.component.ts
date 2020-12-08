import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CurrentUser } from "../../../services/current-user";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarService } from "../../../services/snackBar.service";
import { ProductsService } from 'src/app/services/products.service';
import { map } from 'rxjs/operators';

export interface Type {
  value: string;
  display: string;
}
export interface Location {
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
  id: number;
  points$: number;
  pointsSub: any;
  url: string;
  file: File;
  products$: any;
  productid: number;

  constructor(
    private router: Router,
    public snackBar: SnackBarService,
    private users: CurrentUser,
    private httpClient: HttpClient,
    private productsService: ProductsService,
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
      sellOrLend: ["lend", Validators.required],
      isPremier: [, Validators.required],
      deliveryPossible: [, Validators.required],
      status: ["available"],
      userId: [JSON.parse(localStorage.getItem('user')).userId],
      visibleInMarket: [true,],
      sellerReview: [],
      duration: ["", Validators.required],
    });

  types: Type[] = [
    { value: 'product', display: 'Product' },
    { value: 'service', display: 'Service' }
  ];

  locations: Location[] = [
    { value: 'bern', display: 'Bern' },
    { value: 'zürich', display: 'Zürich' },
    { value: 'lugano', display: 'Lugano' },
    { value: 'basel', display: 'Basel' },
    { value: 'genf', display: 'Genf' },
    { value: 'chur', display: 'Chur' }
  ];

  deliverys: DeliveryPossible[] = [
    { value: true, display: 'YES' },
    { value: false, display: 'NO' }
  ];

  durations: Duration[] = [
    { value: '/hour', display: '/Hour' },
    { value: '/day', display: '/Day' }
  ];

  prices: PriceDur[] = [
    { value: 'hour', display: '/Hour' },
    { value: 'day', display: '/Day' }
  ];

  premiers: IsPremier[] = [
    { value: true, display: 'YES' },
    { value: false, display: 'NO' }
  ];
  premiersnotenough: IsPremier[] = [
    { value: false, display: 'NO' },
  ];


  ngOnInit(): void {
    this.checkWallet();
    this.getpostedproductid();
    if (this.productid == null) {
      this.productid = 1;
    }
    this.id = JSON.parse(localStorage.getItem('user')).userId;
  }

  updatewallet() {
    this.httpClient.put(environment.endpointURL + 'user/editUser/' + this.id, {
      moneyInWallet: this.points$ - 5
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

  get isPremier() { return this.lendformular.get("isPremier") };
  get userId() { return this.lendformular.get("userId") };
  get type() { return this.lendformular.get("type") };
  get userName() { return this.lendformular.get("userName") };
  get visibleInMarket() { return this.lendformular.get("visibleInMarket ") };
  get sellerReview() { return this.lendformular.get("sellerReview ") };
  get title() { return this.lendformular.get("title") };
  get price() { return this.lendformular.get("price") };
  get description() { return this.lendformular.get("description") };
  get location() { return this.lendformular.get("location") };
  get duration() { return this.lendformular.get("duration") };
  get sellOrLend() { return this.lendformular.get("sellOrLend") };
  get status() { return this.lendformular.get("status") };
  get deliveryPossible() { return this.lendformular.get("deliveryPossible") };


  post() {
    if (this.isPremier.value == true) {
      this.updatewallet();
    }
    this.httpClient.post(environment.endpointURL + 'product/add',
      this.lendformular.value).subscribe((res: any) => {
        this.snackBar.open('You successfully posted!', '', 3000, "success");
        this.router.navigate(['account/dashboard/posted'])
      }, (error: any) => {
        this.snackBar.open('Posting was not possible, please try again', '', 3000, 'warning');
      });
    if (this.file != null) {
      this.postimage(this.productid);
    }
  }


  getpostedproductid(): void {
    this.productsService.getProducts().pipe(map(products =>
      products.filter(product => product.userId === this.id)
    )
    ).subscribe(data => this.productid = data[data.length - 1].productId + 1);
  }

  postimage(productid: number) {
    const uploadData = new FormData();
    uploadData.append('productImage', this.file);
    uploadData.append('userId', this.id.toString());
    uploadData.append('productId', productid.toString());


    this.httpClient.post(environment.endpointURL + 'image/add/', uploadData
    ).subscribe();
  }

  clear() {
    this.lendformular.reset();
    this.lendformular.controls['userName'].setValue(localStorage.getItem('userName'));
    this.lendformular.controls['status'].setValue("posted");
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
