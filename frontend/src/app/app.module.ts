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
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Ng5SliderModule } from 'ng5-slider';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserLoginComponent } from './user-login/user-login.component';
import {MatIconModule} from '@angular/material/icon';
import { TestsignupComponent } from './testsignup/testsignup.component';
import {UserAccountComponent} from "./user-account/user-account.component";
import {WalletComponent} from "./user-account/wallet/wallet.component";
import { HomeComponent } from './home/home.component';
import {MatSelectModule} from "@angular/material/select";
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { AppRoutingModule } from './app-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AuthGuardService} from "./auth/auth-guard.service";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {UserDirective} from "./directives/user.directive";
import {UserRoleDirective} from "./directives/user-role.directive";
import {NotFoundComponent} from "./error/not-found/not-found.component";
import { MatTableModule } from '@angular/material/table'
import { Catalog2Component } from './catalog2/catalog2.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { UserDashboardComponent } from './user-account/user-dashboard/user-dashboard.component';
import { PurchasedComponent } from './user-account/user-dashboard/purchased/purchased.component';
import { SoldComponent } from './user-account/user-dashboard/sold/sold.component';
import { PostedComponent } from './user-account/user-dashboard/posted/posted.component';
import { LentComponent } from './user-account/user-dashboard/lent/lent.component';
import { EdititemComponent } from './user-account/user-dashboard/edititem/edititem.component';
import {AdminModule} from "./admin/admin.module";
import { PostItemComponent } from './user-account/post-item/post-item.component';
import { SellItemComponent } from './user-account/post-item/sell-item/sell-item.component';
import { LendItemComponent } from './user-account/post-item/lend-item/lend-item.component';
import { DetailedProductComponent } from './catalog2/detailed-product/detailed-product.component';
import {MatBadgeModule} from '@angular/material/badge';
import { ShoppingCartComponent } from './user-account/shopping-cart/shopping-cart.component';
import { ReviewComponent } from './catalog2/review/review.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { WishListComponent } from './user-account/wish-list/wish-list.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ModalComponent } from './modal/modal.component';
import { ResetPasswordComponent } from './user-login/reset-password/reset-password.component';
import { AddressModalComponent } from './user-account/shopping-cart/address-modal/address-modal.component';
import { NotificationModalComponent } from './user-account/notification-modal/notification-modal.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {CdkTableModule} from "@angular/cdk/table";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {_MatMenuDirectivesModule, MatMenuModule} from "@angular/material/menu";
import { ModalimgComponent } from './modalimg/modalimg.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    TestsignupComponent,
    UserAccountComponent,
    ModalComponent,
    WalletComponent,
    HomeComponent,
    CatalogComponent,
    UserDirective,
    UserRoleDirective,
    NotFoundComponent,
    Catalog2Component,
    PurchasedComponent,
    SoldComponent,
    PostItemComponent,
    UserDashboardComponent,
    PostedComponent,
    SellItemComponent,
    LendItemComponent,
    LentComponent,
    EdititemComponent,
    DetailedProductComponent,
    ShoppingCartComponent,
    ReviewComponent,
    WishListComponent,
    ResetPasswordComponent,
    AddressModalComponent,
    NotificationModalComponent,
    ModalimgComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    Ng5SliderModule,
    FormsModule,
    NgbModule,
    DragDropModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxSliderModule,
    AppRoutingModule,
    MatSelectCountryModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatTooltipModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    CdkTableModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
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
    MatInputModule

  ],
  bootstrap: [
    AppComponent,
  ],
  entryComponents: [ModalComponent]
})
export class AppModule { }
