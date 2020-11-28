import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {WishListComponent} from "../wish-list/wish-list.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, ReactiveFormsModule, MatSnackBarModule,
        MatSelectModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule]
    })
      .compileComponents();
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
      return JSON.stringify({"user":"userId: 1"});
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
