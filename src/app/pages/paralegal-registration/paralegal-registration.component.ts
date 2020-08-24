import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paralegal-registration',
  templateUrl: './paralegal-registration.component.html',
  styleUrls: ['./paralegal-registration.component.css']
})
export class ParalegalRegistrationComponent implements OnInit {

  step: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  onNextClick(value) {
    this.step = 2;
  }
}
