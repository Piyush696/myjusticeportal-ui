import { Component, OnInit } from '@angular/core';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  pendingCasesList: any;

  constructor(private userAdditionInfoService: UserAdditionInfoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPendingCaseDetails();
  }

  getPendingCaseDetails() {
    this.userAdditionInfoService.getLawyerCases().subscribe((pendingCase: any) => {
      this.pendingCasesList = pendingCase.data
    })
  }
  onOpenModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '350px',
      height: '200px'
    });
  }
  closeModal() {
    this.dialog.closeAll()
  }
}
