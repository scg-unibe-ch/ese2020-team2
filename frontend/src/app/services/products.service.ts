import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../../backend/src/models/user.model";
import {Product} from "../models/product.model";
import {Approval} from "../models/approval";
import {ProductList} from "../models/product-list.model";
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class ProductsService {

  productList: Observable<Product[]>;

  constructor(private httpClient: HttpClient) {}

  getProducts() : Observable<Product[]> {
     return this.httpClient.get<Product[]>(environment.endpointURL + 'product/getAll')
  }



}
