import { Component, OnInit } from '@angular/core';
import { CaseService } from 'app/services/case.service';

@Component({
  selector: 'app-pending-inquries',
  templateUrl: './pending-inquries.component.html',
  styleUrls: ['./pending-inquries.component.css']
})
export class PendingInquriesComponent implements OnInit {
  pendingCasesList: any;

  constructor(private caseService: CaseService) { }

  ngOnInit(): void {
    this.getPendingCaseDetails();
  }

  getPendingCaseDetails() {
    this.caseService.getPendingCaseInfo().subscribe((pendingCase: any) => {
      this.pendingCasesList = pendingCase.data
    })
  }

}
