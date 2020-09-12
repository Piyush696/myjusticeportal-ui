import { Component, OnInit } from '@angular/core';
import { HireLawyerService } from '../../../services/hire-lawyer.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-lawyerdashboard',
  templateUrl: './lawyerdashboard.component.html',
  styleUrls: ['./lawyerdashboard.component.scss']
})

export class LawyerdashboardComponent implements OnInit {
  requestedCases: any;

  constructor(private hireLawyerService: HireLawyerService, private toasterService: ToasterService) { }

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

  onApproveCase(caseId) {
    console.log(caseId);
  }

  onRejectCase(caseId) {
    console.log(caseId);
  }
}