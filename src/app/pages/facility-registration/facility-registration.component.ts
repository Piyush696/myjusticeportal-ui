import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facility-registration',
  templateUrl: './facility-registration.component.html',
  styleUrls: ['./facility-registration.component.css']
})
export class FacilityRegistrationComponent implements OnInit {

  step: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  onNextClick(value) {
    this.step = 2;
  }
}
