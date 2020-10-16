import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../../backend/src/models/user.model";
import {Product} from "../models/product.model";
import {Approval} from "../models/approval";
import {ProductList} from "../models/product-list.model";

@Injectable({
  providedIn: "root"
})
export class ProductsService {

  products: Product[] = []
  productList: ProductList;

  constructor(private httpClient: HttpClient) {}
//This is mocked data
    getProducts(): ProductList {
    this.productList = new ProductList([]);
      this.products = []

      this.products.push(new Product(1,"aa",
        "Product 1",
        Approval.Pending,
        false,
        "Unethical content"))

      this.products.push(new Product(2,"aa",
        "Product 2",
        Approval.No,
        false,
        "Unethical content"))
       this.productList.products = this.products;
      return this.productList;
    }


    /*
  getCurrentUserProperty(property: string): Observable<any> {
    return this.httpClient.get<User[]>(environment.endpointURL + 'user/all').pipe(
      map((users: User[]) => users.find(user => user.userName === localStorage.getItem('userName'))),
      pluck(property))
  }
  */

}
