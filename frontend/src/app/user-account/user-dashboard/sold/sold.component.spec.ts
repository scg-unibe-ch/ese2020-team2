import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldComponent } from './sold.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {UserAccountComponent} from "../../user-account.component";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {AppComponent} from "../../../app.component";

describe('SoldComponent', () => {
    let component: SoldComponent;
    let fixture: ComponentFixture<SoldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [SoldComponent],
          imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule, MatDialogModule],
          providers: [UserAccountComponent, AppComponent],
        }).compileComponents();
      spyOn(window.localStorage, 'getItem').and.callFake(function() {
        return JSON.stringify({"user":"userId: 1"});
      });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SoldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
