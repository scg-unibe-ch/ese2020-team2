import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ModalimgComponent } from './modalimg.component';

describe('ModalimgComponent', () => {
  let component: ModalimgComponent;
  let fixture: ComponentFixture<ModalimgComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalimgComponent ],
      imports:[MatDialogModule],
      providers:[{provide: MatDialogRef, useValue:mockDialogRef}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
