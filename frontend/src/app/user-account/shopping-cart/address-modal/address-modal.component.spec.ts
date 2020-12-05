import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddressModalComponent } from './address-modal.component';

describe('AddressModalComponent', () => {
  let component: AddressModalComponent;
  let fixture: ComponentFixture<AddressModalComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressModalComponent ],
      imports:[MatDialogModule, HttpClientTestingModule, MatFormFieldModule, ReactiveFormsModule,
        MatSnackBarModule, BrowserAnimationsModule],
      providers:[{provide: MatDialogRef, useValue:mockDialogRef}],
    
    })
    .compileComponents();
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
