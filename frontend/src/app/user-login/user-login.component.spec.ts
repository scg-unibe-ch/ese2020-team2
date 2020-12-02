import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundComponent } from '../error/not-found/not-found.component';
import { exception } from 'console';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports:[HttpClientTestingModule, MatSnackBarModule, RouterTestingModule.withRoutes(
        [{path: 'error/not-found', component: NotFoundComponent}])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
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
});
