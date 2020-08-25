import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'app/services/registration.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  step: number = 1;
  email: string;
  selectedRoleId: number = 1;
  constructor(private registrationService: RegistrationService, private toasterService: ToasterService, private router: Router) { }

  ngOnInit(): void {
  }

  onNextClick(value) {
    this.step = 2;
    this.email = value;

  }

  userMetaData(value) {
    this.step = 3;
  }

  onUpdateRegisteredUser(value: boolean) {
    this.registrationService.updateUser(value).subscribe((user: any) => {
      this.toasterService.showSuccessToater('Welcome to My Justice Portal.')
      this.router.navigateByUrl('/dashboard')
    })
  }

}
