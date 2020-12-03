import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundComponent } from 'src/app/error/not-found/not-found.component';

import { UserDashboardComponent } from './user-dashboard.component';

describe('UserDashboardComponent', () => {
    let component: UserDashboardComponent;
    let fixture: ComponentFixture<UserDashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserDashboardComponent],
            imports:[RouterTestingModule.withRoutes([{path: 'error/not-found', component: NotFoundComponent}])]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});