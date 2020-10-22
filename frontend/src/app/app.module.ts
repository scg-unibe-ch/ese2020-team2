import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './user-account/todo-lists/todo-list/todo-list.component';
import { TodoItemComponent } from './user-account/todo-lists/todo-list/todo-item/todo-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserLoginComponent } from './user-login/user-login.component';
import {MatIconModule} from '@angular/material/icon';
import { TestsignupComponent } from './testsignup/testsignup.component';
import {UserAccountComponent} from "./user-account/user-account.component";
import {ToDoListsComponent} from "./user-account/todo-lists/todo-lists.component";
import {WalletComponent} from "./user-account/wallet/wallet.component";
import { HomeComponent } from './home/home.component';
import {MatSelectModule} from "@angular/material/select";
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { AppRoutingModule } from './app-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {AuthGuardService} from "./auth/auth-guard.service";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {UserDirective} from "./directives/user.directive";
import {UserRoleDirective} from "./directives/user-role.directive";
import {NotFoundComponent} from "./error/not-found/not-found.component";
import { MatTableModule } from '@angular/material/table'
import { DataSource } from '@angular/cdk/table';
import { Catalog2Component } from './catalog2/catalog2.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LendItemComponent } from './user-account/lend-item/lend-item.component';
import { UserDashboardComponent } from './user-account/user-dashboard/user-dashboard.component';
import { PurchasedComponent } from './user-account/user-dashboard/purchased/purchased.component';
import { SoldComponent } from './user-account/user-dashboard/sold/sold.component';
import { PostedComponent } from './user-account/user-dashboard/posted/posted.component';
import { LentComponent } from './user-account/user-dashboard/lent/lent.component';
import { ProductList } from './models/product-list.model';
import { EdititemComponent } from './user-account/user-dashboard/edititem/edititem.component';




@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    UserLoginComponent,
    TestsignupComponent,
    UserAccountComponent,
    ToDoListsComponent,
    WalletComponent,
    HomeComponent,
    CatalogComponent,
    UserDirective,
    UserRoleDirective,
    NotFoundComponent,
    Catalog2Component,
    LendItemComponent,
    PurchasedComponent,
    SoldComponent,
    UserDashboardComponent,
    PostedComponent,
    LentComponent,
    EdititemComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    FlexLayoutModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSelectModule,
    AppRoutingModule,
    MatSelectCountryModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatTooltipModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    [AuthGuardService],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    TodoListComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
