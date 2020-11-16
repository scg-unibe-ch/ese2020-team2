import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray, NgForm } from "@angular/forms";
import { environment } from '../../environments/environment';
import { CustomValidationService } from "src/app/services/passwordChecker";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
export interface Gender {
  value: string;
  display: string;
}
export interface Country {
  value: string;
  display: string;
}

@Component({
  selector: 'app-testsignup',
  templateUrl: './testsignup.component.html'
})
export class TestsignupComponent implements OnInit {
  hide = true;
  name ="";
  private registered = false;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    public snackBar: MatSnackBar
  ) {}




  ngOnInit(): void {
    this.registered = false;
  }




//pattern to verify that it is a valid password/email

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = "^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{7,}$";
  fieldTextType: boolean;


  //the userform saves the informatin and applies validators to some fields

  userForm = this.fb.group(
    {
      userName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      gender: [""],
      firstName: [""],
      lastName: [""],
      country: [""],
      telNumber: [""],
      street: [""],
      city: [""],
      role: ["admin"],
      zip: [""],
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

   countrys: Country[] = [
      {value: 'panama', display: 'Panama'},{value: 'France', display: 'France'},{value: 'Russia', display: 'Russia'},
      {value: 'Ukraine', display: 'Ukraine  '},{value: 'Switzerland', display: 'Switzerland'},{value: 'Italy', display: 'Italy'},

   ];



//getters for the form values

  get email() { return this.userForm.get("email") };
  get userName() { return this.userForm.get("userName") };
  get street() { return this.userForm.get("street") };
  get pinCode() { return this.userForm.get("zip") };
  get role() {return this.userForm.get("role")};
  get confirmPassword() { return this.userForm.get("confirmPassword") };
  get city() { return this.userForm.get("city") };
  get firstName() { return this.userForm.get("firstName") };
  get telNumber() { return this.userForm.get("telNumber") };
  get lastName() {
    return this.userForm.get("lastName");
  }

  get country() {
    return this.userForm.get("country");
  }

  get password() {
    return this.userForm.get("password");
  }





//error messages for email

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';

  }


  clear() {
    this.userForm.reset();
    //this.username.setValue("");
  }


  //sends userform to bakcend to register new user
  signup() {
    this.httpClient.post(environment.endpointURL + 'user/register',
      this.userForm.value).subscribe((res: any) => {
      this.openSnackBar('You successfully registered!', '');
    }, (error: any) => {
      this.openSnackBar('Registering was not possible, please try again', '');
    }),this.router.navigate(['login', {queryParams: { registered: 'true' } }]);
}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
    });
  }

}



