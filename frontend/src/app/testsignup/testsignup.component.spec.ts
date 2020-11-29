import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsignupComponent } from './testsignup.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('TestsignupComponent', () => {
    let component: TestsignupComponent;
    let fixture: ComponentFixture<TestsignupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestsignupComponent],
          imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatSnackBarModule,
            MatSelectModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestsignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
