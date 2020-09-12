import { Component, OnInit } from '@angular/core';
import { HireLawyerService } from '../../../services/hire-lawyer.service';

@Component({
  selector: 'app-lawyerdashboard',
  templateUrl: './lawyerdashboard.component.html',
  styleUrls: ['./lawyerdashboard.component.css']
})

export class LawyerdashboardComponent implements OnInit {
  requestedCases: any;

  constructor(private hireLawyerService: HireLawyerService) { }

  ngOnInit(): void {
    this.onGetRequestedCases();
  }

  onGetRequestedCases() {
    this.hireLawyerService.getRequestedCases().subscribe((res: any) => {
      if (res.data) {
        this.requestedCases = res.data.lawyer;
        console.log(this.requestedCases);
      }
    })
  }
}