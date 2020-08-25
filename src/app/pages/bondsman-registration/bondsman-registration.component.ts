import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bondsman-registration',
  templateUrl: './bondsman-registration.component.html',
  styleUrls: ['./bondsman-registration.component.css']
})
export class BondsmanRegistrationComponent implements OnInit {
  selectedRoleId: number = 6;
  step: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  onNextClick(value) {
    this.step = 2;
  }

}
