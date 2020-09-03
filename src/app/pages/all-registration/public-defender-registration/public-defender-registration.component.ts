import { Component, OnInit } from '@angular/core';
import { PublicDefenderService } from 'app/services/registration/public-defender.service';


@Component({
  selector: 'app-public-defender-registration',
  templateUrl: './public-defender-registration.component.html',
  styleUrls: ['./public-defender-registration.component.scss']
})

export class PublicDefenderRegistrationComponent implements OnInit {
  step: number = 1;
  roleId: number = 5;
  userName: string = '';
  totalSteps: number = 2;

  constructor(private publicDefenderService: PublicDefenderService) { }

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