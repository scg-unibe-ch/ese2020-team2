import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../models/product.model";
import {Approval} from "../../../../models/approval";

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.css']
})
export class DashboardProductComponent {

  @Input()
  product: Product = new Product(3,
    "service",
    "Product 3",
    "aa",
    23,
    "this is a posting",
    "be",
    "sell",
    "sold",
    true,
    "pending",
    "Unethical content",
    false,
    "");

  @Output()
  update = new EventEmitter<Product>();

  @Output()
  delete = new EventEmitter<Product>();

  onItemUpdate(): void {
    // Emits event to parent component that TodoItem got updated
    this.update.emit(this.product);
  }

  onItemDelete(): void {
    // Emits event to parent component that TodoItem got deleted
    this.delete.emit(this.product);
  }
}
