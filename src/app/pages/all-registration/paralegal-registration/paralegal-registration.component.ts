import { Component, OnInit } from '@angular/core';
import { ParalegalService } from 'app/services/registration/paralegal.service';

@Component({
  selector: 'app-paralegal-registration',
  templateUrl: './paralegal-registration.component.html',
  styleUrls: ['./paralegal-registration.component.scss']
})

export class ParalegalRegistrationComponent implements OnInit {
  step: number = 1;
  roleId: number = 4;
  userName: string;
  totalSteps: number = 2;

  constructor(private paralegalService: ParalegalService) { }

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