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

  products: Product[] = []
  productList: ProductList;

  constructor(private httpClient: HttpClient) {}
//This is mocked data
    getProducts(): ProductList {
    this.productList = new ProductList([]);
      this.products = []

      this.products.push(new Product(1,
        "service",
        "Product 1",
        "aa",
        23,
        "this is a posting",
        "be",
        "sell",
        "posted",
        true,
        
        true,
        "",
        true,
        "",
        
        
        ))

        this.products.push(new Product(2,
          "service",
          "Product 2",
          "brbr",
          23,
          "this is a posting",
          "be",
          "lend",
          "posted",
          true,
          
          true,
          "",
          true,
          "",
          
          
          ))

          this.products.push(new Product(3,
            "service",
            "Product 3",
            "baubau2",
            23,
            "this is a posting",
            "be",
            "sell",
            "sold",
            true,
            
            true,
            "",
            false,
            "rocco2",
            
            
            ))

            this.products.push(new Product(4,
              "service",
              "Product 4",
              "rocco2",
              23,
              "this is a posting",
              "be",
              "sell",
              "sold",
              true,
              
              true,
              "",
              false,
              "baubau2",
              
              
              ))

              this.products.push(new Product(5,
                "service",
                "Product 5",
                "rocco2",
                23,
                "this is a posting",
                "be",
                "sell",
                "posted",
                true,
                
                true,
                "",
                false,
                "",
                
                
                ))

            this.products.push(new Product(6,
              "service",
              "Product 6",
              "rocco2",
              23,
              "this is a posting",
              "be",
              "lend",
              "lent",
              true,
              
              true,
              "",
              false,
              "",
              
              ))

       this.productList.products = this.products;
      return this.productList;
    }


    
  

}
