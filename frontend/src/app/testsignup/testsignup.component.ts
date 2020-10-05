import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray, NgForm } from "@angular/forms";
import {Country} from '@angular-material-extensions/select-country'; 
import { environment } from '../../environments/environment';
import { CustomValidationService } from "src/app/services/passwordChecker";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private customValidator: CustomValidationService
  ) {}


  
  
  ngOnInit(): void {
  }




  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = "[a-z]+[A-Z]+[0-9].*"
  fieldTextType: boolean;

  
  userForm = this.fb.group(
    {
      username: [
        "",
        Validators.required,],
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
   userToken: string;





  get email() {return this.userForm.get("email")};
  get username() {return this.userForm.get("username")};
  get street() {return this.userForm.get("street")};
  get zip() {return this.userForm.get("zip")};

  get confirmPassword() {return this.userForm.get("confirmPassword")};
  get city() {    return this.userForm.get("city")};
  get firstname() {    return this.userForm.get("firstname")};
  get telNumber() {    return this.userForm.get("telNumber")};
  get lastname() {
    return this.userForm.get("lastname");
  }

  get country() {
    return this.userForm.get("country");
  }

  get password() {
    return this.userForm.get("password");
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

  signup(userForm: FormBuilder) {
    this.httpClient.post(environment.endpointURL + 'user/register', 
      userForm

    )}
    
    ;


  toLogIn() {

  }


}



