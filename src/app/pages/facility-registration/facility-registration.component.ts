import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facility-registration',
  templateUrl: './facility-registration.component.html',
  styleUrls: ['./facility-registration.component.css']
})
export class FacilityRegistrationComponent implements OnInit {
  step: number = 1;
  roleId: number = 3;
  userName;
  totalSteps: number = 2;
  constructor() { }

  ngOnInit(): void {
  }

  onNextClick(value) {
    if (value) {
      this.userName = value;
      this.step = 2;
    }
    else {
      this.step = 1;
    }
  }
}
