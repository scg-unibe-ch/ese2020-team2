import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Catalog2Component } from './catalog2.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {WishListService} from "../services/wish-list.service";
import {SnackBarService} from "../services/snackBar.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('Catalog2Component', () => {
  let component: Catalog2Component;
  let fixture: ComponentFixture<Catalog2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Catalog2Component ],
      imports: [HttpClientModule, MatSnackBarModule, RouterTestingModule],
      providers: [WishListService, SnackBarService,]
    })
    .compileComponents();
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
      return JSON.stringify({"user":"userId: 4"});
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Catalog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
