import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'app/services/toaster.service';
import { Router } from '@angular/router';
import { LawyerService } from 'app/services/registration/lawyer.service';

@Component({
  selector: 'app-lawyer-registration',
  templateUrl: './lawyer-registration.component.html',
  styleUrls: ['./lawyer-registration.component.scss']
})

export class LawyerRegistrationComponent implements OnInit {
  step: number = 1;
  totalSteps: number = 4;
  roleId: number = 2;
  userName: string;
  registrationData = {
    'user': {},
    'organization': {
      'address': {}
    },
    'facilityIds': []
  }

  constructor(private lawyerService: LawyerService) { }

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
      this.registrationData.facilityIds = selectedfacility;
      this.lawyerService.onRegistration(this.registrationData).subscribe((res: any) => {
        if (res.success) {
          console.log(res.data.userName)
          this.userName = res.data.userName
          this.step = 4;
        }
      });
    } else {
      this.step = 3;
    }
  }
}