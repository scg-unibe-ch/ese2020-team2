import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../../backend/src/models/user.model";
import {Product} from "../models/product.model";
import {Approval} from "../models/approval";

@Injectable({
  providedIn: "root"
})
export class ProductsService {

  products: Product[]

  constructor(private httpClient: HttpClient) {}
//This is mocked data
    getProducts(): Product[] {
      this.products.push(new Product("aa",
        "Product 1",
        Approval.Pending,
        false,
        "Unethical content"))

      this.products.push(new Product("aa",
        "Product 2",
        Approval.No,
        false,
        "Unethical content"))
      return this.products;
    }


    /*
  getCurrentUserProperty(property: string): Observable<any> {
    return this.httpClient.get<User[]>(environment.endpointURL + 'user/all').pipe(
      map((users: User[]) => users.find(user => user.userName === localStorage.getItem('userName'))),
      pluck(property))
  }
  */

}
