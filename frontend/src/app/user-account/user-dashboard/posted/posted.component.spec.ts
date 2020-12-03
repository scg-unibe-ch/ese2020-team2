import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedComponent } from './posted.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { NotFoundComponent } from 'src/app/error/not-found/not-found.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('PostedComponent', () => {
    let component: PostedComponent;
    let fixture: ComponentFixture<PostedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostedComponent],
          imports: [HttpClientTestingModule, MatSnackBarModule,RouterTestingModule.withRoutes([{path: 'error/not-found', component: NotFoundComponent}])]
        }).compileComponents();
      spyOn(window.localStorage, 'getItem').and.callFake(function() {
        return JSON.stringify({"user":"role: user"});
      });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
