import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { routes } from './admin-routing.module';
import {DashboardProductListComponent} from "./dashboard/dashboard-product-list/dashboard-product-list.component";
import {DashboardProductComponent} from "./dashboard/dashboard-product-list/dashboard-product/dashboard-product.component";
import {TodoListComponent} from "../user-account/todo-lists/todo-list/todo-list.component";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardProductListComponent,
    DashboardProductComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [
    DashboardProductListComponent,
  ],
  providers: []
})
export class AdminModule { }
