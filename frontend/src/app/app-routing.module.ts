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


const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: TestsignupComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'account', component: UserAccountComponent,
    canActivate: [AuthGuardService], canLoad: [AuthGuardService], data: {roles: [Role.User,Role.Admin]}},
  { path: 'edititem/:id', component: EdititemComponent,
    canActivate: [AuthGuardService], canLoad: [AuthGuardService], data: {roles: [Role.User, Role.Admin]}},
  { path: 'dashboard', component: UserDashboardComponent,
    canActivate: [AuthGuardService], canLoad: [AuthGuardService], data: {roles: [Role.User, Role.Admin]}},
  { path: 'catalog', component: CatalogComponent},
  { path: 'catalog2', component: Catalog2Component},
  { path: 'product/:id', component: DetailedProductComponent},

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
