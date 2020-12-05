import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import { environment } from 'src/environments/environment';
import {map, filter} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductsService {

  productList: Observable<Product[]>;

  constructor(private httpClient: HttpClient) {}

  /**
   * Get all the products from the backend, that are not marked as deleted.
   *
   * @return Observable<Product[]>, all the products that are currently in the database of the backend and are not
   *         marked as deleted.
   */
  getProducts() : Observable<Product[]> {
     return this.httpClient.get<Product[]>(environment.endpointURL + 'product/getAll')
       .pipe(map(products => products.filter(product => product.status !== "deleted")))
  }

  /**
   * Gets the the product specified by the id number from the backend
   *
   * @param id the id number of the product you want to get from the backedn
   */
  getProductById(id: number) : Observable<Product> {
    return this.httpClient.get<Product>(environment.endpointURL + 'product/get/' + id)
  }

  /**
   * Gets all the products the user has
   * @param productIds all the productIds that should be fetched from the backend
   */
  getProductsByMultipleIds(productIds: number[]) : Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.endpointURL + 'product/getAll').pipe(map(products =>
  products.filter(product => productIds.includes(product.productId))));
  }
}
