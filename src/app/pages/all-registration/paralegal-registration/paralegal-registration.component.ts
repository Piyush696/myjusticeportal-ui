import { Component, OnInit } from '@angular/core';
import { ParalegalService } from 'app/services/registration/paralegal.service';

@Component({
  selector: 'app-paralegal-registration',
  templateUrl: './paralegal-registration.component.html',
  styleUrls: ['./paralegal-registration.component.scss']
})

export class ParalegalRegistrationComponent implements OnInit {
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

  constructor(private paralegalService: ParalegalService) { }

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
      this.paralegalService.onRegistration(this.registrationData).subscribe((res: any) => {
        if (res.success) {
          this.userName = res.data.userName;
          this.step = 4;
        }
      });
    } else {
      this.step = 3;
    }
  }
}