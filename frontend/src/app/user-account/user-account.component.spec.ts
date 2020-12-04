import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountComponent } from './user-account.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { NotFoundComponent } from '../error/not-found/not-found.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserAccountComponent', () => {
    let component: UserAccountComponent;
    let fixture: ComponentFixture<UserAccountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserAccountComponent],
          imports: [HttpClientTestingModule,RouterTestingModule.withRoutes([{path: 'error/not-found', component: NotFoundComponent}])],
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
