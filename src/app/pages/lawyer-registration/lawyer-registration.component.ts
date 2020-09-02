import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'app/services/toaster.service';
import { Router } from '@angular/router';
import { LawerService } from 'app/services/registration/lawer.service';

@Component({
  selector: 'app-lawyer-registration',
  templateUrl: './lawyer-registration.component.html',
  styleUrls: ['./lawyer-registration.component.css']
})

export class LawyerRegistrationComponent implements OnInit {
  step: number = 1;
  roleId: number = 2;
  regUserData = {};
  totalSteps: number = 2;
  registrationData = {
    'user': {},
    'organization': {
      'address': {}
    },
    'facilityIds': {}
  }

  constructor(private lawerService: LawerService) { }

  ngOnInit(): void {
  }

  onNextClick(userData) {
    if (userData) {
      this.registrationData.user = userData;
      this.step = 2;
    } else {
      this.step = 1;
    }
  }

  onCreateOrganisation(orgData) {
    if (orgData) {
      this.step = 3;
      this.registrationData.organization = orgData.name;
      this.registrationData.organization.address = orgData.address;
    } else {
      this.step = 2;
    }
  }

  onSelectedfacility(selectedfacility) {
    if (selectedfacility) {
      this.step = 4;
      this.registrationData.facilityIds = selectedfacility;
      console.log(this.registrationData);
      this.lawerService.onRegistration(this.registrationData).subscribe((res: any) => {
        console.log(res);
      });
    } else {
      this.step = 3;
    }
  }
}