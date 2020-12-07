import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundComponent } from '../error/not-found/not-found.component';
import { exception } from 'console';
import {AppComponent} from "../app.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ AuthService, AppComponent],
      imports:[HttpClientTestingModule, MatSnackBarModule, MatDialogModule, RouterTestingModule.withRoutes(
        [{path: 'error/not-found', component: NotFoundComponent}])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch the boolean', ()=>{
    component.toForgotPassword();
    expect(component.resetPassword).toBeTrue()
  });

  it('should switch the boolean 2 times', ()=>{
    component.toForgotPassword();
    expect(component.resetPassword).toBeTrue()
    component.toLogIn();
    expect(component.resetPassword).toBeFalse()
  });
  it('should have not have an userName without typing it', ()=>{
    expect(component.userName).toBe(null)
  })
  it('should have not have an password without typing it', ()=>{
    expect(component.password).toBe('')
  })
});
