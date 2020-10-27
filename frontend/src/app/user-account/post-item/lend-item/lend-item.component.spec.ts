import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LendItemComponent } from './lend-item.component';

describe('LendItemComponent', () => {
  let component: LendItemComponent;
  let fixture: ComponentFixture<LendItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LendItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
