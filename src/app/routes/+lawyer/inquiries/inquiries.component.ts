import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from 'app/services/toaster.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  pendingCasesList: any;

  constructor(private userAdditionInfoService: UserAdditionInfoService, public dialog: MatDialog,
    private toasterService: ToasterService, private router: Router) { }

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
      height: '220px'
    });
  }
  closeModal() {
    this.dialog.closeAll()
  }
  onStatusUpdate(caseId, status) {
    const data = {
      'caseId': caseId,
      'status': status
    }
    this.userAdditionInfoService.updateLawywrStatus(data).subscribe((res: any) => {
      if (res.success) {
        this.getPendingCaseDetails();
        this.toasterService.showSuccessToater('Status update successfully.');
      } else {
        this.toasterService.showErrorToater('Something went wrong, please try again.');
      }
    });
  }

  onChatEnable() {
    this.dialog.closeAll();
    this.router.navigateByUrl('/mjp/lawyer/lawyer-chat');
  }
}
