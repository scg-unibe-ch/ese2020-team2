import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellItemComponent } from './sell-item.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('SellItemComponent', () => {
  let component: SellItemComponent;
  let fixture: ComponentFixture<SellItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellItemComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatSnackBarModule,
        MatSelectModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule]
    })
    .compileComponents();
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
      return JSON.stringify({"user":"userId: 1"});
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
