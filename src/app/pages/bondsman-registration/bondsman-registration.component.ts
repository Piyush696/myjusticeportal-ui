import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bondsman-registration',
  templateUrl: './bondsman-registration.component.html',
  styleUrls: ['./bondsman-registration.component.css']
})
export class BondsmanRegistrationComponent implements OnInit {
  step: number = 1;
  roleId: number = 6;
  userName;
  totalSteps: number = 2
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
