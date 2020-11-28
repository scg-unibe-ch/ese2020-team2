import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendItemComponent } from './lend-item.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LendItemComponent', () => {
  let component: LendItemComponent;
  let fixture: ComponentFixture<LendItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendItemComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatSnackBarModule,
        MatSelectModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule]
    })
    .compileComponents();
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
      return JSON.stringify({"user":"userId: 1"});
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LendItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
