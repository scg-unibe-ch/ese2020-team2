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
import { UserSignupComponent } from './user-signup/user-signup.component';
import {MatIconModule} from '@angular/material/icon';
import { TestsignupComponent } from './testsignup/testsignup.component';
import {UserAccountComponent} from "./user-account/user-account.component";
import {ToDoListsComponent} from "./user-account/todo-lists/todo-lists.component";
import {WalletComponent} from "./user-account/wallet/wallet.component";
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './user-account/history/history.component';
import {MatSelectModule} from "@angular/material/select";
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    UserLoginComponent,
    UserSignupComponent,
    TestsignupComponent,
    UserAccountComponent,
    ToDoListsComponent,
    WalletComponent,
    HomeComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
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
    MatSelectCountryModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
