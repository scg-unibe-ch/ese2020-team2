import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Product} from "../models/product.model";
import {Catalog} from "../models/catalog.model";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  loggedIn$ = false;
  catalog: Catalog[] = [];

  constructor(private authService: AuthService,
    private httpClient: HttpClient) {

    //Subscribes to the loggIn$ observable
    authService.loggedIn$.subscribe((nextValue) => {
      this.loggedIn$ = nextValue;  // this will happen on every change
    })
  }

  /**
   * Checks if user is logged in and updates the login status of the user
   */

/*
  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + 'catalog').subscribe((instances: any) => {
      this.catalog = instances.map((instance: any) => {
        const products = instance.Product.map((item: any) => new Product(item.userName, item.approved, item.appearMarketplace, item.disapprovalMessage, item.title));

        return new Catalog(products);
      });
    });
    this.authService.login = !!(localStorage.getItem('userToken'));
  }*/
}

