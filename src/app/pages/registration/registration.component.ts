import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.firstName.hasError('required')) {
      return 'You must enter a value';
    }
    return this.firstName.hasError('email') ? 'Not a valid email' : '';
  }

}
