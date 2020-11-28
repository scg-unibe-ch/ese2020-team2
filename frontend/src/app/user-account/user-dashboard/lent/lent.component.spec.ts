import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LentComponent } from './lent.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('LentComponent', () => {
    let component: LentComponent;
    let fixture: ComponentFixture<LentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [LentComponent],
          imports: [HttpClientTestingModule, MatSnackBarModule]
        }).compileComponents();
      spyOn(window.localStorage, 'getItem').and.callFake(function() {
        return JSON.stringify({"user":"role: user"});
      });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
