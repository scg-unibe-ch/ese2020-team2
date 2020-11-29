import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedComponent } from './posted.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('PostedComponent', () => {
    let component: PostedComponent;
    let fixture: ComponentFixture<PostedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostedComponent],
          imports: [HttpClientTestingModule, MatSnackBarModule]
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
