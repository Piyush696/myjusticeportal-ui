import { Component, OnInit } from '@angular/core';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-accepted-cases',
  templateUrl: './accepted-cases.component.html',
  styleUrls: ['./accepted-cases.component.scss']
})

export class AcceptedCasesComponent implements OnInit {
  requestedCases: any;

  constructor(private hireLawyerService: HireLawyerService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.onGetRequestedCases('Approved');
  }

  onGetRequestedCases(status) {
    this.hireLawyerService.getRequestedCases({ status: status }).subscribe((res: any) => {
      if (res.data) {
        this.requestedCases = res.data.lawyer;
      } else {
        this.requestedCases = [];
      }
    })
  }

  onViewRejectedCases(e) {
    if (e) {
      let statuses = ['Approved', 'Rejected'];
      this.onGetRequestedCases(statuses);
      this.toasterService.showSuccessToater('Showed approved, rejected cases.');
    } else {
      this.onGetRequestedCases('Approved');
      this.toasterService.showSuccessToater('Showed approved cases only.');
    }
  }
}