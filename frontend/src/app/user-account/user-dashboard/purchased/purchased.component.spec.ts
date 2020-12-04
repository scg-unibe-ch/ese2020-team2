import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedComponent } from './purchased.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('PurchasedComponent', () => {
    let component: PurchasedComponent;
    let fixture: ComponentFixture<PurchasedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PurchasedComponent],imports: [HttpClientTestingModule, MatSnackBarModule]
        }).compileComponents();
      spyOn(window.localStorage, 'getItem').and.callFake(function() {
        return JSON.stringify({"user":"userId: 1"});
      });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PurchasedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
