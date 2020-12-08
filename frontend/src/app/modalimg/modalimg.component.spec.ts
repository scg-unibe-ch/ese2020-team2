import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalimgComponent } from './modalimg.component';

describe('ModalimgComponent', () => {
  let component: ModalimgComponent;
  let fixture: ComponentFixture<ModalimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalimgComponent ]
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
