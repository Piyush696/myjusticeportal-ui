import { Component, OnInit } from '@angular/core';
import { BondsmanService } from 'app/services/registration/bondsman.service';

@Component({
  selector: 'app-bondsman-registration',
  templateUrl: './bondsman-registration.component.html',
  styleUrls: ['./bondsman-registration.component.scss']
})

export class BondsmanRegistrationComponent implements OnInit {
  step: number = 1;
  roleId: number = 6;
  userName: string;
  totalSteps: number = 2;

  constructor(private bondsmanService: BondsmanService) { }

  ngOnInit(): void {
  }

  onNextClick(value) {
    if (value) {
      this.userName = value;
      this.step = 2;
    } else {
      this.step = 1;
    }
  }
}