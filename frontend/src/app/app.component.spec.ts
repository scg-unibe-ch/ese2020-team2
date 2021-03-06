import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";
import {CurrentUser} from "./services/current-user";
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";
import {MatMenuModule} from "@angular/material/menu";
import {HttpClientTestingModule} from "@angular/common/http/testing";



describe('AppComponent', () => {
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],imports: [
        HttpClientTestingModule, BrowserAnimationsModule, MatDialogModule, MatSnackBarModule, RouterTestingModule, MatMenuModule
      ], providers: [
        AuthService, CurrentUser, {provide: MatDialogRef, useValue:mockDialogRef}
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("frontend");
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('ESE Project');
  });
});
