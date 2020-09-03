import { Component, OnInit } from '@angular/core';
import { PublicDefenderService } from 'app/services/registration/public-defender.service';


@Component({
  selector: 'app-public-defender-registration',
  templateUrl: './public-defender-registration.component.html',
  styleUrls: ['./public-defender-registration.component.scss']
})

export class PublicDefenderRegistrationComponent implements OnInit {
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

  constructor(private publicDefenderService: PublicDefenderService) { }

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
      this.publicDefenderService.onRegistration(this.registrationData).subscribe((res: any) => {
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