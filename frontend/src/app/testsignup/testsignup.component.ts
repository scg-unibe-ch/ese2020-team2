import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import {Country} from '@angular-material-extensions/select-country'; 
import { CustomValidationService } from "src/app/services/passwordChecker";
export interface Gender {
  value: string;
  display: string;
}

@Component({
  selector: 'app-testsignup',
  templateUrl: './testsignup.component.html'
})
export class TestsignupComponent implements OnInit {
  hide = true;
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService
  ) {}

  
  ngOnInit() {

    console.log("fromregistercomponent")

    

  }



  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = "[a-z]+[A-Z]+[0-9].*"
  fieldTextType: boolean;

  
  userForm = this.fb.group(
    {
      username: [
        "",
        [Validators.required, Validators.minLength(3)],
        this.customValidator.validateUsernameNotTaken.bind(this.customValidator)
      ],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      gender: [""],
      firstname: [""],
      lastname: [""],
      country: [""],
      telNumber: [""],
        street: [""],
        city: [""],
        zip: [""],
        streetNumber: [""]
    },
    {
      validator: this.customValidator.passwordMatchValidator(
        "password",
        "confirmPassword"
      )
    }
  );
  selectedValue: string; 
   genders: Gender[] = [
      {value: 'female', display: 'Female'},
      {value: 'male', display: 'Male'}
   ];





  get email() {
    return this.userForm.get("email");
  }
  get username() {
    return this.userForm.get("username");
  }

  get confirmPassword() {
    return this.userForm.get("confirmPassword");
  }

  get password() {
    return this.userForm.get("password");
  }


  

  onCountrySelected($event: Country) {
    console.log($event);
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';

  }

  clear() {
    this.userForm.reset();
    //this.username.setValue("");
  }

  

  toLogIn() {

  }

  onSignUp() {
    console.log(this.userForm.value);
  }
}

