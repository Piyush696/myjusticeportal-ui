import { Component, OnInit } from '@angular/core';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  pendingCasesList: any;

  constructor(private userAdditionInfoService: UserAdditionInfoService) { }

  ngOnInit(): void {
    this.getPendingCaseDetails();
  }

  getPendingCaseDetails() {
    this.userAdditionInfoService.getLawyerCases().subscribe((pendingCase: any) => {
      this.pendingCasesList = pendingCase.data
    })
  }
}
