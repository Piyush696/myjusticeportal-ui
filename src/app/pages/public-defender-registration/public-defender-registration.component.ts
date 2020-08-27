import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-public-defender-registration',
  templateUrl: './public-defender-registration.component.html',
  styleUrls: ['./public-defender-registration.component.css']
})
export class PublicDefenderRegistrationComponent implements OnInit {

  step: number = 1;
  roleId: number = 5;
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
