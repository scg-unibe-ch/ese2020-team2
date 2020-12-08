import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomValidationService } from 'src/app/services/passwordChecker';
import { SnackBarService } from 'src/app/services/snackBar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
list$: Observable<any>;
userId: number;
question: string;
correctAnswer: string;
answer:string;
userName = '';
answerWasCorrect: boolean = false;
word: string;
attempts: number = 3;
passwordPattern = "^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{7,}$";
  constructor(private httpClient: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    public snackBar: SnackBarService,) {}

    userForm = this.fb.group(
      {
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: this.customValidator.passwordMatchValidator(
          "password",
          "confirmPassword"
        )
      }
    );

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.paramMap.get("name");
    this.list$=this.httpClient.get(environment.endpointURL + 'user/passwordReset/' +this.userName);
    this.setVariable();
  }

  get confirmPassword() { return this.userForm.get("confirmPassword") };
  get password() {
    return this.userForm.get("password");
  }

  setVariable(){
    this.list$.subscribe(item => this.userId = item.userId)
    this.list$.subscribe(item => this.question=item.passwordQuestion)
    this.list$.subscribe(item => this.correctAnswer = (item.passwordAnswer.toLowerCase()))
  }

  checkAnswer(){
    this.answerWasCorrect = (this.correctAnswer === this.answer.toLowerCase());
    if(this.answerWasCorrect){
    this.snackBar.open('You answered correctly', '', 3000, "success");
  } else {
    this.attempts--;
    }
    if(this.attempts==0){
      this.blockAccount();
    }
  }

  changePassword(){
    this.httpClient.put(environment.endpointURL + 'user/editUser/'+ this.userId, this.userForm.value).subscribe();
    this.router.navigate(['login']);
  }

  blockAccount(){
    this.httpClient.put(environment.endpointURL + 'user/editUser/'+ this.userId, {status:"blocked"}).subscribe();
  }
}
