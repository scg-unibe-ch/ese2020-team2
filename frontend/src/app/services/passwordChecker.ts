
import { Injectable } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CustomValidationService {
  constructor(private http: HttpClient) { }
/**
 * Checks if the two given strings are equal
 * 
 * If eather password or confirmPassword are null, it will return null
 * If there are errors but not a password mismatch, then it returns null
 * If if the password and the confirmPassword are not equal, it will set an error withpasswordMissmatch true
 * Otherwise it will sets the errors as null
 * @param password rapresents password
 * @param confirmPassword rapresents the confirm password
 */
  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }


}