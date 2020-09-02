import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'app/services/toaster.service';
import { Router } from '@angular/router';

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

  constructor() { }

  ngOnInit(): void {
  }

  onNextClick(userData) {
    console.log(userData)
    if (userData) {
      this.regUserData['user'] = userData;
      this.step = 2;
    }
    else {
      this.step = 1;
    }
  }

  onCreateOrganisation(OrgData) {
    console.log(OrgData)
    if (OrgData) {
      this.step = 3;
      this.regUserData['organization'] = OrgData
    }
    else {
      this.step = 2;
    }
  }

  onSelectedfacility(selectedfacility) {
    if (selectedfacility) {
      this.step = 4
      this.regUserData['facilities'] = selectedfacility
      console.log(this.regUserData)
    }
    else {
      this.step = 3;
    }
  }
}
