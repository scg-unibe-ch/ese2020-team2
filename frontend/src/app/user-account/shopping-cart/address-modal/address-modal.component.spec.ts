import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddressModalComponent } from './address-modal.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

describe('AddressModalComponent', () => {
  let component: AddressModalComponent;
  let fixture: ComponentFixture<AddressModalComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports:[MatDialogModule, HttpClientTestingModule, MatFormFieldModule, FormsModule,
        ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule,
        BrowserAnimationsModule],
      providers:[{provide: MatDialogRef, useValue:mockDialogRef}],

    })
    .compileComponents();
    spyOn(window.localStorage, 'getItem').and.callFake(function() {
      return JSON.stringify({"user":"userId: 4"});
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
