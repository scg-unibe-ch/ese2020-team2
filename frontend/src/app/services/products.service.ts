import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class ProductsService {

  productList: Observable<Product[]>;

  constructor(private httpClient: HttpClient) {}

  /**
   * Get all the products from the backend.
   *
   * @return Observable<Product[]>, all the products that are currently in the database of the backend.
   */
  getProducts() : Observable<Product[]> {
     return this.httpClient.get<Product[]>(environment.endpointURL + 'product/getAll')
  }

  getProductById(id: number) : Observable<Product> {
    return this.httpClient.get<Product>(environment.endpointURL + 'product/get/' + id)
  }
}
