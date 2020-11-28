import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdititemComponent } from './edititem.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../../auth/auth.service";
import {RouterTestingModule} from "@angular/router/testing";
import {NotFoundComponent} from "../../../error/not-found/not-found.component";
import {UserAccountComponent} from "../../user-account.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('EdititemComponent', () => {
    let component: EdititemComponent;
    let fixture: ComponentFixture<EdititemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EdititemComponent],
          imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
            [{path: 'account', component: UserAccountComponent}]),
            ReactiveFormsModule, MatSnackBarModule,
            MatSelectModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
          providers: [AuthService]
        }).compileComponents();
      spyOn(window.localStorage, 'getItem').and.callFake(function() {
        return JSON.stringify({"user":"userId: 1"});
      });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EdititemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
