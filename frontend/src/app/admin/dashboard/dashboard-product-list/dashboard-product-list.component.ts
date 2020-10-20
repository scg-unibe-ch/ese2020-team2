import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from "../../../../environments/environment";
import {Product} from "../../../models/product.model";
import {Approval} from "../../../models/approval";
import {ProductsService} from "../../../services/products.service";
import {ProductList} from "../../../models/product-list.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-dashboard-product-list',
  templateUrl: './dashboard-product-list.component.html',
  styleUrls: ['./dashboard-product-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardProductListComponent {

  @Input()
  product: Product = new Product(3,"bbb",
    "Product 1",
    Approval.Pending,
    false,
    "Unethical content","","");

  @Output()
  update = new EventEmitter<Product>();

  @Output()
  delete = new EventEmitter<Product>();

  productList: ProductList;
  dataSource: Product[];
  columnsToDisplay = ['productId', 'userName', 'title', 'approved', 'appearMarketplace', 'disapprovalMessage'];
  displayedColumns: string[] = ['productId', 'userName', 'title', 'approved', 'appearMarketplace', 'disapprovalMessage'];

  expandedElement: Product | null;


  constructor(private httpClient: HttpClient,
              private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productList = this.productsService.getProducts();
    this.dataSource = this.productList.products;
  }

/*
  // TodoItem - CREATE
  onItemCreate(): void {
    this.httpClient.post(environment.endpointURL + 'todoitem', {
      name: this.newTodoItemName,
      done: false,
      todoListId: this.product.userName
    }).subscribe((item: any) => {
      this.todoList.todoItems.push(new TodoItem(item.todoItemId, item.todoListId, item.name, item.done));
      this.newTodoItemName = '';
    });
  }
*/
  // TodoItem - READ
  // Not required since all TodoItems of a TodoList are provided with the list itself

  // TodoItem - UPDATE
  onItemUpdate(product: Product): void{
    this.httpClient.put(environment.endpointURL + 'product/' + product.productId, {
      productId: product.productId,
      title: product.title,
      approved: product.approved,
      disapprovalMessage: product.disapprovalMessage,
      appearMarketplace: product.appearMarketplace,
    }).subscribe();
  }
// We need this function!!!
  /*
  // TodoItem - DELETE
  onItemDelete(todoItem: TodoItem): void{
    this.httpClient.delete(environment.endpointURL + 'todoitem/' + todoItem.itemId).subscribe(() => {
      this.productList.products.splice(this.productList.products.indexOf(todoItem), 1);
    });
  }
   */
/*
  // TodoList - CREATE
  onListCreate(): void {
    this.httpClient.post(environment.endpointURL + 'todolist', {
      name: this.newTodoListName
    }).subscribe((instance: any) => {
      this.todoLists.push(new TodoList(instance.todoListId, instance.name, []));
      this.newTodoListName = '';
    });
  }
*/



  /*// TodoList - READ
  ngOnInit(): void {
    this.httpClient.get(environment.endpointURL + 'todolist').subscribe((instances: any) => {
      this.todoLists = instances.map((instance: any) => {
        const todoItems = instance.todoItems.map((item: any) => new TodoItem(item.todoItemId, item.todoListId, item.name, item.done));

        return new TodoList(instance.todoListId, instance.name, todoItems);
      });
    });
  }

  // TodoList - UPDATE
  onListUpdate(todoList: TodoList): void {
    this.httpClient.put(environment.endpointURL + 'todolist/' + todoList.listId, {
      name: todoList.name,
    }).subscribe();
  }

  // TodoList - DELETE
  onListDelete(todoList: TodoList): void {
    this.httpClient.delete(environment.endpointURL + 'todolist/' + todoList.listId).subscribe(() => {
      this.todoLists.splice(this.todoLists.indexOf(todoList), 1);
    });
  }
*/
}



