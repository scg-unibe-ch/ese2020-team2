import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { routes } from './admin-routing.module';
import {DashboardProductListComponent} from "./dashboard/dashboard-product-list/dashboard-product-list.component";
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
import {MatRadioModule} from "@angular/material/radio";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardProductListComponent,
    AdminComponent,
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
    MatTableModule,
    MatRadioModule,
    MatToolbarModule,
    FlexModule,
    MatButtonToggleModule
  ],
  exports: [
    DashboardProductListComponent,
  ],
  providers: []
})
export class AdminModule { }
