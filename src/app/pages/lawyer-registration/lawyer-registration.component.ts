import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'app/services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lawyer-registration',
  templateUrl: './lawyer-registration.component.html',
  styleUrls: ['./lawyer-registration.component.css']
})

export class LawyerRegistrationComponent implements OnInit {
  step: number = 1;
  roleId: number = 2;
  userName;
  totalSteps: number = 2;

  constructor() { }

  ngOnInit(): void {
  }

  onNextClick(value) {
    console.log(value)
    if (value) {
      this.userName = value;
      this.step = 2;
    }
    else {
      this.step = 1;
    }
  }

}
