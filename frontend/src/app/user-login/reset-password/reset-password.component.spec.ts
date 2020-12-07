import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundComponent } from 'src/app/error/not-found/not-found.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, ReactiveFormsModule, BrowserAnimationsModule, MatFormFieldModule,RouterTestingModule.withRoutes(
        [{path: 'error/not-found', component: NotFoundComponent}])],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not let you change the password if you fail the question', ()=>{
    component.answer='false'
    component.correctAnswer='correct'
    component.checkAnswer()
    expect(component.answerWasCorrect).toBeFalse()
  })

  it('should let you change the password if you answer correctly the question', ()=>{
    component.answer='correct'
    component.correctAnswer='correct'
    component.checkAnswer()
    expect(component.answerWasCorrect).toBeTrue()
  })

  it('should create with undefined as starting answer', ()=>{
    expect(component.answer).toBe(undefined)
  })

  it('should start with a not correct answer', ()=>{
    expect(component.answerWasCorrect).toBeFalse()
  });
});
