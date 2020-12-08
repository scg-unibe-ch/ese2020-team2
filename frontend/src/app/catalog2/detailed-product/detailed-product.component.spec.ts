import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedProductComponent } from './detailed-product.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotFoundComponent} from "../../error/not-found/not-found.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


describe('DetailedProductComponent', () => {
  let component: DetailedProductComponent;
  let fixture: ComponentFixture<DetailedProductComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedProductComponent, NotFoundComponent ],
      imports: [HttpClientModule, MatSnackBarModule, MatDialogModule,  RouterTestingModule.withRoutes(
        [{path: 'error/not-found', component: NotFoundComponent}])],
      providers: [{provide: MatDialogRef, useValue:mockDialogRef}]
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
