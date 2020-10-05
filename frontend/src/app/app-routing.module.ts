import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestsignupComponent } from './testsignup/testsignup.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CatalogComponent } from './catalog/catalog.component';


const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: TestsignupComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'account', component: UserAccountComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: "*", component: HomeComponent },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
