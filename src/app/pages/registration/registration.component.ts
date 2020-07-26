import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    })
  }

  onRegister() {
    console.log(this.registrationForm.value)
    this.registrationService.addUser(this.registrationForm.value).subscribe((result) => {
      console.log(result)
    })
  }
}
