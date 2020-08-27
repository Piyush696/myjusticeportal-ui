import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paralegal-registration',
  templateUrl: './paralegal-registration.component.html',
  styleUrls: ['./paralegal-registration.component.css']
})
export class ParalegalRegistrationComponent implements OnInit {
  step: number = 1;
  roleId: number = 4;
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
