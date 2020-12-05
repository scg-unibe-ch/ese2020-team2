import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ProductList } from 'src/app/models/product-list.model';
import { Product } from 'src/app/models/product.model';
import { CurrentUser } from 'src/app/services/current-user';
import { ProductsService } from 'src/app/services/products.service';
import {finalize, map} from "rxjs/operators";
import {Observable} from "rxjs";
import { Routes } from '@angular/router';
import { EdititemComponent } from '../edititem/edititem.component';
import { environment } from 'src/environments/environment';
import {TodoItem} from "../../../models/todo-item.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Purchase} from "../../../models/purchase.model";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent implements OnInit, AfterViewInit {

  products$: Observable<Product[]>;
  product: Product;
  products: Product[];
  id: any;
  constructor(private httpClient: HttpClient,
    private productsService: ProductsService,
    private users: CurrentUser) {

}

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user')).userId;
    this.getAllProductsOfUser()
    
  }

  /**
   *
   */
  getAllProductsOfUser(): void {
    this.products$ = this.productsService.getProducts().pipe(map(products =>
        products.filter(product => product.userId === this.id)
      ));
  }

  /**
   * Deletes a product and updates the product list from the backend.
   *
   * @param product, that will be deleted
   */
  onProductDelete(product: Product): void{
    this.httpClient.delete(environment.endpointURL + 'product/delete/' + product.productId).pipe(
      finalize(() => this.getAllProductsOfUser())).subscribe()
  }

  changeVisibleInMarket(product: Product): void {
    product.visibleInMarket= !(product.visibleInMarket);
    this.httpClient.put(environment.endpointURL + 'product/edit/' + product.productId, {
     visibleInMarket: product.visibleInMarket
    }).subscribe();
  }

  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  displayedColumns = ["productId", "title", "type", "price", "sellOrLend", "deliveryPossible", "productRating", "isPremier",
    "visibleInMarket", "piecesAvailable", "adminApproval", "disapprovalMsg", "actions"];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.products$ = this.productsService.getProducts();
    this.products$.subscribe(products => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
}
