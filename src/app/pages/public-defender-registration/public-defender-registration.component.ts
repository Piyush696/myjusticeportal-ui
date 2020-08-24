import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-defender-registration',
  templateUrl: './public-defender-registration.component.html',
  styleUrls: ['./public-defender-registration.component.css']
})
export class PublicDefenderRegistrationComponent implements OnInit {

  step: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  onNextClick(value) {
    this.step = 2;
  }

}
