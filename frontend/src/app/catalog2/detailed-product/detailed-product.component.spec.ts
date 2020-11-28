import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedProductComponent } from './detailed-product.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotFoundComponent} from "../../error/not-found/not-found.component";


describe('DetailedProductComponent', () => {
  let component: DetailedProductComponent;
  let fixture: ComponentFixture<DetailedProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedProductComponent, NotFoundComponent ],
      imports: [HttpClientModule, MatSnackBarModule,  RouterTestingModule.withRoutes(
        [{path: 'error/not-found', component: NotFoundComponent}])],
      providers: []
    })
    .compileComponents();
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
      return JSON.stringify({"user":"role: user"});

    });}));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
