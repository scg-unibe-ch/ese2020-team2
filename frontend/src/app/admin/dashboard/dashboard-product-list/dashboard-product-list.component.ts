import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { Product } from "../../../models/product.model";
import { Observable } from "rxjs";
import { ProductsService } from "../../../services/products.service";
import { finalize, map } from "rxjs/operators";
import { Approval } from "../../../models/approval";
import { ProductImage } from '../../../../../../backend/src/models/productImage.model';

@Component({
  selector: 'app-dashboard-product-list',
  templateUrl: './dashboard-product-list.component.html',
  styleUrls: ['./dashboard-product-list.component.css'],
})
export class DashboardProductListComponent {

  productList$: Observable<Product[]>;
  filter = null;
  Approval = Approval;
  urls = Array.apply(null, Array(100));

  constructor(private httpClient: HttpClient,
    private productsService: ProductsService) { }


  ngOnInit(): void {
    this.getAllProducts();
  }
  getimage(id: number) {
    this.httpClient.get(environment.endpointURL + 'image/get/' + id).subscribe((data: ProductImage) => this.urls[id] = data[0]?.filePath
    );

  }

  /**
   * Get all the products currently stored in the database of the backend
   */
  getAllProducts(): void {
    this.productList$ = this.productsService.getProducts();
    this.productList$.subscribe(products => {
      const productIds = products.map(products => products.productId)
      for (var i = 0; i < productIds.length; i++) {
        this.getimage(productIds[i]);
        //Do something
      }
    })

  }

  /**
   * Filters all the products regarding their approval status.
   *
   * @param approval, can be pending, rejected, approved and null (for no filter)
   */
  filterProducts(approval: Approval): void {
    if (approval !== null) {
      this.productList$ = this.productsService.getProducts().pipe(map(products =>
        products.filter(product => product.adminApproval === approval)))
    }
    else {
      this.productList$ = this.productsService.getProducts()
    }
  }

  /**
   * Updates the product regarding it's approval and the disapproval message.
   *
   * If the product is approved, the disapproval message gets deleted.
   *
   * @param product, the product that was edited
   */
  onProductUpdate(product: Product): void {
    if (product.adminApproval === Approval.approved) {
      product.disapprovalMsg = '';
    }
    this.httpClient.put(environment.endpointURL + 'product/edit/' + product.productId, {
      adminApproval: product.adminApproval,
      disapprovalMsg: product.disapprovalMsg,
    }).pipe(finalize(() => this.filterProducts(this.filter))).subscribe();
  }

}



