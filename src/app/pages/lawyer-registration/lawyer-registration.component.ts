import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lawyer-registration',
  templateUrl: './lawyer-registration.component.html',
  styleUrls: ['./lawyer-registration.component.css']
})
export class LawyerRegistrationComponent implements OnInit {
  step: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  onNextClick(value) {
    this.step = 2;
  }

}
