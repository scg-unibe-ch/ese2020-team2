import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TestsignupComponent} from './testsignup/testsignup.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {EdititemComponent} from './user-account/user-dashboard/edititem/edititem.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {CatalogComponent} from './catalog/catalog.component';
import {AuthGuardService} from "./auth/auth-guard.service";
import {Role} from "./models/role";
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {Catalog2Component} from './catalog2/catalog2.component';
import {UserDashboardComponent} from './user-account/user-dashboard/user-dashboard.component';
import {AdminComponent} from "./admin/admin.component";
import {DetailedProductComponent} from "./catalog2/detailed-product/detailed-product.component";
import {ShoppingCartComponent} from "./user-account/shopping-cart/shopping-cart.component";
import {ReviewComponent} from "./catalog2/review/review.component";
import {WishListComponent} from "./user-account/wish-list/wish-list.component";
import { ResetPasswordComponent } from './user-login/reset-password/reset-password.component';
import { WalletComponent } from './user-account/wallet/wallet.component';
import { PostItemComponent } from './user-account/post-item/post-item.component';
import { SoldComponent } from './user-account/user-dashboard/sold/sold.component';
import { PurchasedComponent } from './user-account/user-dashboard/purchased/purchased.component';
import { PostedComponent } from './user-account/user-dashboard/posted/posted.component';
import { SellItemComponent } from './user-account/post-item/sell-item/sell-item.component';
import { LendItemComponent } from './user-account/post-item/lend-item/lend-item.component';


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: TestsignupComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'account', component: UserAccountComponent,
    canActivate: [AuthGuardService], canLoad: [AuthGuardService], data: {roles: [Role.User,Role.Admin]},
    children:[
      { path: '', redirectTo:'wallet', pathMatch: 'full'},
      { path: 'wallet', component:WalletComponent},
      { path: 'postItem', component:PostItemComponent,
        children:[
          {path: '', redirectTo:'sell', pathMatch:'full'},
        {path: 'sell',component:SellItemComponent},
        {path: 'lend',component:LendItemComponent},
        ]},
      { path: 'dashboard', component:UserDashboardComponent,
      children:[
        {path: '', redirectTo:'posted', pathMatch:'full'},
        {path: 'posted',component:PostedComponent},
        {path: 'sold-lent',component:SoldComponent},
        //{path: 'lent',component:LentComponent},
        {path: 'purchased', component:PurchasedComponent}
      ]},
    ]},
  { path: 'edititem/:id', component: EdititemComponent,
    canActivate: [AuthGuardService], canLoad: [AuthGuardService], data: {roles: [Role.User, Role.Admin]}},
  { path: 'shopping-cart', component: ShoppingCartComponent,
    canActivate: [AuthGuardService], canLoad: [AuthGuardService], data: {roles: [Role.User, Role.Admin]}},
  { path: 'wish-list', component: WishListComponent,
    canActivate: [AuthGuardService], canLoad: [AuthGuardService], data: {roles: [Role.User, Role.Admin]}},
  { path: 'catalog', component: Catalog2Component},
  { path: 'product/:id', component: DetailedProductComponent},
  { path: 'resetPassword/:name', component: ResetPasswordComponent},
  { path: 'review/:id/:buyerId/:purchaseId', component: ReviewComponent,
    canActivate: [AuthGuardService], canLoad: [AuthGuardService], data: {roles: [Role.User, Role.Admin]}},



  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
    data: {
      roles: [
        Role.Admin,
      ]
    },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  // This line has to be at the very bottom, otherwise every route below does not work.
  { path: "**", component: NotFoundComponent},

];
export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class AppRoutingModule { }
