import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountComponent } from './user-account.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UserAccountComponent', () => {
    let component: UserAccountComponent;
    let fixture: ComponentFixture<UserAccountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserAccountComponent],
          imports: [HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
