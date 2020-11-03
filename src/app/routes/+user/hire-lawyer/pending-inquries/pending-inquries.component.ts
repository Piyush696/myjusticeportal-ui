import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaseService } from 'app/services/case.service';
import { ToasterService } from 'app/services/toaster.service';
import { UserAdditionInfoService } from 'app/services/user-addition-info.service';

@Component({
  selector: 'app-pending-inquries',
  templateUrl: './pending-inquries.component.html',
  styleUrls: ['./pending-inquries.component.css']
})
export class PendingInquriesComponent implements OnInit {
  pendingCasesList: any;

  constructor(private caseService: CaseService, public dialog: MatDialog,
    private additionalService: UserAdditionInfoService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.getPendingCaseDetails();
  }

  onOpenModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '550px',
      height: '200px'
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }

  getPendingCaseDetails() {
    this.caseService.getPendingCaseInfo().subscribe((pendingCase: any) => {
      console.log(pendingCase.data)
      this.pendingCasesList = pendingCase.data.map((status) => {
        if (status.status && status.status === 'Rejected') {
          status['statusDeclared'] = 'Lawyer Rejected'
        }
        else if (status.status && status.status === 'Requested') {
          status['statusDeclared'] = 'Lawyer Requested'
        }
        else if (status.status && status.status === 'Approved') {
          status['statusDeclared'] = 'Lawyer Approved'
        }
        else if (status.status && status.status === 'inmate_accepted') {
          status['statusDeclared'] = 'Inmate Approved'
        }
        else if (status.status && status.status === 'inmate_rejected') {
          status['statusDeclared'] = 'Inmate Rejected'
        }
        else if (status.status && status.status === 'chatEnabled') {
          status['statusDeclared'] = 'Inmate chatEnabled'
        }
        return status
      })
    })
  }

  onClickStatus(status, lawyerId, caseId) {
    const updatedStatus = {
      "status": status,
      "lawyerId": lawyerId,
      "caseId": caseId
    }
    this.additionalService.updateInmateStatus(updatedStatus).subscribe((res: any) => {
      if (res.success) {
        this.getPendingCaseDetails()
        this.toasterService.showSuccessToater('Case status updated successfully.')
      } else {
        this.toasterService.showErrorToater('Case not updated.')
      }
    })
  }

}
