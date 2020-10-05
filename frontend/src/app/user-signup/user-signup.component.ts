import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ASTWithSource } from '@angular/compiler';



@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {


  userName = '';
  password= new FormControl('', [Validators.required, ]);
  confirmPassword= new FormControl('', [Validators.required, ]);
  hide = true;
  firstName ="";
  lastName = "";
  email = new FormControl('', [Validators.required, Validators.email]);
  gender ="";
  address="";
  telNumber="";





  ngOnInit() {
}


  constructor() {}



  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';

  }





  signup() {

  }

}
