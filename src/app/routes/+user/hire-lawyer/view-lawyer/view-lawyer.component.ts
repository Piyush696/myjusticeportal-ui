import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'app/services/case.service';
import { HireLawyerService } from 'app/services/hire-lawyer.service';
import { ToasterService } from 'app/services/toaster.service';

@Component({
  selector: 'app-view-lawyer',
  templateUrl: './view-lawyer.component.html',
  styleUrls: ['./view-lawyer.component.css']
})
export class ViewLawyerComponent implements OnInit {
  organizationId: any;
  orgDetails: any;
  caseIds = [];
  caseList: any;

  constructor(private hireLawyerService: HireLawyerService, public dialog: MatDialog,
    private caseService: CaseService, private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService) {
    this.organizationId = this.activatedRoute.snapshot.params.organizationId;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.hireLawyerService.getUsersLawyer(this.organizationId).subscribe((users: any) => {
      this.orgDetails = users.data
    })
    this.getAllCases();
  }

  openModal(templateRef) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onNativeChange(event, caseId) {
    if (event) {
      this.caseIds.push({ caseId });
    } else {
      this.caseIds.forEach((x, i, a) => {
        if (x == caseId) {
          this.caseIds.splice(i, 1);
        }
      })
    }
  }


  getAllCases() {
    this.caseService.getCases().subscribe((cases: any) => {
      this.caseList = cases.data
    })
  }

  onselectCaseIds() {
    this.hireLawyerService.setCasesLawyer(this.caseIds).subscribe((cases: any) => {
      if (cases.success) {
        this.dialog.closeAll();
        this.toasterService.showSuccessToater('Cases Requested.')
      }
      else {
        this.toasterService.showErrorToater('Cases not Requested.')
      }
    })
  }

  closeModal() {
    this.dialog.closeAll();
  }

}
