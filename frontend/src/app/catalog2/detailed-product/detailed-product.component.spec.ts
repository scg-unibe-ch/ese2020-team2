import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedProductComponent } from './detailed-product.component';

describe('DetailedProductComponent', () => {
  let component: DetailedProductComponent;
  let fixture: ComponentFixture<DetailedProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
