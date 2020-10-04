import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import { CustomValidationService } from "src/app/services/passwordChecker";

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
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPatern = "[a-z]+[A-Z]+[0-9]+[@#\$&]*";
  fieldTextType: boolean;

toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

  userForm = this.fb.group(
    {
      username: [
        "",
        [Validators.required, Validators.minLength(3)],
        this.customValidator.validateUsernameNotTaken.bind(this.customValidator)
      ],
      password: ["", [Validators.required, Validators.pattern(this.passwordPatern)]],
      confirmPassword: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [""],
        city: [""],
        state: [""],
        zip: [""]
      }),
      daysAvailable: this.fb.array([this.fb.control("")])
    },
    {
      validator: this.customValidator.passwordMatchValidator(
        "password",
        "confirmPassword"
      )
    }
  );


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


  ngOnInit() {}

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

